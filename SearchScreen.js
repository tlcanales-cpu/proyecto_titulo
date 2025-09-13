import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getMedicamentos } from '../services/medicamentos';

export default function SearchScreen() {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMedicamentos();
      setMedicamentos(data);
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text>{item.descripcion}</Text>
      <Text>Precio: ${item.precio}</Text>
      <Text>Farmacia: {item.farmacia}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={medicamentos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1
  },
  card: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f1f1f1'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  }
});
