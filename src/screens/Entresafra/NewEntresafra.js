import React, { Component, useState, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native'
import {
    Appbar,
    TextInput,
    Button,
    Divider,
} from 'react-native-paper'

import { Formik } from 'formik'
import * as yup from 'yup'



export default function NewEntresafra({ navigation }) {

    //consts for form validations
    const reviewSchema = yup.object({
        descriptionEntresafra: yup.string()
            .required('Campo obrigatório*')
            .max(255, 'Quantidade de caracteres excessiva'),

        dateStartEntresafra: yup.date()
            .required('Campo obrigatório*'),

        dateEndEntresafra: yup.date()
            .required('Campo obrigatório*'),

        observationEntresafra: yup.string()
            .max(50, 'Quantidade de caracteres excessiva'),

        descriptionCulture: yup.string()
            .required('Campo obrigatório*')
            .max(255, 'Quantidade de caracteres excessiva'),

        dateStartCulture: yup.date()
            .required('Campo obrigatório*'),
        observationCulture: yup.string()
            .max(50, 'Quantidade de caracteres excessiva'),


    })

    function pushData(descriptionEntresafra, dateStartEntresafra, dateEndEntresafra, observationEntresafra, descriptionCulture, dateStartCulture, observationCulture){
        navigation.navigate('MapScreenEntresafra', {descriptionEntresafra, dateStartEntresafra, dateEndEntresafra, observationEntresafra, descriptionCulture, dateStartCulture, observationCulture})
     }

    return (
        <View style={styles.background}>
            <View style={styles.appBar}>
                <Appbar.Header style={styles.appBarStyle}>
                    <Appbar.BackAction color="#ffff" onPress={() => navigation.navigate('Home')} />
                    <Appbar.Content title="Nova Entresafra" color='#ffff'/>
                </Appbar.Header>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Formik
                    initialValues={{ descriptionEntresafra: '', dateStartEntresafra: '', dateEndEntresafra: '', observationEntresafra: '', descriptionCulture: '', dateStartCulture: '', observationCulture: '' }}
                    validationSchema={reviewSchema}
                >
                    {(props) => (
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <View style={styles.formContainer}>

                                <Text
                                    style={{ fontSize: 21, fontFamily: 'sans-serif', color: '#3d3935', marginTop: 15, marginBottom: 15, textAlign: 'center' }}
                                >Informações da entresafra</Text>
                                <Divider style={{ marginBottom: 5 }} />

                                <Text style={styles.text_footer}>Descrição</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        mode="flat"
                                        placeholderTextColor="#666666"
                                        maxLength={250}
                                        style={styles.textInput}
                                        value={props.values.descriptionEntresafra}
                                        onChangeText={props.handleChange('descriptionEntresafra')}
                                        onBlur={props.handleBlur('descriptionEntresafra')}
                                        left={<TextInput.Icon name="rename-box" color='#6a6a6a' />}
                                    />
                                </View>
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.descriptionEntresafra && props.errors.descriptionEntresafra}
                                </Text>

                                <Text style={styles.text_footer}>Data inicio</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        placeholderTextColor="#666666"
                                        style={styles.textInput}
                                        maxLength={250}
                                        value={props.values.dateStartEntresafra}
                                        onChangeText={props.handleChange('dateStartEntresafra')}
                                        onBlur={props.handleBlur('dateStartEntresafra')}
                                        left={<TextInput.Icon name="calendar" color='#6a6a6a' />}
                                    />
                                </View>
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.dateStartEntresafra && props.errors.dateStartEntresafra}
                                </Text>

                                <Text style={styles.text_footer}>Previsão de término</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        placeholderTextColor="#666666"
                                        maxLength={17}
                                        style={styles.textInput}
                                        value={props.values.dateEndEntresafra}
                                        onChangeText={props.handleChange('dateEndEntresafra')}
                                        onBlur={props.handleBlur('dateEndEntresafra')}
                                        left={<TextInput.Icon name="calendar-check" color='#6a6a6a' />}
                                    />
                                </View>
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.dateEndEntresafra && props.errors.dateEndEntresafra}
                                </Text>

                                <Text style={styles.text_footer}>Observações</Text>
                                <View style={styles.action}>
                                    <TextInput
                                        placeholderTextColor="#666666"
                                        maxLength={50}
                                        style={styles.textInput}
                                        value={props.values.observationEntresafra}
                                        onChangeText={props.handleChange('observationEntresafra')}
                                        onBlur={props.handleBlur('observationEntresafra')}
                                        left={<TextInput.Icon name="alert-outline" color='#6a6a6a' />}
                                    />
                                </View>
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.observationEntresafra && props.errors.observationEntresafra}
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
                                <Text
                                    style={styles.textError}
                                >
                                    {props.touched.dateStartCulture && props.errors.dateStartCulture}
                                </Text>

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
                                <Button mode="outlined" style={{ height: '5%', marginBottom: 50 }} icon="map-marker-plus-outline" onPress={() => pushData(props.values.descriptionEntresafra, props.values.dateStartEntresafra, props.values.dateEndEntresafra, props.values.observationEntresafra, props.values.descriptionCulture, props.values.dateStartCulture, props.values.observationCulture)}>  Capturar região da área</Button>


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
        marginTop: 25,
        marginBottom: 50,
        marginLeft: '25%',
        height: '10%',
        width: '50%',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#3d3935',
        fontFamily: 'sans-serif'

    },

    formContainer: {
        backgroundColor: 'transparent',
        width: '87%',
        //height: '95%',

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
