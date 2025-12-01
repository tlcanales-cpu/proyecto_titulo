import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_RECORDATORIOS } from '../services/mockData';

export default function RecordatoriosScreen() {
  const [lista, setLista] = useState(MOCK_RECORDATORIOS);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Tomas</Text>
      
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.timeBox}>
                <Text style={styles.timeText}>{item.hora}</Text>
            </View>
            <View style={{flex: 1, paddingLeft: 15}}>
                <Text style={styles.medName}>{item.medicamento}</Text>
                <Text style={styles.dosis}>{item.dosis}</Text>
            </View>
          </View>
        )}
      />
      
      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => Alert.alert('Demo', 'En la versión completa podrás agregar más recordatorios.')}
      >
        <Text style={styles.btnText}>+ Agregar Recordatorio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF3E0' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#E65100', marginBottom: 20, textAlign: 'center' },
  card: { flexDirection: 'row', backgroundColor: 'white', marginBottom: 15, borderRadius: 15, padding: 15, alignItems: 'center', elevation: 2 },
  timeBox: { backgroundColor: '#FF9800', padding: 10, borderRadius: 10, minWidth: 80, alignItems: 'center' },
  timeText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  medName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  dosis: { fontSize: 16, color: '#777' },
  btn: { backgroundColor: '#EF6C00', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});