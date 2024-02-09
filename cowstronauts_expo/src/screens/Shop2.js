import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';

const App = () => {
  const play = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sound/Josh.exe.mp3')
    );
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SHOP</Text>
      </View>

      <Image
        source={require('../../assets/img/jupiter.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.cardContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity onPress={play}>
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
          </TouchableOpacity>
          <View style={styles.product}>
            <Text>SOY MILK</Text>
            <Text>Les vaques produiran el doble durant 3 minuts</Text>
          </View>
          <View style={styles.product}>
            <Text>VACA TANICA</Text>
            <Text>Probabilitat del 32% que aparega una vaca satànica</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 1,
    backgroundColor: '#2B2930',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '100%',
    height: 100, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#A6465B',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '110%',
    height: '95%',
  },
  scrollViewContent: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  cardContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    top: 170,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  product: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 4,
    height: 120,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default App;
