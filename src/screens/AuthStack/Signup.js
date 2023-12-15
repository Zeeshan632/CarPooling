import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Touchable,
    TouchableOpacity,
    Image,
    ActivityIndicator
  } from 'react-native';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import React, {useState, useEffect} from 'react';
  import Input from '../../components/Input';
  import colors from '../../theme/colors';
  import { useSelector } from 'react-redux';
  import BtnComp from '../../components/BtnComp';
  import BackButton from '../../components/BackButton';
  import { Toast } from 'react-native-toast-message/lib/src/Toast';
  import auth from '@react-native-firebase/auth';
  import database, {firebase} from '@react-native-firebase/database';
  import Fontisto from 'react-native-vector-icons/Fontisto';
  import images from '../../assets/images';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrls from '../../BaseUrls';
  
  const Signup = ({navigation, route}) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureConfirmEntry, setSecureConfirmEntry] = useState(true);
    const [type, setType] = useState('passenger');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  
    const onChangeText = (changedText, key) => {
      setForm(oldForm => {
        return {...oldForm, [key]: changedText};
      });
    };
  
    const handleSignup = () => {
      if(form.email.length > 0, form.username.length > 0, form.password.length > 0, form.confirmPassword.length > 0){
        setLoading(true)
        
        auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(({user}) => {
          firebase
          .app()
          .database(BaseUrls.fb_realtime_database_endpoint)
          .ref(`/users/${user.uid}`)
          .set({
              userId: user.uid,
              username: form.username,
              email: form.email,
              userType: type
            })
            .then(() => {
              setLoading(false)
              navigation.navigate('Login')
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'User account created successfully 👋'
              });
            })
            .catch((error) => {
              console.log("ERRORRRRR    ", error)
              setLoading(false)
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `${error.code} 👋`
              });
            })
        })
        .catch(error => {
          setLoading(false)
          if (error.code === 'auth/email-already-in-use') {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'That email address is already in use! 👋'
            });
          }
          if (error.code === 'auth/invalid-email') {
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'The email address is invalid! 👋'
            });
          }
      
          console.log(error);
        });
      }else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please fill out the form completely! 👋'
        });
      }
    };
  
    return (
      <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
        <ScrollView style={{flexGrow: 1}}>
          <BackButton navigation={navigation} />
          <Text style={styles.heading}>Sign up</Text>
  
          <Text style={styles.subHeading}>Your username</Text>
          <View style={styles.inputCont}>
            <Input
              placeholder={'John Doe'}
              value={form.username}
              onChangeText={changedText => onChangeText(changedText, 'username')}
            />
          </View>

          <Text style={styles.subHeading}>Your email</Text>
          <View style={styles.inputCont}>
            <Input
              placeholder={'johndoe@example.com'}
              value={form.email}
              onChangeText={changedText => onChangeText(changedText, 'email')}
              keyboardType={'email-address'}
            />
          </View>
  
          <Text style={styles.subHeading}>Password</Text>
          <View style={styles.inputCont}>
            <Input
              placeholder={'8+ Characters'}
              value={form.password}
              onChangeText={changedText => onChangeText(changedText, 'password')}
              passwordField={true}
              secureTextEntry={secureTextEntry}
              onEyePress={() => setSecureTextEntry(!secureTextEntry)}
            />
          </View>

          <Text style={styles.subHeading}>Confirm Password</Text>
          <View style={styles.inputCont}>
            <Input
              placeholder={'Confirm your password'}
              value={form.confirmPassword}
              onChangeText={changedText => onChangeText(changedText, 'confirmPassword')}
              passwordField={true}
              secureTextEntry={secureConfirmEntry}
              onEyePress={() => setSecureConfirmEntry(!secureConfirmEntry)}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: wp('90%'), alignSelf: 'center', marginTop: 15}}>
            <TouchableOpacity onPress={() => setType('driver')} style={{flexDirection: 'row', alignItems: 'center'}}>
              {
                type === 'driver' ? (
                  <Fontisto name='radio-btn-active' size={25} color={'green'} />
                ) : (
                  <Fontisto name='radio-btn-passive' size={25} color={'green'} />
                )
              }
              <Text style={{marginLeft: 10, fontSize: hp('1.8%'), fontWeight: 'bold', color:'black'}}>Sign Up as Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType('passenger')} style={{flexDirection: 'row', alignItems: 'center'}}>
              {
                type === 'passenger' ? (
                  <Fontisto name='radio-btn-active' size={25} color={'green'} />
                ) : (
                  <Fontisto name='radio-btn-passive' size={25} color={'green'} />
                )
              }
              <Text style={{marginLeft: 10, fontSize: hp('1.8%'), fontWeight: 'bold', color:'black'}}>Sign Up as Passenger</Text>
            </TouchableOpacity>
          </View>
  
          <View
            style={{width: wp('85%'), alignSelf: 'center', marginBottom: 10, marginTop:30}}>
            <BtnComp
              btnText={loading ? <ActivityIndicator size={25} color={'white'} /> : 'Sign up'}
              onPress={handleSignup}
            />
          </View>
  
          <View
            style={{
              width: wp('85%'),
              alignSelf: 'center',
              marginVertical: 15,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text style={{color: '#7A86A1', fontSize: hp('2%')}}>Already have an account?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.5} style={{borderBottomWidth: 1, borderBottomColor: colors.themeBlue}}>
              <Text style={{fontSize: hp('2%'), color: colors.themeBlue, fontWeight: 'bold'}}>Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  };
  
  export default Signup;
  
  const styles = StyleSheet.create({
    heading: {
      fontSize: hp('3%'),
      fontWeight: 'bold',
      color: 'black',
      width: wp('85%'),
      alignSelf: 'center',
      marginTop: hp('8%'),
      marginBottom: hp('3%'),
    },
    inputCont: {
      width: '85%',
      alignSelf: 'center',
      marginVertical: 10,
    },
    subHeading: {
      color: '#7A86A1',
      fontSize: hp('2%'),
      width: wp('85%'),
      alignSelf: 'center',
      marginVertical: 5,
    },
    bottomBtn: {
      width: wp('85%'),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 250,
      flexDirection: 'row',
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
    }
  });
  