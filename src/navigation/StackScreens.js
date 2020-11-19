import React, { useState } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from '@react-navigation/drawer'

import { DrawerContent } from './../DrawerContent'
import Home from './../screens/Home'
import NewSafra from './../screens/Safra/NewSafra'
import NewEntresafra from './../screens/Entresafra/NewEntresafra'
import MapScreenSafra from './../screens/Safra/MapScreenSafra'
import MapScreenEntresafra from './../screens/Entresafra/MapScreenEntresafra'
import User from './../screens/User/User'
import EditUser from './../screens/User/EditUser'
import MyProduction from './../screens/MyProduction/MyProduction'
import MapScreen from './../screens/MyArea/Mapscreen'
import Safra from './../screens/Safra/Safra'
import InfoSafra from './../screens/Safra/InfoSafra'
import EditSafra from './../screens/Safra/EditSafra'
import EditCoordinates from  './../screens/Safra/EditCoordinates'
import Entresafra from './../screens/Entresafra/Entresafra'
import InfoEntresafra from './../screens/Entresafra/InfoEntresafra'
import EditEntresafra from './../screens/Entresafra/EditEntresafra'
import EditCoordinateEntresafra from './../screens/Entresafra/EditCoordinateEntresafra'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()


const Menu = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <DrawerContent {...props} />} >
            <Drawer.Screen name="Home" component={Home}  options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}

export default function StackScreen({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={Menu}
            />
            <Stack.Screen
                name="NewSafra"
                options={{ headerShown: false }}
                component={NewSafra}
            />
            <Stack.Screen
                name="NewEntresafra"
                options={{ headerShown: false }}
                component={NewEntresafra}
            />
              <Stack.Screen
                name="MapScreenSafra"
                options={{ headerShown: false }}
                component={MapScreenSafra}
            />
              <Stack.Screen
                name="MapScreenEntresafra"
                options={{ headerShown: false }}
                component={MapScreenEntresafra}
            />
              <Stack.Screen
                name="User"
                options={{ headerShown: false }}
                component={User}
            />
             <Stack.Screen
                name="EditUser"
                options={{ headerShown: false }}
                component={EditUser}
            />
             <Stack.Screen
                name="MyProduction"
                options={{ headerShown: false }}
                component={MyProduction}
            />
            <Stack.Screen
                name="MapScreen"
                options={{ headerShown: false }}
                component={MapScreen}
            />
            <Stack.Screen
                name="Safra"
                options={{ headerShown: false }}
                component={Safra}
            />
           <Stack.Screen
                name="InfoSafra"
                options={{ headerShown: false }}
                component={InfoSafra}
            />
             <Stack.Screen
                name="EditSafra"
                options={{ headerShown: false }}
                component={EditSafra}
            />
             <Stack.Screen
                name="EditCoordinates"
                options={{ headerShown: false }}
                component={EditCoordinates}
            />
             <Stack.Screen
                name="Entresafra"
                options={{ headerShown: false }}
                component={Entresafra}
            />
              <Stack.Screen
                name="InfoEntresafra"
                options={{ headerShown: false }}
                component={InfoEntresafra}
            />
            <Stack.Screen
                name="EditEntresafra"
                options={{ headerShown: false }}
                component={EditEntresafra}
            />
            <Stack.Screen
                name="EditCoordinateEntresafra"
                options={{ headerShown: false }}
                component={EditCoordinateEntresafra}
            />
          


        </Stack.Navigator>

    )
}