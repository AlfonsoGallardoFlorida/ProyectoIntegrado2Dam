import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import SvgLogo from '../../assets/img/svg/SvgLogo';
import React, { useState } from 'react';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSignUp = async () => {
    try {
      if (password !== repeatPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          password: password,
          dateCreated: new Date().toISOString(),
          lastSave: new Date().toISOString(),
          save: [],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro exitoso');
        navigation.navigate('TabsGame'); 
      } else {
        alert(`Error en el registro: ${data.error}`);
      }
    } catch (error) {
      console.error(`Error en la solicitud: ${error.message}`);
    }
  };

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
        <TextInput
          style={styles.inputField}
          placeholder="Repeat Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          onChangeText={(text) => setRepeatPassword(text)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image source={require('../../assets/img/martesignup.png')} style={styles.marteImage} />

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>Have an account?</Text>
      </View>
    </View>
  );
};

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
    marginBottom: 275,
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
    top: 610,
    bottom: 0,
    right: 0,
    width: 125,  
    height: 125, 
    resizeMode: 'contain',
  },
  footerTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 25,
    margin: 5,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SignUp;
