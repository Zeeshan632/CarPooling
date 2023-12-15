import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Welcome from '../screens/AuthStack/Welcome';
import Signup from '../screens/AuthStack/Signup';
import Login from '../screens/AuthStack/Login';


const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  )
}

export default AuthStack