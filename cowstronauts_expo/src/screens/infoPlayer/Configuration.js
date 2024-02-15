import React, { useState, useEffect, useContext  } from 'react';
import { View, ScrollView, Image, Switch, Text, StyleSheet } from 'react-native';
import { Slider, CheckBox, Button } from 'react-native-elements';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import ScreensContext from '../ScreenContext';


const Configuration = ({ navigation }) => {
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isDaltonicMode, setIsDaltonicMode] = useState(false);
  const [isEpilepticMode, setIsEpilepticMode] = useState(false);
  const { areConstellationsVisible, setAreConstellationsVisible } =
    useContext(ScreensContext);
  const { userInfo, setUserInfo } = useContext(ScreensContext);
  const {isMoonMoving, setIsMoonMoving} = useContext(ScreensContext);
  const [selected, setSelected] = useState('');
  const { cantClicks, setCantClicks } = useContext(ScreensContext);
  const { coin, setCoin } = useContext(ScreensContext);
  const { tapsPerSecond, setTapsPerSecond } = useContext(ScreensContext);
  const { pointsPerClick, setPointsPerClick } = useContext(ScreensContext);
  const { upgradesUnlocked, setUpgradesUnlocked } = useContext(ScreensContext);
  const { pointsPerSecond, setPointsPerSecond } = useContext(ScreensContext);
  const navigationUsage = useNavigation();
  const { isMuted, setIsMuted } = useContext(ScreensContext);


  const data = [
    { key: '1', value: 'English' },
    { key: '2', value: 'Valencià' },
    { key: '3', value: 'Castellano' },
  ];

  const toggleMute = () => {
    setIsMuted(!isMuted);
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

  const handleShowCredits = () => {

  };
  const handleReturn= () => {
    navigation.navigate('Home');
  };
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleCloseGame = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/img/logos/config.png')}
          style={styles.image}
        />
      </View>
      <ScrollView style={styles.settingsContainer}>
        <Text style={styles.title}>COWFIGURATION</Text>
        <View style={styles.volumeContainer}>
          <Text style={styles.volumeLabelText}>Moote:</Text>
          <CheckBox
            checked={isMuted}
            onPress={toggleMute}
            checkedIcon='check-circle'
            checkedColor='#8C81A7'
            uncheckedColor='#8C81A7'
            containerStyle={styles.checkBox}
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

            defaultOption={{ key: '1', value: 'English' }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.leftButtons}>
            <Button
              title="Save progress"
              onPress={() => saveProgress()}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <Button
              title="Logout"
              onPress={handleLogout}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <Button
              title="Close Game"
              onPress={handleCloseGame}
              buttonStyle={[styles.button]}
              textStyle={styles.buttonText}
            />
              <Button
              title="Return"
              onPress={handleReturn}
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
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  leftButtons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 800,
    marginRight: 5,
    marginBottom: 10
  },

  rightButtons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginLeft: 5,
  },

  button: {
    width: 300,
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
