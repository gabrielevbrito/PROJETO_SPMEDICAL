import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import consultas from './src/screens/consultas';
import login from './src/screens/login';
import perfil from './src/screens/perfil';

const AuthStack = createStackNavigator();

export default function Stack(){
  return(
    <NavigationContainer>
        <AuthStack.Navigator headerMode = 'none'>
          <AuthStack.Screen name ='consultas' component={consultas} />
          <AuthStack.Screen name ='login' component={login} />
          <AuthStack.Screen name ='perfil' component={perfil} />
        </AuthStack.Navigator>
    </NavigationContainer>
  )
}
