import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet
} from 'react-native';
import { getPedidosPorUsuario } from '../services/pedidos';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistorialPedidosScreen = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const usuarioId = await AsyncStorage.getItem('usuarioId');
      if (!usuarioId) return;

      const data = await getPedidosPorUsuario(usuarioId);
      setPedidos(data);
    };

    fetchPedidos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.fecha}>🕒 {new Date(item.fecha).toLocaleString()}</Text>
      {item.medicamentos.map((med, index) => (
        <Text key={index}>• {med.nombre} - ${med.precio}</Text>
      ))}
      <Text style={styles.total}>Total: ${item.total}</Text>
      <Text style={styles.estado}>Estado: {item.estado}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial de Pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HistorialPedidosScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  fecha: { fontWeight: 'bold', marginBottom: 5 },
  total: { marginTop: 10, fontWeight: 'bold' },
  estado: { color: '#888', fontStyle: 'italic' }
});
