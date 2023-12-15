import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Home from '../screens/PassengerStack/Home';



const Stack = createNativeStackNavigator();
const PassengerStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}

export default PassengerStack