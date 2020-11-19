import React, { Component, useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    ImageBackground,
    Image,
    Text,
    ActivityIndicator,
    ScrollView,
} from 'react-native'
import {
    Card,
    Title,
    IconButton,
    Appbar

} from 'react-native-paper'
import home from './../../assests/home2.png'
import cover1 from './../../assests/cover5.png'
import cover2 from './../../assests/cover6.png'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home({ navigation }) {

    useEffect(() => {
        async function getUid() {
            try {
                let a = await AsyncStorage.getItem("@Agro:uid")
                setUid(a)

            } catch (e) {
                console.log(e)
            }
        }
        getUid()
    }, [uid])

    const [uid, setUid] = useState(null)

    return (
        <View style={styles.background}>
            <ImageBackground source={home} style={styles.backgroundImage}>

                <View style={styles.headerContainer}>
                    <IconButton icon="menu" color="#ffff" size={30} onPress={() => navigation.openDrawer()} style={{ marginTop: 15 }} />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <View style={styles.formContainer}>
                        <Card style={styles.viewCard1} position="absolute" onPress={() => navigation.navigate('Safra', uid)}>
                            <Card.Cover style={styles.imageCard} source={cover1} resizeMode='contain' />
                            <Card.Content>
                                <Title style={{ textAlign: 'center', fontSize: 18,  color: '#3d3935' }}>Minhas safras</Title>
                            </Card.Content>
                        </Card>
                        <Card style={styles.viewCard2} position="absolute" onPress={() => navigation.navigate('Entresafra', uid)}>
                            <Card.Cover style={styles.imageCard} source={cover2} resizeMode='contain' />
                            <Card.Content>
                                <Title style={{ textAlign: 'center', fontSize: 18,  color: '#3d3935' }}>Minhas entresafras</Title>
                            </Card.Content>
                        </Card>
                        

                    </View>
                </View>
            </ImageBackground>
        </View>

    )


}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',

        backgroundColor: '#Ffff'
    },
    backgroundImage: {
        flex: 1,
        marginBottom: -100
    },
    formContainer: {
        flex: 1,
        marginTop: 40,
        backgroundColor: '#fff',
        width: '87%',
        height: '90%',
    },

    headerContainer: {
        backgroundColor: 'transparent',
        height: '25%'
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
    imgLogo: {
        width: 400,
        height: 140,
        marginStart: 10,
        marginTop: -40
    },
    imageCard: {

        flex: 1,
        height: '100%'
    },
    viewCard1: {
        width: '100%',
        height: '30%',
        backgroundColor: '#ffff',
        marginTop: 20,

    },

    viewCard2: {
        width: '100%',
        height: '30%',
        backgroundColor: '#ffff',
        marginTop: 200,

    },
    

})

