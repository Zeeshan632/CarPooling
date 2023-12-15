import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import auth from '@react-native-firebase/auth';
import BtnComp from '../../components/BtnComp'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/AuthSlice';
import Toast from 'react-native-toast-message';

const Home = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    auth().signOut().then(() => {
      dispatch(logout())
      console.log('User Logged Out')
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.code
      })
    })
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: heightPercentageToDP('4.5'), marginTop: heightPercentageToDP('8%')}}>Passenger Home</Text>
      <BtnComp btnText={'Logout'} onPress={handleLogout} style={{width: '30%', position: 'absolute', top: 20, right: 30, borderRadius: 8, backgroundColor: '#AD3A39'}}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})