import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SvgJupiter from '../../assets/img/svg/SvgJupiter';
import SvgPluto from '../../assets/img/svg/SvgPluto';

const ButtonTemplate = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}></View>
      <View style={styles.secondContainer}>
        <View style={styles.planetContainer}>
          <TouchableOpacity activeOpacity={1} onPress={()=>{navigation.navigate("ShopCPS")}}>
          <SvgJupiter style={styles.jupiterImage}/>
          </TouchableOpacity>
        </View>
        <View style={{flex:1}}></View>
      </View>
      <View style={styles.secondContainer}>
        <View style={{flex:1}}></View>
        <View style={styles.planetContainer}>
          <TouchableOpacity activeOpacity={1} onPress={()=>{navigation.navigate("ShopClick")}}>
          <SvgPluto style={styles.plutoImage}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  firstContainer: {
    flex: 1,
  },
  planetContainer: {
    flex: 1,
    flexDirection:"row",
  },
  jupiterImage:{
    right:200,
  },
  plutoImage:{
    right:100,
    bottom:50,
  },
  secondContainer: {
    flex: 2,
    flexDirection: "row",
  },
});

export default ButtonTemplate;
