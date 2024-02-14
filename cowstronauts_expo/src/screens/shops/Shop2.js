import React, { useState } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome'; 
//import svgEarth from '../../../assets/img/svg/svgEarth';

const App = () => {
  const [upgradePurchased, setUpgradePurchased] = useState(false);
  const play = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/sound/Josh.exe.mp3')
    );
    await sound.playAsync();
  };
  // <svgEarth />
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleShip}>SHIP</Text>
        <Text style={styles.titleUp}>UPGRADES</Text>
      </View>

      <ImageBackground
        source={require('../../../assets/img/planets/earth.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.scrollViewContent}>
          <ScrollView style={{ height: windowHeight - 200 }}>
            <TouchableOpacity onPress={() => setUpgradePurchased(true)} style={styles.product}>
              <View style={styles.productImageContainer}>
                <Image
                  source={require('../../../assets/img/upgrades_cps/images/Josh.jpg')}
                  style={styles.productImage}
                />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>JOSH HUTCHERSON</Text>
                <Text style={styles.productDescription}>
                  JoshHutchersonJoshHutchersonJoshHutchersonJoshHutchersonJoshHutcherson
                </Text>
                <Text style={styles.coinsUpgrade}>
                  {upgradePurchased ? (
                    <Icon name="check" size={20} color="green" />
                  ) : (
                    <>
                      1000 &nbsp;
                      <Image
                        source={require('../../../assets/img/logos/zloty.png')}
                        style={styles.coinImage}
                      />
                    </>
                  )}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={play} style={styles.product}>
              <View style={styles.productImageContainer}>
                <Image
                  source={require('../../../assets/img/upgrades_cps/images/Josh.jpg')}
                  style={styles.productImage}
                />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>SOY MILK</Text>
                <Text style={styles.productDescription}>
                  Les vaques produiran el doble durant 3 minuts
                </Text>
                <Text style={styles.coinsUpgrade}>
                  1000 &nbsp;
                  <Image
                    source={require('../../../assets/img/logos/zloty.png')}
                    style={styles.coinImage}
                  />
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.product}>
              <Text style={styles.productTitle}>VACA TANICA</Text>
              <Text style={styles.productDescription}>
                Probabilitat del 32% que aparega una vaca satànica
              </Text>
            </View>
          </ScrollView>
        </View>
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
    paddingTop: 5,
  },
  titleShip: {
    color: '#8C81A7',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 65,
  },
  titleUp: {
    color: '#8C81A7',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundImage: {
    width: windowWidth,
    height: windowHeight * 0.85,
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 5,
    maxHeight: 400,
    width: '100%',
  },
  product: {
    width: '85%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#2B2930',
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 4,
    overflow: 'hidden',
    marginLeft: 7,
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
  coinImage: {
    width: 15,
    height: 15,
  },
  coinsUpgrade: {
    color: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default App;
