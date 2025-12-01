import { FlatList, StyleSheet, Text, View } from 'react-native';

// Datos falsos para historial
const MOCK_HISTORIAL = [
  { id: '101', fecha: '20/11/2025', total: 4500, estado: 'Entregado', items: 2 },
  { id: '102', fecha: '15/11/2025', total: 12800, estado: 'Entregado', items: 4 },
  { id: '103', fecha: '01/11/2025', total: 3500, estado: 'Cancelado', items: 1 },
];

const HistorialPedidosScreen = () => {
  // Renderizado de cada pedido
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={styles.idText}>Pedido #{item.id}</Text>
        <View style={[
            styles.badge, 
            item.estado === 'Entregado' ? styles.badgeSuccess : styles.badgeError
        ]}>
            <Text style={styles.badgeText}>{item.estado}</Text>
        </View>
      </View>
      
      <Text style={styles.date}>Fecha: {item.fecha}</Text>
      <Text style={styles.info}>{item.items} medicamentos</Text>
      
      <View style={styles.footerCard}>
        <Text style={styles.totalLabel}>Total Pagado:</Text>
        <Text style={styles.total}>${item.total}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_HISTORIAL}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: 20}}
      />
    </View>
  );
};

export default HistorialPedidosScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F6' },
  card: { backgroundColor: 'white', padding: 20, marginBottom: 15, borderRadius: 15, elevation: 3 },
  headerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  idText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  
  badge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  badgeSuccess: { backgroundColor: '#D4EFDF' },
  badgeError: { backgroundColor: '#FADBD8' },
  badgeText: { fontWeight: 'bold', fontSize: 12, color: '#333' },
  
  date: { fontSize: 16, color: '#555', marginBottom: 5 },
  info: { fontSize: 16, color: '#777', fontStyle: 'italic', marginBottom: 15 },
  
  footerCard: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  total: { fontSize: 18, fontWeight: 'bold', color: '#117864' }
});