import React, { } from 'react'
import {
        View,
        Text,
        StyleSheet,
        ScrollView,
        TouchableWithoutFeedback,
        Keyboard,
} from 'react-native'
import {
        Appbar,
        TextInput,
        FAB
} from 'react-native-paper'

import { Formik } from 'formik'
import * as yup from 'yup'

import firebase from './../../services/FirebaseConection'

export default function NewAccount({ navigation }) {

        //CONSTS AND FUNCTIONS FOR DATABASE CONECTION
        async function createUser(email, password, name, fone) {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then((value) => {
                                firebase.database().ref(`users/${value.user.uid}`).child('profile').set({
                                        name: name,
                                        fone: fone
                                })

                                alert('Usuário criado com sucesso!')
                                navigation.navigate('Login')
                        })
                        .catch((error) => {
                                if (error.code == 'auth/weak-password') {
                                        alert('Sua senha deve ter pelo menos 6 caracteres!')
                                        return
                                }
                                if (error.code == 'auth/invalid-email') {
                                        alert('Email invalido!')
                                        return
                                } else {
                                        alert('Ops, algo deu errado!')
                                        return
                                }
                        })
        }

        //CONSTS FOR FORM VALIDATIONS
        const reviewSchema = yup.object({
                name: yup.string()
                        .required('Campo obrigatório*')
                        .max(255, 'Quantidade de caracteres excessiva'),
                email: yup.string()
                        .required('Campo obrigatório*')
                        .max(255, 'Quantidade de caracteres excessiva'),
                fone: yup.string()
                        .required('Campo obrigatório*')
                        .max(255, 'Quantidade de caracteres excessiva'),

                password: yup.string()
                        .required('Campo obrigatório*')
                        .max(255, 'Quantidade de caracteres excessiva')

        })

        return (
                <View style={styles.background}>
                        <Formik
                                initialValues={{ name: '', email: '', fone: '', password: '' }}
                                validationSchema={reviewSchema}
                        >
                                {(props) => (
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                                <View style={styles.appBar}>
                                                        <Appbar.Header style={styles.appBarStyle}>
                                                                <Appbar.BackAction color="#ffff" onPress={() => navigation.navigate('Login')} />
                                                                <Appbar.Content title="Informações da conta" color='#ffff'/>
                                                        </Appbar.Header>
                                                </View>
                                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                                        <View style={{ alignItems: 'center', flex: 1 }}>
                                                                <View style={styles.formContainer}>
                                                                        <View style={styles.action}>
                                                                                <TextInput
                                                                                        mode="flat"
                                                                                        placeholderTextColor="#666666"
                                                                                        style={styles.textInput}
                                                                                        underlineColor="#375d26"
                                                                                        label="Nome completo"
                                                                                        value={props.values.name}
                                                                                        onChangeText={props.handleChange('name')}
                                                                                        onBlur={props.handleBlur('name')}
                                                                                        left={<TextInput.Icon name="account" color='#6a6a6a' />}
                                                                                />
                                                                        </View>
                                                                        <Text
                                                                                style={styles.textError}
                                                                        >
                                                                                {props.touched.name && props.errors.name}
                                                                        </Text>

                                                                        <View style={styles.action}>
                                                                                <TextInput
                                                                                        mode="flat"
                                                                                        placeholderTextColor="#666666"
                                                                                        style={styles.textInput}
                                                                                        underlineColor="#375d26" l
                                                                                        label="Email"
                                                                                        value={props.values.email}
                                                                                        onChangeText={props.handleChange('email')}
                                                                                        onBlur={props.handleBlur('email')}
                                                                                        left={<TextInput.Icon name="email" color='#6a6a6a' />}
                                                                                />
                                                                        </View>
                                                                        < Text
                                                                                style={styles.textError}
                                                                        >
                                                                                {props.touched.email && props.errors.email}
                                                                        </Text>

                                                                        <View style={styles.action}>
                                                                                <TextInput
                                                                                        mode="flat"
                                                                                        placeholderTextColor="#666666"
                                                                                        style={styles.textInput}
                                                                                        underlineColor="#375d26"
                                                                                        label="Telefone"
                                                                                        value={props.values.fone}
                                                                                        onChangeText={props.handleChange('fone')}
                                                                                        onBlur={props.handleBlur('fone')}
                                                                                        left={<TextInput.Icon name="phone" color='#6a6a6a' />}
                                                                                />
                                                                        </View>
                                                                        < Text
                                                                                style={styles.textError}
                                                                        >
                                                                                {props.touched.fone && props.errors.fone}
                                                                        </Text>

                                                                        <View style={styles.action}>
                                                                                <TextInput
                                                                                        mode="flat"
                                                                                        secureTextEntry={true}
                                                                                        placeholderTextColor="#666666"
                                                                                        style={styles.textInput}
                                                                                        underlineColor="#375d26"
                                                                                        label="Senha"
                                                                                        value={props.values.password}
                                                                                        onChangeText={props.handleChange('password')}
                                                                                        onBlur={props.handleBlur('password')}
                                                                                        left={<TextInput.Icon name="key" color='#6a6a6a' />}
                                                                                />
                                                                        </View>
                                                                        < Text
                                                                                style={styles.textError}
                                                                        >
                                                                                {props.touched.password && props.errors.password}
                                                                        </Text>

                                                                        <View style={styles.action}>
                                                                                <TextInput
                                                                                        mode="flat"
                                                                                        secureTextEntry={true}
                                                                                        placeholderTextColor="#666666"
                                                                                        style={styles.textInput}
                                                                                        underlineColor="#375d26"
                                                                                        label="Confirmação de senha"
                                                                                        left={<TextInput.Icon name="key" color='#6a6a6a' />}
                                                                                />
                                                                        </View>

                                                                        <FAB
                                                                                style={styles.button}
                                                                                onPress={() => { createUser(props.values.email, props.values.password, props.values.name, props.values.fone) }}
                                                                                label="Criar conta"
                                                                        />

                                                                </View>

                                                        </View>

                                                </TouchableWithoutFeedback>
                                        </ScrollView>
                                )}

                        </Formik>

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
        formContainer: {
                flex: 1,
                backgroundColor: '#ffff',
                width: '87%',
                height: '90%',
        },
        appBar: {
                backgroundColor: "#FFFF",
                height: '10%',
        },
        appBarStyle: {
                backgroundColor: "#7ed957",
        },
        button: {
                marginTop: 50,
                marginBottom: 50,
                height: '9%',
                width: '100%',
                textAlign: 'center',
                justifyContent: 'center',
                backgroundColor: "#7ed957",
                fontFamily: 'sans-serif'
        },
        title: {
                color: '#ffff',
                fontFamily: 'sans-serif',
        },
        textInput: {
                flex: 1,
                marginTop: 15,
                paddingLeft: 10,
                backgroundColor: '#ffff'

        },
        action: {
                flexDirection: 'row',
                marginTop: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#f2f2f2',
                paddingBottom: 0
        },
        textName: {
                color: '#3d3935',
                fontSize: 22,
                marginTop: 15,
                marginBottom: 10,
                fontFamily: 'sans-serif'
        },
        textCurso: {
                color: '#3d3935',
                fontSize: 20,
                marginTop: 8,
                fontFamily: 'sans-serif',
                marginStart: 100
        },


})
