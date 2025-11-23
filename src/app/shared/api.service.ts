import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { environment } from '../../environments/environment';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: environment.apiUrl || 'http://localhost:5000/api/v1',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.axiosInstance.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 400) {
            if (data.errors) {
              const firstField = Object.keys(data.errors)[0];
              const firstError = data.errors[firstField][0];
              return Promise.reject({ message: firstError, status });
            }

            if (data.message) {
              return Promise.reject({ message: data.message, status });
            }
          }

          if (status === 401) {
            return Promise.reject({ message: 'Credenciales inválidas', status });
          }

          return Promise.reject({ message: data?.title || 'Error inesperado', status });
        }
        return Promise.reject({ message: error.message, status: 0 });
      }
    );
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<T>(url, config).then(res => res.data);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post<T>(url, data, config).then(res => res.data);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.put<T>(url, data, config).then(res => res.data);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.delete<T>(url, config).then(res => res.data);
  }
}

export const api = new ApiService();
