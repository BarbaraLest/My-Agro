import React, {
    Component,
    useState,
    useEffect,
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import {
    Divider,
    FAB,
    Appbar,
} from 'react-native-paper'

import firebase from './../../services/FirebaseConection'

export default function SafraTab({ route, navigation }) {

    const [safra, setSafra] = useState()
    var uid = route.params
    useEffect(() => {
        firebase.database().ref(`users/${uid}/safra`).on('value', (snapshot) => {
            const safras = snapshot.val()
            const safrasList = []
            for (let id in safras) {
                safrasList.push(safras[id])
            }
            console.log(safrasList)
            setSafra(safrasList)
        })
    }, [])

    function Safra({ descriptionSafra, descriptionCulture, dateStartSafra, dateEndSafra, observationSafra, dateStartCulture, observationCulture, coordinates }) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('InfoSafra', { uid, descriptionSafra, descriptionCulture, dateStartSafra, dateEndSafra, observationSafra, dateStartCulture, observationCulture, coordinates })}>
                <Text style={styles.textName}>  {descriptionSafra}</Text>
                <Text style={styles.textDescription}>   Cultura: {descriptionCulture}</Text>
                <Divider style={{ backgroundColor: '#c2c6ca' }} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.background}>
            <View style={styles.appBar}>
                <Appbar.Header style={styles.appBarStyle}>
                    <Appbar.BackAction color="#ffff" onPress={() => navigation.navigate('Home')} />
                    <Appbar.Content title="Minhas safras" color='#ffff' />
                </Appbar.Header>

            </View>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <FlatList
                    data={safra}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) =>
                        <Safra
                            descriptionSafra={item.descriptionSafra}
                            descriptionCulture={item.descriptionCulture}
                            dateStartSafra={item.dateStartSafra}
                            dateEndSafra={item.dateEndSafra}
                            observationSafra={item.observationSafra}
                            dateStartCulture={item.dateStartCulture}
                            observationCulture={item.observationCulture}
                            coordinates={item.polygon}
                        />}
                >
                </FlatList>
                <FAB style={styles.fab} icon='plus' color='#ffff' onPress={() => navigation.navigate('NewSafra')} />

            </View>

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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#7ed957'
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#FFFF',
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
    item: {
        paddingBottom: 15,
        marginVertical: 2,
        marginHorizontal: 18,
        backgroundColor: '#ffff',

    },
    textName: {
        color: '#3d3935',
        fontSize: 22,
        marginTop: 8,
        fontFamily: 'sans-serif'
    },
    textDescription: {
        color: '#3d3935',
        fontSize: 18,
        fontFamily: 'sans-serif',
        marginTop: 5,
        marginLeft: 3,
        marginBottom: 15
    },
    viewInfo: {
        backgroundColor: '#FFFF',
        width: '95%',
        height: '100%',
    },
})

