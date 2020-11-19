import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from '@react-navigation/drawer'

import Login from '../screens/Auth/Login'
import StackScreen from './StackScreens'
import NewAccount from './../screens/Auth/NewAccount'

import { AuthContext } from './context'
//import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

import firebase from './../services/FirebaseConection'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()


export default function Rotas() {

    const initialLoginState = {
        userName: null,
        userToken: null,
        loggedInUser: null,
    }

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                }
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                }
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                }
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                }
        }
    }

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

    const setUserID =  async (uid) =>{
        try{
         await AsyncStorage.setItem("@Agro:uid", uid) 
        } catch(e){
         console.log(e)
        }
     
    }

    const authContext = React.useMemo(() => ({
        signIn: async (email, password) => {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            .then( (value) => {
              setUserID(value.user.uid)
            dispatch({ type: 'LOGIN', id: email, token: 'aaa'})
            })
            .catch( (error) => {
                alert('Ops algo deu errado!');
                return;
            })
       
        },

        signOut: async () => {
            await firebase.auth().signOut()
            dispatch({ type: 'LOGOUT' })
        },
        signUp: () => {


        },
    }), [])

    useEffect(() => {
        dispatch({ type: 'RETRIEVE_TOKEN', token: null })
    }, [])


    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken !== null ? <StackScreen/>
                    : (
                        <Stack.Navigator initialRouteName="Login">
                            <Stack.Screen
                                name="Login"
                                options={{ headerShown: false }}
                                component={Login}
                            />
                            <Stack.Screen
                                name="NewAccount"
                                options={{ headerShown: false }}
                                component={NewAccount}
                            />
                        </Stack.Navigator>
                    )}

            </NavigationContainer>
        </AuthContext.Provider>
    )

}

const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        marginTop: -2
    },
    background: {
        flex: 1,
    },
})
