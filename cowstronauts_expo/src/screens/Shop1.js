import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import SvgJupiter from '../../assets/img/svg/SvgJupiter';
import SvgPluto from '../../assets/img/svg/SvgPluto';

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
          {renderPlanet(rotateAnimJupiter, <SvgJupiter />, () => navigation.navigate("ShopCPS"))}
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={styles.secondContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.plutoContainer}>
          {renderPlanet(rotateAnimPluto, <SvgPluto />, () => navigation.navigate("ShopClick"))}
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
  jupiterContainer: {
    flex: 1,
    flexDirection: "row",
    right: 150,
    bottom: 100
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
});

export default ButtonTemplate;
