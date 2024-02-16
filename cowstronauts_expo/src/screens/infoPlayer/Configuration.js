import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Image, Switch, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Slider, CheckBox, Button } from 'react-native-elements';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import ScreensContext from '../ScreenContext';

const Configuration = ({ navigation }) => {
  // State variables
  const [isDaltonicMode, setIsDaltonicMode] = useState(false);
  const [selected, setSelected] = useState('');
  
  // Context variables
  const { areConstellationsVisible, setAreConstellationsVisible } = useContext(ScreensContext);
  const { userInfo, setUserInfo } = useContext(ScreensContext);
  const { isMoonMoving, setIsMoonMoving } = useContext(ScreensContext);
  const { cantClicks, setCantClicks } = useContext(ScreensContext);
  const { coin, dispatch } = useContext(ScreensContext);
  const { tapsPerSecond, setTapsPerSecond } = useContext(ScreensContext);
  const { pointsPerClick, setPointsPerClick } = useContext(ScreensContext);
  const { upgradesUnlocked, setUpgradesUnlocked } = useContext(ScreensContext);
  const { pointsPerSecond, setPointsPerSecond } = useContext(ScreensContext);
  const { isMuted, setIsMuted } = useContext(ScreensContext);

  const navigationUsage = useNavigation();

  // Language options data
  const data = [
    { key: '1', value: 'English' },
    { key: '2', value: 'Valencià' },
    { key: '3', value: 'Castellano' },
  ];

  // Toggle functions
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleDaltonicMode = () => {
    setIsDaltonicMode(!isDaltonicMode);
  };

  const toggleConstellationsVisible = () => {
    setAreConstellationsVisible(!areConstellationsVisible);
  };

  const toggleMoonMoving = () => {
    setIsMoonMoving(!isMoonMoving);
  };

  // Function to save progress
  const saveProgress = () => {
    // Checking if user info is available
    if (userInfo === undefined) return;

    // Creating JSON object for save data
    const jsonSave = [
      {
        upgrades: upgradesUnlocked,
        cantClicks: cantClicks,
        cantPoints: coin,
        cps: pointsPerSecond,
        pointsPerClick: pointsPerClick
      }
    ];

    // Calling save API function
    saveApi(jsonSave);
  };

  // Function to call save API
  const saveApi = async (jsonSave) => {
    try {
      const response = await fetch('http://18.213.13.32:8080/load?id=' + userInfo.data.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonSave)
      });

      if (response.ok) console.log("Progress Saved!");
    } catch (error) {
      console.log(error);
    }
  };

  // Handling navigation actions
  const handleShowCredits = () => {};
  const handleReturn = () => {
    navigation.navigate('Home');
  };
  const handleLogout = () => {
    // Alert for logout confirmation
    Alert.alert(
      'Logout',
      'Are you sure? Your unsaved progress will be erased.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Configuration Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/img/logos/config.png')}
          style={styles.image}
        />
      </View>
      {/* Configuration Settings */}
      <ScrollView style={styles.settingsContainer}>
        {/* Title */}
        <Text style={styles.title}>COWFIGURATION</Text>
        {/* Mute Switch */}
        <View style={styles.volumeContainer}>
          <Text style={styles.volumeLabelText}>Mute:</Text>
          <CheckBox
            checked={isMuted}
            onPress={toggleMute}
            checkedIcon='check-circle'
            checkedColor='#8C81A7'
            uncheckedColor='#8C81A7'
            containerStyle={styles.checkBox}
          />
        </View>
        {/* Daltonic Mode Switch */}
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
        {/* Visible Constellations Switch */}
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
        {/* Moving Moon Switch */}
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
        {/* Language Selection */}
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
        {/* Buttons Container */}
        <View style={styles.buttonContainer}>
          {/* Displaying account name if available */}
          <View style={{ marginBottom: 10 }}>
            <Text style={{ color: 'white' }}>
              Account{userInfo && userInfo.data ? <Text>: {userInfo.data.name}</Text> : ''}
            </Text>
          </View>
          {/* Save Progress Button */}
          <View style={styles.leftButtons}>
            <View style={{ marginBottom: 20 }}>
              <Button
                title="Save progress"
                onPress={() => saveProgress()}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
              />
            </View>
            {/* Logout Button */}
            <Button
              title="Logout"
              onPress={handleLogout}
              buttonStyle={styles.button}
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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
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
    borderWidth: 1,
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
