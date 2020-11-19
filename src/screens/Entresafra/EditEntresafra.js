import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native'
import {
    Appbar,
    TextInput,
    Button,
    FAB,
    Divider,
} from 'react-native-paper'

import { Formik } from 'formik'
import * as yup from 'yup'

import firebase from './../../services/FirebaseConection'

export default function EditEntresafra({ route, navigation }) {
    const { uid, descriptionEntresafra, descriptionCulture, dateStartEntresafra, dateEndEntresafra, observationEntresafra, dateStartCulture, observationCulture, coordinates } = route.params
    console.log(uid,descriptionEntresafra, descriptionCulture, dateStartEntresafra, dateEndEntresafra, observationEntresafra, dateStartCulture, observationCulture, coordinates)
 const key = descriptionEntresafra


    //consts for BD connection

    async function newResponseUPDATE(descriptionEntresafra, descriptionCulture, dateStartEntresafra, dateEndEntresafra, observationEntresafra, dateStartCulture, observationCulture) {
        await firebase.database().ref(`users/${uid}/entresafra/${key}`).update({
            descriptionEntresafra: descriptionEntresafra,
            dateStartEntresafra: dateStartEntresafra,
            dateEndEntresafra: dateEndEntresafra,
            observationEntresafra: observationEntresafra,
            descriptionCulture: descriptionCulture,
            dateStartCulture: dateStartCulture,
            observationCulture: observationCulture,
        })
            .then((value) => {
                createUpdateSucessAlert()
                console.log(value)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const createUpdateSucessAlert = () =>
        Alert.alert(
            "Parabéns!",
            "Sua entresafra foi alterada com sucesso.",
            [
                { text: "Ok", onPress: () => navigation.navigate('Entresafra') }
            ]
        )

    async function newResponseDELETE() {
        await firebase.database().ref(`users/${uid}/entresafra/${descriptionEntresafra}`).remove()
            .then((value) => {

                createDeleteSucessAlert()
                console.log(value)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const createDeleteSucessAlert = () =>
        Alert.alert(
            "Parabéns!",
            "Sua entresafra foi excluida com sucesso.",
            [
                { text: "Ok", onPress: () => navigation.navigate('Entresafra') }
            ]
        )

    const createDeleteAlert = () =>
        Alert.alert(
            "Atenção!",
            "Deseja mesmo excluir essa entresafra?",
            [
                { text: "Ok", onPress: () => newResponseDELETE() }
            ]
        )

    //consts for form validations
    const reviewSchema = yup.object({
        descriptionSafra: yup.string()
            .required('Campo obrigatório*')
            .max(255, 'Quantidade de caracteres excessiva'),

        dateStartSafra: yup.date()
            .required('Campo obrigatório*'),

        dateEndSafra: yup.date()
            .required('Campo obrigatório*'),

        observationSafra: yup.string()
            .max(50, 'Quantidade de caracteres excessiva'),

        descriptionCulture: yup.string()
            .required('Campo obrigatório*')
            .max(255, 'Quantidade de caracteres excessiva'),

        dateStartCulture: yup.date()
            .required('Campo obrigatório*'),
        observationCulture: yup.string()
            .max(50, 'Quantidade de caracteres excessiva'),


    })

    function pushData(descriptionEntresafra, uid) {
        navigation.navigate('EditCoordinateEntresafra', { descriptionEntresafra, uid })
    }

    return (
        <View style={styles.background}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.appBar}>
                    <Appbar.Header style={styles.appBarStyle}>
                        <Appbar.BackAction color="#ffff" onPress={() => navigation.navigate('Home')} />
                        <Appbar.Content title="Editar entresafra" color='#ffff' />
                        <Appbar.Action color='#fff' icon="delete" onPress={() => createDeleteAlert()} />
                    </Appbar.Header>
                </View>

                <Formik
                    initialValues={{ descriptionSafra: descriptionEntresafra, dateStartSafra: dateStartEntresafra, dateEndSafra: dateEndEntresafra, observationSafra: observationEntresafra, descriptionCulture: descriptionCulture, dateStartCulture: dateStartCulture, observationCulture: observationCulture }}
                    validationSchema={reviewSchema}
                >
                    {(props) => (
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <View style={styles.formContainer}>

                                <Text
                                    style={{ fontSize: 21, fontFamily: 'sans-serif', color: '#3d3935', marginTop: 0, marginBottom: 15, textAlign: 'center' }}
                                >Informações da safra</Text>
                                <Divider style={{ marginBottom: 5 }} />

                                <Text style={styles.text_footer}>Descrição</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        mode="flat"
                                        placeholderTextColor="#666666"
                                        maxLength={250}
                                        style={styles.textInput}
                                        value={props.values.descriptionSafra}
                                        onChangeText={props.handleChange('descriptionSafra')}
                                        onBlur={props.handleBlur('descriptionSafra')}
                                        left={<TextInput.Icon name="rename-box" color='#6a6a6a' />}
                                    />
                                </View>
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.descriptionSafra && props.errors.descriptionSafra}
                                </Text>

                                <Text style={styles.text_footer}>Data inicio</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        placeholderTextColor="#666666"
                                        style={styles.textInput}
                                        maxLength={250}
                                        value={props.values.dateStartSafra}
                                        onChangeText={props.handleChange('dateStartSafra')}
                                        onBlur={props.handleBlur('dateStartSafra')}
                                        left={<TextInput.Icon name="calendar" color='#6a6a6a' />}
                                    />
                                </View>
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.dateStartSafra && props.errors.dateStartSafra}
                                </Text>

                                <Text style={styles.text_footer}>Previsão de término</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        placeholderTextColor="#666666"
                                        maxLength={17}
                                        style={styles.textInput}
                                        value={props.values.dateEndSafra}
                                        onChangeText={props.handleChange('dateEndSafra')}
                                        onBlur={props.handleBlur('dateEndSafra')}
                                        left={<TextInput.Icon name="calendar-check" color='#6a6a6a' />}
                                    />
                                </View>
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.dateEndSafra && props.errors.dateEndSafra}
                                </Text>

                                <Text style={styles.text_footer}>Observações</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        placeholderTextColor="#666666"
                                        maxLength={50}
                                        style={styles.textInput}
                                        value={props.values.observationSafra}
                                        onChangeText={props.handleChange('observationSafra')}
                                        onBlur={props.handleBlur('observationSafra')}
                                        left={<TextInput.Icon name="alert-outline" color='#6a6a6a' />}
                                    />
                                </View>
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.observationSafra && props.errors.observationSafra}
                                </Text>

                                <Text
                                    style={{ fontSize: 21, fontFamily: 'sans-serif', color: '#3d3935', marginTop: 15, marginBottom: 15, textAlign: 'center' }}
                                >Informações da cultura</Text>
                                <Divider style={{ marginBottom: 10 }} />

                                <Text style={styles.text_footer}>Descrição</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        placeholderTextColor="#666666"
                                        maxLength={250}
                                        style={styles.textInput}
                                        value={props.values.descriptionCulture}
                                        onChangeText={props.handleChange('descriptionCulture')}
                                        onBlur={props.handleBlur(' descriptionCulture')}
                                        left={<TextInput.Icon name="clipboard-text" color='#6a6a6a' />}
                                    />
                                </View>
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.descriptionCulture && props.errors.descriptionCulture}
                                </Text>

                                <Text style={styles.text_footer}>Data de inicio</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        placeholderTextColor="#666666"
                                        maxLength={250}
                                        style={styles.textInput}
                                        value={props.values.dateStartCulture}
                                        onChangeText={props.handleChange('dateStartCulture')}
                                        onBlur={props.handleBlur('dateStartCulture')}
                                        left={<TextInput.Icon name="calendar" color='#6a6a6a' />}
                                    />
                                </View>

                                <Text style={styles.text_footer}>Observações</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        placeholderTextColor="#666666"
                                        maxLength={250}
                                        style={styles.textInput}
                                        value={props.values.observationCulture}
                                        onChangeText={props.handleChange('observationCulture')}
                                        onBlur={props.handleBlur('observationCulture')}
                                        left={<TextInput.Icon name="alert-outline" color='#6a6a6a' />}
                                    />
                                </View>
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.observationCulture && props.errors.observationCulture}
                                </Text>

                                <Text style={{ fontSize: 21, fontFamily: 'sans-serif', color: '#3d3935', marginTop: 25, marginBottom: 15, textAlign: 'center' }}>Demarcação da área</Text>
                                <Divider style={{ marginBottom: 10 }} />
                                <Button mode="outlined" style={{ height: '3%', marginBottom: 0 }} icon="map-marker-plus-outline" onPress={() => pushData(props.values.descriptionSafra, uid)}>  Capturar região da área</Button>
                                <FAB style={styles.buttonSave} label='Salvar' onPress={() => newResponseUPDATE(props.values.descriptionSafra, props.values.dateStartSafra, props.values.dateEndSafra, props.values.observationSafra, props.values.descriptionCulture, props.values.dateStartSafra, props.values.observationCulture)} />

                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#FFFF'
    },
    buttonSave: {
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 100,
        height: '5%',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#7ed957',
        fontFamily: 'sans-serif'

    },

    formContainer: {
        backgroundColor: 'transparent',
        width: '87%',
    },
    item: {
        paddingBottom: 15,
        marginVertical: 2,
        marginHorizontal: 18,
        backgroundColor: '#FFFF'
    },
    appBar: {
        backgroundColor: "#FFFF",
        height: '10%',

    },
    appBarStyle: {
        backgroundColor: "#7ed957",

    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#FFFF',
        height: 45
    },
    textError: {
        fontSize: 15,
        color: '#ef3340',
        fontFamily: 'sans-serif'
    },

    text_footer: {
        color: '#3d3935',
        fontSize: 17,
        marginTop: 13,
        backgroundColor: '#FFFF',
        fontFamily: 'sans-serif'
    },
    textName: {
        color: '#3d3935',
        fontSize: 20,
        marginTop: 8,
        fontFamily: 'sans-serif'
    },

    title: {
        textAlign: 'center',
        paddingTop: 10,
        justifyContent: 'center',
        fontSize: 40,
        color: '#3d3935',
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
    },

    viewCard: {
        width: '100%',
        height: '6%',
        backgroundColor: '#fff',
        marginTop: 10,

    },
    ViewButtonEdit: {
        height: '20%',
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFF',

    }

})
