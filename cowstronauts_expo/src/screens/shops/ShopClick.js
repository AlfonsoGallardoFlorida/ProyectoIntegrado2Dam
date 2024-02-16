import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions,FlatList } from 'react-native';
import { Audio } from 'expo-av';
import { useContext } from 'react';
import ScreensContext from '../ScreenContext';

const ShopClick = ({navigation}) => {
  const { allUpgrades, setAllUpgrades } = useContext(ScreensContext);
  const { userInfo, setUserInfo } = useContext(ScreensContext);
  const { coin, dispatch } = useContext(ScreensContext);
  const { upgradesUnlocked, setUpgradesUnlocked } = useContext(ScreensContext);
  const { pointsPerClick, setPointsPerClick } = useContext(ScreensContext);
  const { cantClicks, setCantClicks } = useContext(ScreensContext);
  const { pointsPerSecond, setPointsPerSecond } = useContext(ScreensContext);

  const play = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../../assets/sound/lvlUpUpgrade.mp3'));
    await sound.playAsync();
  };


  const buyUpgrade = (data) => {
    const id = data.id;
    const lvlMax = data.lvlMax;
    let upgradeLevel = 0;
    let isupgradeSaved = false;
    upgradesUnlocked.map(element => {
      if (element.idUpgrade === id) {
        upgradeLevel = element.cantUpgrade
        console.log(element.cantUpgrade)
        isupgradeSaved = true;
      }
    })

    if (upgradeLevel < lvlMax) {
      buyOne(data, isupgradeSaved, lvlMax); // sergi borra esto
      
    }

  }

  const buyOne = (data, isUpgradeSaved, lvlMax) => {
    console.log(upgradesUnlocked);
    if (data.cost <= coin) {
      dispatch({type: 'reduceByPurchase', value: data.cost});
      if (isUpgradeSaved) {
        let upgradesSave = [...upgradesUnlocked];
        upgradesSave.map(element => ((element.idUpgrade === data.id) && (element.cantUpgrade++)))
        console.log(upgradesSave);
        setUpgradesUnlocked(upgradesSave);
      } else {
        let newUpgrade = {
          idUpgrade: data.id,
          cantUpgrade: 1
        }
        setUpgradesUnlocked([...upgradesUnlocked, newUpgrade]);
      }
      saveProgress();

      setPointsPerClick(pointsPerClick + data.effect[0].quantity);
    } else {
      alert("Not enough Zlotys to buy this upgrade.")
    }
  }

  const saveProgress = () => {
    if (userInfo === undefined) return;

    const jsonSave = [
      {
        upgrades: upgradesUnlocked,
        cantClicks: cantClicks,
        cantPoints: coin,
        cps: pointsPerSecond,
        pointsPerClick: pointsPerClick
      }
    ]
    console.log(upgradesUnlocked);
    saveApi(jsonSave);

  };

  const saveApi = async (jsonSave) => {
    try {
      const response = await fetch('http://18.213.13.32:8080/load?id=' + userInfo.data.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonSave)
      })
      console.log(response.status);
      if (response.ok) console.log("Progress Saved!");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>

      <ImageBackground
        source={require('../../../assets/img/planets/jupiter.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
           <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.navigate('Shop1')}>
          <View>
            <Image source={require("../../../assets/img/logos/flecha.png")} style={styles.arrowImage} />
          </View>
        </TouchableOpacity>
      <Text style={styles.title}>TIENDA CLICK MULTIPLIER</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{coin} <Image source={require("../../../assets/img/logos/zloty.png")} style={styles.coinImage} /></Text>
        <View>
        {allUpgrades.upgrade.length > 0 && (
        <FlatList
          data={allUpgrades.upgrade.filter(element => element.effect[0].type === "click")}
          keyExtractor={(item, index) => index.toString()}
          style={{margin: 20}}
          renderItem={({ item, index }) => {
            let cantUpgrade = 0;
            (upgradesUnlocked !== undefined) && upgradesUnlocked.map(e => (e.idUpgrade === item.id) && (cantUpgrade = e.cantUpgrade));
            return (
              <TouchableOpacity onPress={() => buyUpgrade(item)}>
                <View style={styles.product}>
                  <View style={{ flex: 1 }}>
                    <Image
                      source={{ uri: 'data:image/gif;base64,' + item.img }}
                      style={{ width: 130, height: 130, borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }}
                    />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'column', paddingTop: 10, paddingBottom: 5, alignItems: 'flex-start' }}>
                    <Text style={styles.upgradeName}>{item.name.toUpperCase()}</Text>
                    <Text style={{ alignSelf: 'center', textAlign: "center" }}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={{ flex: .6, justifyContent: "space-between", backgroundColor: "#bebebebe", borderRadius: 5 }}>
                    <Text></Text>
                    <Text style={{ textAlign: "center", fontWeight: "400" }}>{cantUpgrade} / {item.lvlMax}</Text>
                    <Text style={{ textAlign: "right", paddingRight: 10, fontWeight: "bold" }}>{item.cost} <Image source={require("../../../assets/img/logos/zloty.png")} style={styles.coinImage} /></Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        )}
        </View>
      </View>
      </ImageBackground>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393939',
    padding: 20,
  },
  title: {
    color: '#ff007f',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "Arial,sans-serif",
    top: -50
  },
  section: {
    flex: 1,
    marginBottom: 5,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  product: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    fontFamily: "sans-serif",
  },
  upgradeName: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: 'underline',
    fontSize: 15
  },
  coinImage: {
    width: 15,
    height: 15,
  },
  arrowImage: {
    width: 55,
    height: 55,
  },
  arrowContainer: {
    position: 'absolute',
    top: -130,
    left: -1,
    zIndex: 1,
  },
  backgroundImage: {
    width: windowWidth,
    height: windowHeight * 0.75,
    justifyContent: 'center',
    position: 'absolute',
    top: 170,
    left: 0,
  },
});

export default ShopClick;
