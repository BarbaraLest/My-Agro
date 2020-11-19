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

export default function Entresafra({ route, navigation }) {

    const [entresafra, setEntresafra] = useState()
    var uid = route.params
    useEffect(() => {
        firebase.database().ref(`users/${uid}/entresafra`).on('value', (snapshot) => {
            const entresafras = snapshot.val()
            const entresafrasList = []
            for (let id in entresafras) {
                entresafrasList.push(entresafras[id])
            }
            console.log(entresafrasList)
            setEntresafra(entresafrasList)
        })
    }, [])

    function Entresafra({ descriptionEntresafra, descriptionCulture, dateStartEntresafra, dateEndEntresafra, observationEntresafra, dateStartCulture, observationCulture, coordinates }) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('InfoEntresafra', { uid, descriptionEntresafra, descriptionCulture, dateStartEntresafra, dateEndEntresafra, observationEntresafra, dateStartCulture, observationCulture, coordinates  })}>
                <Text style={styles.textName}>  {descriptionEntresafra}</Text>
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
                    <Appbar.Content title="Minhas entresafras" color='#ffff' />
                </Appbar.Header>

            </View>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <FlatList
                    data={entresafra}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) =>
                        <Entresafra
                            descriptionEntresafra={item.descriptionEntresafra}
                            descriptionCulture={item.descriptionCulture}
                            dateStartEntresafra={item.dateStartEntresafra}
                            dateEndEntresafra={item.dateEndEntresafra}
                            observationEntresafra={item.observationEntresafra}
                            dateStartCulture={item.dateStartCulture}
                            observationCulture={item.observationCulture}
                            coordinates={item.polygon}
                        />}
                >
                </FlatList>
                <FAB style={styles.fab} icon='plus' color='#ffff' onPress={() => navigation.navigate('NewEntresafra')} />

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

