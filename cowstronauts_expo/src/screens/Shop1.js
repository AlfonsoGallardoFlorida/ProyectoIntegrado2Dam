import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ButtonTemplate = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}></View>
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity> */}
{/*       <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 25,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default ButtonTemplate;
