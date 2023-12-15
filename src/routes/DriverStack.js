import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Home from '../screens/DriverStack.js/Home';


const Stack = createNativeStackNavigator();
const DriverStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}

export default DriverStack