import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//screens
import AuthStack from './AuthStack';
import PassengerStack from './PassengerStack';
import DriverStack from './DriverStack';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const index = () => {
  const {token, data} = useSelector(state => state.authData)

  console.log(token, data)
  
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {
            token?.length > 0 ? (
              data?.userType === 'driver' ? (
                <Stack.Screen name='DriverStack' component={DriverStack} />
              ) : (
                <Stack.Screen name='PassengerStack' component={PassengerStack} />
              )
            ) : (
              <Stack.Screen name='AuthStack' component={AuthStack} />
            )
          }
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default index