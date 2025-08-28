import axios from 'axios';

const API_URL =  'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('role');
export const getId = () => localStorage.getItem('id'); // Added getId export
export const setAuth = (token, role, id) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
  localStorage.setItem('id', id);
};
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('id');
};