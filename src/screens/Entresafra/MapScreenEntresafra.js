import React, {
    Component,
    useState,
    useEffect
} from 'react'

import {
    Text,
    View,
    StyleSheet,
    PermissionsAndroid,
    ActivityIndicator,
    Alert
} from 'react-native'

import {
    FAB,
    Chip,
    IconButton
} from 'react-native-paper'

import MapView, {
    Polygon,
} from 'react-native-maps'

import Geolocation from '@react-native-community/geolocation'
import AsyncStorage from '@react-native-async-storage/async-storage'


import firebase from './../../services/FirebaseConection'

export default function MapScreenEntresafra({route, navigation }) {

    //default consts
    let id = 0
   
    const {descriptionEntresafra, dateStartEntresafra, dateEndEntresafra, observationEntresafra, descriptionCulture, dateStartCulture, observationCulture} = route.params
    console.log(descriptionEntresafra, dateStartEntresafra, dateEndEntresafra, observationEntresafra, descriptionCulture, dateStartCulture, observationCulture)

    const initialState = {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

    }

    useEffect(() => {
        Geolocation.getCurrentPosition(position => {
            const { longitude, latitude } = position.coords
            setCurrentPosition({
                ...currentPosition,
                latitude: latitude,
                longitude: longitude
            })
        },
            error => alert(error.message),
            { timeout: 20000, maximumAge: 1000 }
        )

        async function getUid(){
            try{
            let a = await AsyncStorage.getItem("@Agro:uid") 
            setUid(a)
          
            } catch(e){
             console.log(e)
            }
         
        }
        veriryLocationPermission()
        getUid()
    }, [])

  
            

    //CONSTS AND FUNCTIONS FOR GEOLOCATION

    const [currentPosition, setCurrentPosition] = useState(initialState)
    const [hasLocationPermission, setHasLocationPermission] = useState(false)

    const veriryLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log('permissão concedida')

                setHasLocationPermission(true)
            } else {
                console.log('permissaõ negada')
                setHasLocationPermission(false)
            }
        } catch (e) {
            console.log('erro')
        }
    }


    //CONSTS FOR FABGROUP
    const [state, setState] = React.useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state
    const [styleMap, setStyleMap] = useState('satellite')

    // consts and functions  for polygon
    const [polygons, setPolygons] = useState([])
    const [editing, setEditing] = useState(null)
    const [creatingHole, setCreatingHole] = useState(false)
    const [mapOptions, setMapOptions] = useState(true)
    const [polygonJson, setPolygonJson] = useState(null)


    function onPress(e) {
        if (!editing) {
            setMapOptions(false)
            setEditing({ id: id++, coordinates: [e.nativeEvent.coordinate], holes: [] })

        } else if (!creatingHole) {
            setMapOptions(false)
            setEditing({ ...editing, coordinates: [...editing.coordinates, e.nativeEvent.coordinate] })
        } else {
            setMapOptions(false)
            const holes = [...editing.holes]
            holes[holes.length - 1] = [...holes[holes.length - 1], e.nativeEvent.coordinate,]
            setEditing({ ...editing, id: id++, coordinates: [...editing.coordinates], holes, })

        }
    
    }

      //CONSTS AND FUNCTIONS FOR DATABASE CONNECTION

      const [uid, setUid] = useState()
      console.log(uid)
     
      const newResponse = async (polygon) => {
        let entresafra =  await firebase.database().ref(`users/${uid}/entresafra`)
        let key = descriptionEntresafra
        entresafra.child(key).set({
              descriptionEntresafra: descriptionEntresafra,
              dateStartEntresafra: dateStartEntresafra,
               dateEndEntresafra: dateEndEntresafra,
               observationEntresafra: observationEntresafra,
               descriptionCulture: descriptionCulture, 
               dateStartCulture: dateStartCulture,
               observationCulture: observationCulture,
               coordinates: editing
          })
          .then((value) => {
              createSucessAlert()
              console.log(value)
          })
          .catch((error) => {
              console.log(error)
          })
      }
  
      const createSucessAlert = () =>
      Alert.alert(
          "Parabéns!",
          "Sua entresafra foi cadastrada com sucesso.",
          [
              { text: "Ok", onPress: () => navigation.navigate('Home') }
          ]
      )
  
      //consts and functions to transform data into json format
      function transformerJsonPoints(){
          var polygon =  editing.coordinates.map(({latitude, longitude}) => {
            return( [latitude, longitude])
          })
          newResponse(polygon)
        } 

    function Save() {
        transformerJsonPoints()
    }

    function Delete() {
        setEditing(null)
        setMapOptions(true)
    }

    return currentPosition.latitude ? (
        <View style={styles.background}>
            <View style={styles.mapView}>
                <MapView
                    mapType={styleMap}
                    style={styles.mapStyle}
                    initialRegion={currentPosition}
                    showsUserLocation
                    onPress={e => onPress(e)}
                    scrollEnabled={mapOptions}
                >
                    {polygons.map(polygon => (
                        <Polygon
                            key={polygon.id}
                            coordinates={polygon.coordinates}
                            holes={polygon.holes}
                            strokeColor="#FFFF"
                            fillColor="rgba(0,190,128, 0.7)"
                            strokeWidth={1}
                        />
                    ))}
                    {editing && (
                        <Polygon
                            key={editing.id}
                            coordinates={editing.coordinates}
                            holes={editing.holes}
                            strokeColor="#fff"
                            fillColor="rgba(0,190,128, 0.7)"
                            strokeWidth={1}
                        />
                    )}
                </MapView>
                <IconButton
                    icon="keyboard-backspace"
                    color="#FFFF"
                    size={30}
                    onPress={() => { navigation.navigate('NewSafra') }} style={{ marginTop: 10 }}
                />

                <FAB.Group
                    open={open}
                    icon='border-color'
                    actions={[
                        {
                            icon: 'terrain',
                            label: 'Mapa Satelite 2D',

                            onPress: () => setStyleMap('hybrid')
                        },
                        {
                            icon: 'routes',
                            label: 'Mapa 2D',

                            onPress: () => setStyleMap('standard')
                        },
                        {
                            icon: 'terrain',
                            label: 'Mapa Satélite',

                            onPress: () => setStyleMap('satellite')
                        },

                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />

            </View>
            <View style={styles.ViewButton}>
                <Chip
                    style={styles.ChipButton}
                    icon='delete'
                    type='flat'
                    onPress={() => Delete()}>
                    <Text style={{ fontSize: 18 }}>Excluir
            </Text>
                </Chip>
                <Chip
                    style={styles.ChipButton}
                    icon='check-bold'
                    type='flat'
                    onPress={() => Save()}>
                    <Text style={{ fontSize: 18, fontFamily: 'sans-serif' }}>Salvar
            </Text>
                </Chip>
            </View>
        </View>
    ) : <ActivityIndicator style={{ flex: 1 }} animating size="large" />
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#fff",
    },
    ChipButton: {
        width: '30%',
        alignItems: 'center',
        marginHorizontal: '11%',
        marginTop: 7,
        backgroundColor: '#ffff'
    },
    fabGroup: {
        position: 'absolute',
        margin: 16,
        right: 0,
        backgroundColor: '#ef3340',

    },
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
    },
    mapView: {
        width: '100%',
        height: '92%',
        backgroundColor: "#000",
    },
    optionsView: {
        width: '100%',
        height: '15%',
    },
    ViewButton: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },

})
