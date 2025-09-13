import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Nature</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MedicamentoScreen')}
      >
        <Text style={styles.buttonText}>Ver medicamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CarritoScreen')}
      >
        <Text style={styles.buttonText}>Ir al carrito</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HistorialPedidosScreen')}
      >
        <Text style={styles.buttonText}>Historial de pedidos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  button: {
    backgroundColor: '#008080',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%'
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 }
});
