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
import { useContext } from 'react';
import ScreensContext from '../ScreenContext';
//import svgEarth from './assets/img/svg/svgEarth';

const App = () => {
  const [upgradePurchased, setUpgradePurchased] = useState(false);
  const { allUpgrades, setAllUpgrades } = useContext(ScreensContext);
  const { upgradesUnlocked, setUpgradesUnlocked } = useContext(ScreensContext);
  const { coin, dispatch } = useContext(ScreensContext);

  const buyUpgrade = (data) => {
    const id = data.id;
    const lvlMax = data.lvlMax;
    let upgradeLevel = 0;
    let isupgradeSaved = false;
    upgradesUnlocked.map(element => {
      if (element.idUpgrade === id) {
        upgradeLevel = element.cantUpgrade
        isupgradeSaved = true;
      } else {
        upgradeLevel = 0;
      }
    })


    if (upgradeLevel < lvlMax) {
      buyOne(data, isupgradeSaved);
    }

  }

  const buyOne = (data, isUpgradeSaved) => {
    console.log(data.id);
    if (data.cost <= coin) {
      dispatch({ type: 'reduceByPurchase', value: data.cost });
      if (isUpgradeSaved) {
        let upgradesSave = [...upgradesUnlocked];
        upgradesSave.map(element => (element.idUpgrade === data.id) && element.cantUpgrade++)
        console.log(upgradesSave);
        setUpgradesUnlocked(upgradesSave);
      } else {
        let newUpgrade = {
          idUpgrade: data.id,
          cantUpgrade: 1
        }
        setUpgradesUnlocked([...upgradesUnlocked, newUpgrade]);
      }

      setPointsPerSecond(pointsPerSecond + data.effect[0].quantity);
    } else {
      alert("Not enough Zlotys to buy this upgrade.")
    }
  }

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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{coin} <Image source={require("../../../assets/img/logos/zloty.png")} style={styles.coinImage} /></Text>
          {allUpgrades.upgrade.map((element, i) => {
            if (element.effect[0].type === "end") {
              let cantUpgrade = 0;
              (upgradesUnlocked !== undefined) && upgradesUnlocked.map(e => (e.idUpgrade === element.id) && (cantUpgrade = e.cantUpgrade));
              return (
                <TouchableOpacity onPress={() => buyUpgrade(element)} key={i.toString()}>
                  <View style={styles.product}>
                    <View style={{ flex: 1 }}>
                      <Image
                        source={{ uri: 'data:image/gif;base64,' + element.img }}
                        style={styles.productImage}
                      />
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productTitle}>{element.name.toUpperCase()}</Text>
                      <Text style={styles.productDescription}>
                        {element.description}
                      </Text>
                      <Text style={styles.coinsUpgrade}>
                        {element.cost}
                        {upgradePurchased ? (
                          <Icon name="check" size={20} color="green" />
                        ) : (
                          <>
                            &nbsp;
                            <Image
                              source={require('../../../assets/img/logos/zloty.png')}
                              style={styles.coinImage}
                            />
                          </>
                        )}

                      </Text>
                    </View>
                    <View style={{ flex: .6 }}>
                      <Text>{cantUpgrade} / {element.lvlMax}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
          })}
        </View>
        {/*
        <View style={styles.scrollViewContent}>
          <ScrollView style={{ height: windowHeight - 200 }}>
            <TouchableOpacity
              onPress={() => setUpgradePurchased(true)}
              style={styles.product}>
              <View style={styles.productImageContainer}>
                <Image
                  source={require('./assets/img/upgrades_finals/mootor.png')}
                  style={styles.productImage}
                />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>MOO-TOR</Text>
                <Text style={styles.productDescription}>Motor</Text>
                <Text style={styles.coinsUpgrade}>
                  {upgradePurchased ? (
                    <Icon name="check" size={20} color="green" />
                  ) : (
                    <>
                      1000 &nbsp;
                      <Image
                        source={require('./assets/img/logos/zloty.png')}
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
                  source={require('./assets/img/upgrades_finals/lechette.png')}
                  style={styles.productImage}
                />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>LECH-ETTE</Text>
                <Text style={styles.productDescription}>
                  Les vaques produiran el doble durant 3 minuts
                </Text>
                <Text style={styles.coinsUpgrade}>
                  1000 &nbsp;
                  <Image
                    source={require('./assets/img/logos/zloty.png')}
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
                  */}
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
    width: 65,
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
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default App;