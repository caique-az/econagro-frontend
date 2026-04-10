import axios from 'axios';

// Normaliza a baseURL para garantir o sufixo /api
const resolveBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL;
  if (!envUrl) return 'http://localhost:3001/api';
  const trimmed = envUrl.replace(/\/$/, '');
  if (/\/api$/i.test(trimmed)) return trimmed;
  return `${trimmed}/api`;
};

const api = axios.create({
  baseURL: resolveBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona um interceptor para logar as requisições
api.interceptors.request.use(
  (config) => {
    console.log(`Enviando requisição: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Adiciona um interceptor para logar as respostas
api.interceptors.response.use(
  (response) => {
    console.log(`Resposta recebida: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Erro na resposta:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;