import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import {Button} from 'react-native-paper';
import SvgLogo from '../../assets/img/svg/SvgLogo';

const HomeScreen = ({navigation}) => {
  return (
    <ImageBackground source={require('../../assets/img/inicio.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.firstContainer}>
        <TouchableOpacity onPress={() => console.log("Hola")}>
        <Image source={require('../../assets/img/screw.png')} style={{width:45, height:50}}/>
        </TouchableOpacity>
        </View>
        <View style={styles.secondContainer}>
          <SvgLogo />
        </View>
        <View style={styles.thirdContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.tapSection}>
        <Text style={styles.tapTxt}>Pulsa para continuar...</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapSection :{
    flex:1,
    flexDirection:"column-reverse"
  },
  firstContainer: {
    flexDirection:"row-reverse",
    flex:0.75,
    width: '80%',
    marginTop:50,
  },
  secondContainer: {
    flex:1,
    width: '80%',
    alignItems:"center",
  },
  thirdContainer: {
    flex:4,
    width: '80%',
    marginBottom: 20,
  },
  tapTxt:{
    color:"white",
    fontSize:23,
    alignSelf:"center",
    fontWeight:'bold',
    marginBottom:70,
  }
});

export default HomeScreen;
