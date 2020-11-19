import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import {
  Title,
  Caption,
  Drawer,
} from 'react-native-paper'
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


import { AuthContext } from './navigation/context'

export function DrawerContent(props) {

  const { signOut } = React.useContext(AuthContext)

  return (

    <View style={{ flex: 1, backgroundColor: '#7ed957' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>


          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem style={styles.drawerSection} icon={({ color, size }) => (<Icon name="home" color="#3d3935" size={size} />)} label="Home" label="Home"
              onPress={() => { /*props.navigation.navigate('Home') */ }} />
          </Drawer.Section>



        </View>
      </DrawerContentScrollView>
      <Drawer.Section >
        <DrawerItem icon={({ color, size }) => (<Icon name="exit-to-app" color="#3d3935" size={size} />)} label="Encerrar sessão" onPress={() => { signOut() }} />

      </Drawer.Section>

    </View>
  )
}


const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center'

  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'sans-serif'

  },
  caption: {
    fontSize: 20,
    lineHeight: 14,
    textAlign: 'center'
  },

  drawerSection: {
    marginTop: 30,
    fontFamily: 'sans-serif',
    color: '#ffff',
    fontSize: 20

  },
  bottomDrawerSection: {
    marginBottom: 15,
    marginTop: 100,

  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {

    marginTop: 20

  }
});

