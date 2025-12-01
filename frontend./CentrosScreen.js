import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { MOCK_CENTROS } from '../services/mockData';

export default function CentrosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Farmacias Cercanas</Text>
      
      {/* MAPA SIMULADO */}
      <View style={styles.mapContainer}>
        {/* Imagen genérica de mapa de Santiago */}
        <Image 
            source={{uri: 'https://img.freepik.com/vector-gratis/mapa-callejero-ciudad-gps-pines-navegacion_1017-33621.jpg'}} 
            style={styles.mapImage}
        />
        {/* Pines simulados superpuestos */}
        <View style={[styles.pin, {top: 50, left: 100}]}><Text style={{fontSize:20}}>📍</Text></View>
        <View style={[styles.pin, {top: 120, left: 200}]}><Text style={{fontSize:20}}>📍</Text></View>
        <View style={styles.mapOverlay}>
            <Text style={styles.overlayText}>Usted está aquí</Text>
        </View>
      </View>

      <Text style={styles.subHeader}>Lista de Sucursales</Text>
      <FlatList
        data={MOCK_CENTROS}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.text}>📍 {item.direccion}</Text>
            <Text style={styles.text}>🏠 {item.comuna}</Text>
            <Text style={styles.phone}>📞 {item.telefono}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F2F1' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#00695C', padding: 20, textAlign: 'center', backgroundColor: '#fff' },
  
  // Mapa
  mapContainer: { height: 250, width: '100%', position: 'relative', borderBottomWidth: 5, borderBottomColor: '#00897B' },
  mapImage: { width: '100%', height: '100%', opacity: 0.8 },
  pin: { position: 'absolute', backgroundColor: 'transparent' },
  mapOverlay: { position: 'absolute', bottom: 10, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 5, borderRadius: 5 },
  overlayText: { color: 'white', fontWeight: 'bold' },

  subHeader: { fontSize: 20, fontWeight: 'bold', color: '#444', marginLeft: 20, marginTop: 15, marginBottom: 10 },
  card: { backgroundColor: 'white', padding: 20, marginHorizontal: 20, marginBottom: 15, borderRadius: 12, elevation: 3 },
  nombre: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  text: { fontSize: 16, color: '#555', marginBottom: 4 },
  phone: { fontSize: 18, color: '#00796B', fontWeight: 'bold', marginTop: 5 }
});