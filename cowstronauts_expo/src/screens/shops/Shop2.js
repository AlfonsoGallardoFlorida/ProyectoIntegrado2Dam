import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';

const App = () => {
  const play = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/sound/Josh.exe.mp3')
    );
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SHOP</Text>
      </View>

      <ImageBackground
        source={require('../../../assets/img/planets/jupiter.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity onPress={play} style={styles.product}>
            <View style={styles.productImageContainer}>
              <Image
                source={require('../../../assets/img/upgrades_cps/images/Josh.jpg')}
                style={styles.productImage}
              />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>JOSH HUTCHERSON</Text>
              <Text style={styles.productDescription}>
                JoshHutchersonJoshHutchersonJoshHutchersonJoshHutchersonJoshHutchersonJoshHutcherson
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.product}>
            <Text style={styles.productTitle}>SOY MILK</Text>
            <Text style={styles.productDescription}>
              Les vaques produiran el doble durant 3 minuts
            </Text>
          </View>

          <View style={styles.product}>
            <Text style={styles.productTitle}>VACA TANICA</Text>
            <Text style={styles.productDescription}>
              Probabilitat del 32% que aparega una vaca satànica
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
      <View style={styles.navigation} />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2930',
  },
  header: {
    height: 115,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#8C81A7',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 60,
  },
  backgroundImage: {
    width: windowWidth,
    height: windowHeight * 0.85, 
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 140, 
  },
  product: {
    width: '90%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#2B2930',
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 4,
    overflow: 'hidden',
  },
  productImageContainer: {
    width: 100, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1, 
    marginLeft: 10,
  },
  productTitle: {
    fontWeight: 'bold',
    color: '#8C81A7',
  },
  productDescription: {
    flexWrap: 'wrap',
    flexShrink: 1,
    width: '100%',
    color: '#FFFF',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default App;
