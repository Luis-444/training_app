import axios, {AxiosInstance} from "axios";
import { useTokenStore } from "./store/useTokenStore";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  }
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = useTokenStore().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el error es de autenticación, eliminar el token
      const tokenStore = useTokenStore();
      tokenStore.setToken('');
      localStorage.removeItem('token');
      
      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = '/login'; // Cambia esto a la URL de tu página de inicio de sesión
    }
    return Promise.reject(error);
  }
);

export default axiosClient;