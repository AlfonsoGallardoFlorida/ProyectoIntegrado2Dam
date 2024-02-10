import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import SvgLogo from '../../assets/img/svg/SvgLogo';
import { useContext } from 'react';
import ScreensContext from './ScreenContext';

const Login = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {userInfo, setUserInfo} = useContext(ScreensContext);
  
  const getData = async (url) => {
    try {
      const response = await fetch(url);
      console.log(response.status);
      const jsonResponse = await response.json();
      if (response.status === 200) {
        console.log(jsonResponse);
        setUserInfo(jsonResponse);
        navigation.navigate("TabsGame");
      }else if(response.status === 401) {
        alert("Login not correct. Please try again");
      }
    } catch (error) {
      console.error(`Error en la solicitud: ${error.message}`);
    }
  };
  
  function onPressLogIn(name, pass) {
    getData(`http://18.213.13.32:8080/login?user=${name}&pass=${pass}`);

  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <SvgLogo />
      </View>

      <View style={styles.loginForm}>
        <TextInput
          style={styles.inputField}
          placeholder="Username"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => onPressLogIn(username, password)}>
{/*           <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('TabsGame')}> */}
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image source={require('../../assets/img/marte.png')} style={styles.marteImage} />

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1463F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  loginForm: {
    flex: 1,
    width: '65%',
    textAlign: 'center',
    marginBottom: 200,
  },
  inputField: {
    width: '100%',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '50%',
    padding: 10,
    backgroundColor: '#FEAA16',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  marteImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  footerTextContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 5,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Login;
