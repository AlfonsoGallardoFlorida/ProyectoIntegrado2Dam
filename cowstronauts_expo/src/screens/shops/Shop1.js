import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing, Text } from 'react-native';
import SvgJupiter from '../../../assets/img/svg/SvgJupiter';
import SvgPluto from '../../../assets/img/svg/SvgPluto';

const ButtonTemplate = ({ navigation }) => {
  const rotateAnimJupiter = useRef(new Animated.Value(0)).current;
  const rotateAnimPluto = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotation(rotateAnimJupiter);
    startRotation(rotateAnimPluto);
  }, []);

  const startRotation = (animatedValue) => {
    Animated.loop(
      Animated.timing(animatedValue, {
        useNativeDriver: false,
        toValue: 1,
        easing: Easing.linear,
        duration: 20000,
      })
    ).start();
  };

  const renderPlanet = (rotateAnim, planetSvg, onPress) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <Animated.View style={{
          transform: [{
            rotate: rotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }]
        }}>
          {planetSvg}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}></View>
      <View style={styles.secondContainer}>
        <View style={styles.jupiterContainer}>
          {renderPlanet(rotateAnimJupiter, <SvgJupiter />, () => navigation.navigate("ShopClick"))}
        </View>
        <View style={{ flex: 5, flexWrap:"wrap" }}>
        <TouchableOpacity onPress={() => navigation.navigate('ShopClick')}>
        <Text style={styles.buttonTopText}> + </Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondContainer}>
        <View style={{ flex: 1, flexWrap:"wrap", flexDirection:"row-reverse",zIndex:10 }}>
        <TouchableOpacity onPress={()=>{navigation.navigate("ShopCPS")}}>
        <Text style={styles.buttonBottomText}> + </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.plutoContainer}>
          {renderPlanet(rotateAnimPluto, <SvgPluto />, () => navigation.navigate("ShopCPS"))}
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393939',
  },
  firstContainer: {
    flex: 1,
  },
  jupiterContainer: {
    flex: 1,
    flexDirection: "row",
    right: 150,
    bottom: 100,
  },
  plutoContainer: {
    flex: 1,
    flexDirection: "row",
    right: 100,
    bottom: 50,
  },
  secondContainer: {
    flex: 2,
    flexDirection: "row",
  },
  buttonTopText: {
    color: 'white',
    textAlign:"center",
    fontSize: 25,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    top:80,
  },
  buttonBottomText:{
    color: 'white',
    textAlign:"center",
    fontSize: 25,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    top:150,
    left:150,
  }
});

export default ButtonTemplate;
