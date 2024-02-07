import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TIENDA</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Moneda</Text>
        <View style={styles.product}>
          <Text>JOSH HUTCHERSON</Text>
          <Text>Aparecerán els doblets durant 3 minuts</Text>
          {/* Agregar icono de corona */}
        </View>
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
    textAlign:"center",
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
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default App;
