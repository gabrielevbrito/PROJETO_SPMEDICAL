import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import login from './login';
import consultas from './consultas';
import perfil from './perfil';

const bottomTab = createBottomTabNavigator();

export default class Main extends Component {

  render(){
    return (
      <View style={styles.main}>
        <bottomTab.Navigator
        initialRouteName= 'Eventos'
        tabBarOptions={{
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#B727FF',
            inactiveBackgroundColor: '#DD99FF',
            activeTintColor: '#FFF',
            inactiveTintColor: '#FFF',
            style: { height : 50 }
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: () => {
            if (route.name === 'login') {
                return(
                <Image 
                    source={require('../../assets/img/logo_spmedgroup.png')}
                    style={styles.tabBarIcon}
                />
                )
            }

            if (route.name === 'consultas') {
                return(
                <Image
                    source={require('../../assets/img/calendar.png')}
                    style={styles.tabBarIcon}
                />
                )
            }

            if (route.name === 'perfil') {
                return(
                <Image 
                    source={require('../../assets/img/profile.png')}
                    style={styles.tabBarIcon}
                />
                )
            }
            }
        }) }
        >
            <bottomTab.Screen name="Login" component={login} />
            <bottomTab.Screen name="Consultas" component={consultas} />
            <bottomTab.Screen name="Perfil" component={perfil} />
        </bottomTab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: '#F1F1F1'
  },

  tabBarIcon: {
    width: 22,
    height: 22
  }

});