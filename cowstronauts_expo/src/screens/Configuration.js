import React, { useState } from 'react';
import { View, ScrollView, Image, Switch, Text, StyleSheet } from 'react-native';
import { Slider, CheckBox, Button } from 'react-native-elements';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';

const Configuration = () => {
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isDaltonicMode, setIsDaltonicMode] = useState(false);
  const [isEpilepticMode, setIsEpilepticMode] = useState(false);
  const [areConstellationsVisible, setAreConstellationsVisible] =
    useState(false);
  const [isMoonMoving, setIsMoonMoving] = useState(false);
  const [selected, setSelected] = useState('');
  const navigation = useNavigation();

  const data = [
    { key: '1', value: 'English' },
    { key: '2', value: 'Valencià' },
    { key: '3', value: 'Castellano' },
  ];

  const handleVolumeChange = (volume) => {
    setVolume(volume);
  };

  const toggleDaltonicMode = () => {
    setIsDaltonicMode(!isDaltonicMode);
  };

  const toggleEpilepticMode = () => {
    setIsEpilepticMode(!isEpilepticMode);
  };

  const toggleConstellationsVisible = () => {
    setAreConstellationsVisible(!areConstellationsVisible);
  };

  const toggleMoonMoving = () => {
    setIsMoonMoving(!isMoonMoving);
  };

  const handleHorizontalToggle = () => {
    setIsHorizontal(!isHorizontal);
  };

  const handleRemoveAds = () => {
    
  };

  const handleShowCredits = () => {
    
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleCloseGame = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/img/config.png')}
          style={styles.image}
        />
      </View>
      <ScrollView style={styles.settingsContainer}>
        <Text style={styles.title}>COWFIGURATION</Text>
        <View style={styles.volumeContainer}>
          <Text style={styles.volumeLabelText}>Volume:</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor="#D0BCFF"
            maximumTrackTintColor="#4F378B"
            thumbTintColor="#FFFF"
            thumbStyle={styles.thumb}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Daltonic Mode</Text>
          <CheckBox
            checked={isDaltonicMode}
            onPress={toggleDaltonicMode}
            checkedIcon='check-circle'
            checkedColor='#8C81A7'
            uncheckedColor='#8C81A7'
            containerStyle={styles.checkBox}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Epileptic Mode</Text>
          <CheckBox
            checked={isEpilepticMode}
            onPress={toggleEpilepticMode}
            checkedIcon='check-circle'
            checkedColor='#8C81A7'
            uncheckedColor='#8C81A7'
            containerStyle={styles.checkBox}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Visible Constellations</Text>
          <CheckBox
            checked={areConstellationsVisible}
            onPress={toggleConstellationsVisible}
            checkedIcon='check-circle'
            checkedColor='#8C81A7'
            uncheckedColor='#8C81A7'
            containerStyle={styles.checkBox}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Moving Moon</Text>
          <CheckBox
            checked={isMoonMoving}
            onPress={toggleMoonMoving}
            checkedIcon='check-circle'
            checkedColor='#8C81A7'
            uncheckedColor='#8C81A7'
            containerStyle={styles.checkBox}
          />
        </View>
        <View style={styles.selectListContainer}>
          <Text style={styles.languageText}>Language</Text>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            style={styles.selectList}
            itemStyle={styles.selectListItem}
            itemTextStyle={styles.selectListItemText}
            
            defaultOption={{ key:'1', value:'English' }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.leftButtons}>
            <Button
              title="Remove Ads"
              onPress={handleRemoveAds}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <Button
              title="Logout"
              onPress={handleLogout}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
          <View style={styles.rightButtons}>
            <Button
              title="Credits"
              onPress={handleShowCredits}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <Button
              title="Close Game"
              onPress={handleCloseGame}
              buttonStyle={[styles.button, { marginBottom: 20 }]} 
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B2930',
    paddingVertical: 20, 
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1, 
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  settingsContainer: {
    backgroundColor: '#49464F',
    borderRadius: 20,
    padding: 20,
    width: '93%',
    marginBottom: 10, 
  },

  slider: {
    width: 200,
    height: 40,
  },

  checkBox: {
    marginTop: 5,
    backgroundColor: 'transparent', 
    borderWidth: 0, 
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  settingText: {
    flex: 1,
    marginRight: 10,
    color: '#FFFF',
  },

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10, 
  },

  leftButtons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    maxWidth: 300,
    marginRight: 5,
  },

  rightButtons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginLeft: 5,
  },

  button: {
    width: 110,
    maxWidth: 300,
    borderRadius: 20,
    backgroundColor: '#777777',
    marginBottom: 10, 
  },

  buttonText: {
    textAlign: 'center',
  },

  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  selectListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5, 
    marginBottom: 10,
  },

  languageText: {
    color: '#FFFF',
  },

  selectList: {
    flex: 1,
    alignSelf: 'flex-end',
  },

  selectListItem: {
    backgroundColor: '#FFFFFF',
  },

  selectListItemText: {
    color: '#FFFFFF',
    alignSelf: 'flex-start',
  },

  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  volumeLabelText: {
    color: '#FFFF',
    marginRight: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8C81A7',
    marginBottom: 10,
    textAlign: 'center', 
  },
});

export default Configuration;
