import axios from 'axios';

const API_URL = 'http://localhost:8081/api/pedidos';

export const getPedidosPorUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    return [];
  }
};
