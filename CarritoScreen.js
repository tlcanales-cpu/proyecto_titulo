import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCarrito } from '../contexts/CarritoContext';

const CarritoScreen = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  const confirmarCompra = async () => {
    const usuarioId = await AsyncStorage.getItem('usuarioId');
    const pushToken = 'ExponentPushToken[tu_token_aqui]'; // 🔁 Reemplázalo manualmente por ahora

    if (!usuarioId) {
      Alert.alert('Error', 'No se encontró el usuario');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId,
          medicamentos: carrito,
          total
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Enviar notificación push
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: pushToken,
            title: '✅ Pedido confirmado',
            body: 'Tu pedido ha sido recibido. Gracias por tu compra.',
          }),
        });

        Alert.alert('Compra realizada', '¡Pedido guardado con éxito!');
        vaciarCarrito();
      } else {
        Alert.alert('Error', data.message || 'No se pudo guardar el pedido');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error de conexión al guardar el pedido');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text>${item.precio}</Text>
      <TouchableOpacity onPress={() => eliminarDelCarrito(item._id)}>
        <Text style={styles.eliminar}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Carrito de Compras</Text>

      {carrito.length === 0 ? (
        <Text style={styles.vacio}>El carrito está vacío</Text>
      ) : (
        <>
          <FlatList
            data={carrito}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          <Text style={styles.total}>Total: ${total}</Text>
          <TouchableOpacity style={styles.button} onPress={confirmarCompra}>
            <Text style={styles.buttonText}>Confirmar Compra</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CarritoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  item: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  nombre: { fontWeight: 'bold', fontSize: 16 },
  eliminar: { color: 'red', marginTop: 5, textDecorationLine: 'underline' },
  vacio: { fontSize: 16, textAlign: 'center', marginTop: 40 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
    marginTop: 15
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 }
});
