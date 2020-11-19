import React, {
} from 'react'
import {
    View,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    Text,
    Keyboard,
    Image
} from 'react-native'
import {
    Button,
    TextInput,
    FAB
} from 'react-native-paper'

import { Formik } from 'formik'
import * as yup from 'yup'

import Logo from './../../../assests/logoAgro.png'
import Background from './../../../assests/background.png'
import { AuthContext } from '../../navigation/context'

export default function Login({ navigation }) {

    //CONSTS AND FUNCTIONS FOR PASSWORD VISIBILITY CONTROL 
    const [data, setData] = React.useState({
        secureTextEntry: true,
        passwordSecureIcon: 'eye-off',
    })

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
            passwordSecureIcon: 'eye'
        })
    }

    //CONSTS FOR FORM VALIDATIONS
    const reviewSchema = yup.object({
        email: yup.string()
            .required('Campo obrigatório*')
            .max(255, 'Quantidade de caracteres excessiva'),

        password: yup.string()
            .required('Campo obrigatório*')
            .max(255, 'Quantidade de caracteres excessiva')
    })

    //CONSTS FOP AUTH
    const { signIn } = React.useContext(AuthContext)

    const loginHandle = (email, password) => {
        console.log(email, password)
        signIn(email, password)
    }

    return (
        <View style={styles.background}>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={reviewSchema}

            >
                {(props) => (
                    <ImageBackground source={Background} style={styles.backgroundImage}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
                                <View style={styles.imageView}>
                                    <Image source={Logo} style={styles.image} resizeMode='contain'></Image>
                                </View>
                                <View style={styles.formContainer}>
                                    <View style={styles.componentsView}>
                                        <TextInput
                                            name="email"
                                            style={{ marginTop: 0 }}
                                            mode="flat"
                                            underlineColor='#375d26'
                                            label="Email"
                                            value={props.values.email}
                                            onChangeText={props.handleChange('email')}
                                            onBlur={props.handleBlur('email')}
                                            left={<TextInput.Icon name="account" color='#6a6a6a' />}
                                            keyboardType="email-address" >
                                        </TextInput>

                                        <Text
                                            style={styles.textError}
                                        >
                                            {props.touched.email && props.errors.email}
                                        </Text>

                                        <TextInput
                                            name="password"
                                            style={{ marginTop: 15 }}
                                            mode="flat"
                                            underlineColor='#375d26'
                                            label="Senha"
                                            value={props.values.password}
                                            onChangeText={props.handleChange('password')}
                                            onBlur={props.handleBlur('password')}
                                            secureTextEntry={data.secureTextEntry ? true : false}
                                            left={<TextInput.Icon name="key" color='#6a6a6a' />}
                                            right={<TextInput.Icon name={data.passwordSecureIcon} color='#6a6a6a' onPress={updateSecureTextEntry} />}
                                        >
                                        </TextInput>

                                        <Text
                                            style={styles.textError}
                                        >
                                            {props.touched.password && props.errors.password}
                                        </Text>

                                        <FAB
                                            style={styles.button}
                                            onPress={() => { loginHandle(props.values.email, props.values.password) }}
                                            label="Continuar"
                                        />

                                        <Button
                                            style={styles.buttonOptions, { marginTop: 40, }}
                                            mode="text"
                                            color="#375d26"

                                            onPress={() => navigation.navigate('NewAccount')}
                                        >
                                            Novo por aqui? Registre-se já!
                                    </Button>
                                    </View>

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ImageBackground>
                )}

            </Formik>
        </View>

    )
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    backgroundImage: {
        flex: 1,
        marginBottom: -50
    },

    button: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        height: '13%',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffff',
        fontFamily: 'sans-serif'
    },

    buttonOptions: {
        marginLeft: 70,
        marginRight: 70,
        fontFamily: 'Arial',
        backgroundColor: '#2699FB',
        fontWeight: 'bold'
    },

    componentsView: {
        paddingTop: 15,
        height: '100%',
        backgroundColor: 'transparent',
        fontFamily: 'sans-serif',
        backgroundColor: 'transparent'
    },

    formContainer: {
        backgroundColor: 'transparent',
        width: '87%',
        height: '65%',
        backgroundColor: 'transparent'
    },

    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        width: 400,
        height: 150
    },

    imageView: {
        flex: 1,
        height: '10%',
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    textError: {
        fontSize: 15,
        color: '#ef3340',
        fontFamily: 'sans-serif'
    },


})