import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import SvgMoon from '../../assets/img/svg/SvgMoon';

const Tapcreen = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [coin, setCoin] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(null);
  const [tapsPerSecond, setTapsPerSecond] = useState(0);

  // Configurar la animación de rotación constante


  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, { useNativeDriver: false, toValue: 1, easing: Easing.linear, duration: 20000})
    ).start()
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      setTapsPerSecond(0);
    }, 1000);

    return () => clearInterval(timer);
  }, [tapsPerSecond]);

  const handlePress = () => {
    // Animación de escala al hacer tap
    setCoin(coin+1);
     const now = Date.now();

    if (lastTapTime) {
      const timeDiff = now - lastTapTime;
      const tapsPerSecondValue = 1000 / timeDiff;
      setTapsPerSecond(tapsPerSecondValue.toFixed(2));
    }
    setLastTapTime(now);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  

  return (
    <ImageBackground
      source={require('../../assets/img/TapBackground.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.firstContainer}>
        <Text style={styles.txtCoins}>{coin} Zloty</Text>
        <Text style={styles.txtCoins}>{tapsPerSecond} Zloty/s</Text>
        </View>
        <View style={styles.secondContainer}>
          <TouchableOpacity activeOpacity={1} onPress={handlePress} style={{width:"100%",height:"100%",alignSelf:"center"}}>
            <Animated.View style={{ transform: [{scale: scaleAnim}]}}>
              <Animated.View style={{ transform: [{rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })}]}}>
                <SvgMoon />
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#393939',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstContainer: {
    flex: 1.25,
    width: '100%',
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  moonImage: {
    top: 150,
    width: '125%',
    height: '125%',
    alignSelf: 'center',
  },
  txtCoins:{
    color:"white",
    top:70,
    fontSize:30,
    textAlign:"center",
  }
});

export default Tapcreen;
