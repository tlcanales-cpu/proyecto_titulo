import axios from 'axios';

// 🔴 CAMBIA LA IP
const API_URL = 'http://192.168.1.1:8082/api/medicamentos'; 

export const getMedicamentos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    return [];
  }
};