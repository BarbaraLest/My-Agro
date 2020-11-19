import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native'
import {
    Title,
    Divider,
    FAB,
    Appbar,
} from 'react-native-paper'

export default function InfoSafra({ route, navigation }) {

    const { uid, descriptionSafra, descriptionCulture, dateStartSafra, dateEndSafra, observationSafra, dateStartCulture, observationCulture, coordinates } = route.params
    console.log(uid, descriptionSafra, descriptionCulture, dateStartSafra, dateEndSafra, observationSafra, dateStartCulture, observationCulture, coordinates)

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <Appbar.Header style={styles.appBarStyle}>
                    <Appbar.BackAction color={'#ffff'} onPress={() => { navigation.navigate('Safra') }} />
                    <Appbar.Content title="Informações da safra" color='#ffff' />
                </Appbar.Header>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={styles.formContainer}>
                    <View style={styles.viewInfo}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Title style={styles.title}>{descriptionSafra}</Title>
                            <Divider style={{ marginBottom: 10 }} />
                            <Text style={{ fontSize: 17, fontFamily: 'sans-serif', color: '#9b9b9b', marginTop: 10, marginBottom: 5 }}>Data de inicio</Text>
                            <Text style={{ fontSize: 19, fontFamily: 'sans-serif', marginBottom: 13 }}>{dateStartSafra}</Text>
                            <Divider />
                            <Text style={{ fontSize: 17, fontFamily: 'sans-serif', color: '#9b9b9b', marginTop: 10, marginBottom: 5 }}>Data de término (previsão)</Text>
                            <Text style={{ fontSize: 19, fontFamily: 'sans-serif', marginBottom: 13 }}>{dateEndSafra}</Text>
                            <Divider />
                            <Text style={{ fontSize: 17, fontFamily: 'sans-serif', color: '#9b9b9b', marginTop: 10, marginBottom: 5 }}>Observações</Text>
                            <Text style={{ fontSize: 19, fontFamily: 'sans-serif', marginBottom: 13 }}>{observationSafra}</Text>
                            <Divider />
                            <Text style={{ fontSize: 17, fontFamily: 'sans-serif', color: '#9b9b9b', marginTop: 10, marginBottom: 5 }}>Descrição cultura</Text>
                            <Text style={{ fontSize: 19, fontFamily: 'sans-serif', marginBottom: 13 }}>{descriptionCulture}</Text>
                            <Divider />
                            <Text style={{ fontSize: 17, fontFamily: 'sans-serif', color: '#9b9b9b', marginTop: 10, marginBottom: 5 }}>Data de incicio cultura</Text>
                            <Text style={{ fontSize: 19, fontFamily: 'sans-serif', marginBottom: 13 }}>{dateStartCulture}</Text>
                            <Divider />
                            <Text style={{ fontSize: 17, fontFamily: 'sans-serif', color: '#9b9b9b', marginTop: 10, marginBottom: 5 }}>Observações cultura</Text>
                            <Text style={{ fontSize: 19, fontFamily: 'sans-serif', marginBottom: 13 }}>{observationCulture}</Text>
                            <Divider />
                        </ScrollView>
                        <FAB style={styles.fab} icon='border-color' color='#ffff' onPress={() => navigation.navigate('EditSafra', { uid, descriptionSafra, descriptionCulture, dateStartSafra, dateEndSafra, observationSafra, dateStartCulture, observationCulture, coordinates })} />
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    appBarStyle: {
        backgroundColor: "#7ed957",
    },
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#FFFF'
    },
    fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 10,
        backgroundColor: '#7ed957',
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#FFFF',
        width: '97%',
        height: '90%',
        alignItems: 'center'
    },
    header: {
        backgroundColor: "#FFFF",
        height: '15%',
    },
    title: {
        textAlign: 'center',
        paddingTop: 0,
        paddingBottom: 10,
        justifyContent: 'center',
        fontSize: 26,
        color: '#3d3935',
        fontFamily: 'sans-serif'
    },
    viewInfo: {
        backgroundColor: '#FFFF',
        width: '95%',
        height: '100%',
    },


})

