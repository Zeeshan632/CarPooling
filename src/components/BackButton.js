import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';

const BackButton = ({navigation}) => {
  return (
      <TouchableOpacity style={styles.backBtnIcon} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={25} color={'black'} />
      </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
    backBtnIcon: {
        position: 'absolute',
        top: 15,
        left: 25,
        backgroundColor: 'lightgrey',
        borderRadius: 250,
        padding: 6
    }
});
