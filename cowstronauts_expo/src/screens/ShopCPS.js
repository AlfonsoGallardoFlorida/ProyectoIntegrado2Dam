import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useContext } from 'react';
import ScreensContext from './ScreenContext';

const ShopCPS = () => {
  const { allUpgrades, setAllUpgrades } = useContext(ScreensContext);
  const { userInfo, setUserInfo } = useContext(ScreensContext);
  const {coin, setCoin} = useContext(ScreensContext);
  const { upgradesUnlocked, setUpgradesUnlocked } = useContext(ScreensContext);
  const {pointsPerSecond, setPointsPerSecond} = useContext(ScreensContext);

  const play = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/sound/Josh.exe.mp3'));
    await sound.playAsync();
  };


  const buyUpgrade = (data) => {
    const id = data.id;
    const lvlMax = data.lvlMax;
    let upgradeLevel = 0;
    let isupgradeSaved = false;
    upgradesUnlocked.map(element => {
      if(element.idUpgrade === id) {
        upgradeLevel = element.cantUpgrade
        isupgradeSaved = true;
      }else{
        upgradeLevel = 0;
      } 
    })
    console.log(upgradeLevel);

    if(upgradeLevel < lvlMax) {
      buyOne(data, isupgradeSaved);
    }

  }

  const buyOne = (data, isUpgradeSaved) => {
    console.log(upgradesUnlocked);
    if(data.cost <= coin) {
      setCoin(coin - data.cost);
      if(isUpgradeSaved) {
        let upgradesSave = [...upgradesUnlocked];
        upgradesSave.map(element => (element.idUpgrade === data.id) && element.cantUpgrade++)
        console.log(upgradesSave);
        setUpgradesUnlocked(upgradesSave);
      }else{
        let newUpgrade = {
          idUpgrade: data.id,
          cantUpgrade: 1
        }
        setUpgradesUnlocked([...upgradesUnlocked, newUpgrade]);
      }

      setPointsPerSecond(pointsPerSecond+data.effect[0].quantity);
    }else{
      alert("Not enough Zlotys to buy this upgrade.")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TIENDA CPS</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Moneda</Text>
        {allUpgrades.upgrade.map((element, i) => {
          if(element.effect[0].type === "cps") {
            return(
              <TouchableOpacity onPress={() => buyUpgrade(element)} key={i.toString()}>
              <View style={styles.product}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={require('../../assets/img/Josh.jpg')}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <Text>{element.name}</Text>
                  <Text>
                    {element.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            )
          }
        })}
{/*         <TouchableOpacity onPress={play}>
          <View style={styles.product}>
            <View style={{ flex: 1 }}>
              <Image
                source={require('../../assets/img/Josh.jpg')}
                style={{ width: 100, height: 100 }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>JOSH HUTCHERSON</Text>
              <Text>
                JoshHutchersonJoshHutchersonJoshHutchersonJoshHutchersonJoshHutchersonJoshHutcherson
              </Text>
            </View>
          </View>
        </TouchableOpacity> */}
        <View style={styles.product}>
          <Text>SOY MILK</Text>
          <Text>Les vaques produiran el doble durant 3 minuts</Text>
          {/* Agregar icono de vaso de leche */}
        </View>
        <View style={styles.product}>
          <Text>VACA TANICA</Text>
          <Text>Probabilitat del 32% que aparega una vaca satànica</Text>
          {/* Agregar icono de vaca */}
        </View>
      </View>
      <View style={styles.navigation}>
        {/* Agregar botones de navegación con iconos */}
      </View>
    </View>
  );
};

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
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionText: {
    color: '#fff',
    fontSize: 16,
  },
  product: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ShopCPS;
