import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const viaAxios = axios.create({
  baseURL: 'https://instrumental-learning-academy-server.vercel.app', 
});

const useAxios = () => {
  const { logOut } = useAuth(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    viaAxios.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    viaAxios.interceptors.response.use((response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return [viaAxios];
};

export default useAxios;
