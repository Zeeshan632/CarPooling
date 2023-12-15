import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BtnComp from '../../components/BtnComp';
import colors from '../../theme/colors';

const Welcome = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <View style={{alignItems:'center', width: wp('90%'), alignSelf: 'center', marginTop: hp('35%')}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp('5.5%'), marginBottom: hp('35%')}}>CAR POOLING</Text>

            <View style={{width: wp('85%'), alignSelf: 'center', marginBottom: 10}}>
                <BtnComp btnText={'Login'} onPress={() => navigation.navigate('Login')} />
            </View>
            <View style={{width: wp('85%'), alignSelf: 'center'}}>
                <BtnComp btnText={'Sign Up'} onPress={() => navigation.navigate('Signup')} style={{backgroundColor: colors.themeBlack}} />
            </View>
        </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})