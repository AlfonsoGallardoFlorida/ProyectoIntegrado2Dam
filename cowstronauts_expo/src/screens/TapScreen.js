import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';
import SvgMoon from '../../assets/img/svg/SvgMoon';

const Tapcreen = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [coin, setCoin] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(null);
  const [tapsPerSecond, setTapsPerSecond] = useState(0);
  const [path, setPath] = useState([
    require('../../assets/sound/moonClick1.mp3'),
    require('../../assets/sound/MoonClick2.mp3'),
    require('../../assets/sound/MoonClick3.mp3'),
    require('../../assets/sound/MoonClick4.mp3'),
    require('../../assets/sound/MoonClick5.mp3'),
  ]);
  const [sound, setSound] = useState();

  const soundObjects = useRef([]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, { useNativeDriver: false, toValue: 1, easing: Easing.linear, duration: 20000})
    ).start();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTapsPerSecond(0);
    }, 1000);

    return () => clearInterval(timer);
  }, [tapsPerSecond]);

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);


  const handlePress = async () => {
    setCoin(coin + 1);
    const now = Date.now();
    
    const randomIndex = Math.floor(Math.random() * path.length); // Generar un índice aleatorio válido
    
    const { sound } = await Audio.Sound.createAsync(path[randomIndex]);
    setSound(sound);
    await sound.playAsync();
  
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
          <TouchableOpacity activeOpacity={1} onPress={handlePress} style={{ width: "100%", height: "100%", alignSelf: "center" }}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Animated.View style={{ transform: [{ rotate: rotateAnim.interpolate({
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
  txtCoins: {
    color: "white",
    top: 70,
    fontSize: 30,
    textAlign: "center",
  }
});

export default Tapcreen;
