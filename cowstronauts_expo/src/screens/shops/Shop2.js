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
          <TouchableOpacity onPress={play}>
            <View style={styles.product}>
              <View style={{ flex: 1 }}>
                <Image
                  source={require('../../../assets/img/upgrades_cps/images/Josh.jpg')}
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
