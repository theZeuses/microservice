import axios, { AxiosRequestConfig } from 'axios';
import { handleResponse, handleError } from './response';
import config from '../../../config/app_config';
import { bearerToken } from '../../../helpers/authHelper';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = config.API_BASE_URL;

const getBatch = (resource: string, requestConfig?: AxiosRequestConfig) => {
  requestConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken()}`,
      'Content-Type': 'application/json',
      ...requestConfig?.headers
    },
    ...requestConfig
  };
  return axios
    .get(`${BASE_URL}/${resource}`, requestConfig)
    .then(handleResponse)
    .catch(handleError);
};

const getCount = (resource: string, requestConfig?: AxiosRequestConfig) => {
  requestConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken()}`,
      'Content-Type': 'application/json',
      ...requestConfig?.headers
    },
    ...requestConfig
  };
  return axios
    .get(`${BASE_URL}/${resource}/count`, requestConfig)
    .then(handleResponse)
    .catch(handleError);
};

const getById = (resource: string, id: string, requestConfig?: AxiosRequestConfig) => {
  requestConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken()}`,
      'Content-Type': 'application/json',
      ...requestConfig?.headers
    },
    ...requestConfig
  };
  return axios
    .get(`${BASE_URL}/${resource}/${id}`, requestConfig)
    .then(handleResponse)
    .catch(handleError);
};

const get = (resource: string, requestConfig?: AxiosRequestConfig) => {
  requestConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken()}`,
      'Content-Type': 'application/json',
      ...requestConfig?.headers
    },
    ...requestConfig
  };
  return axios
    .get(`${BASE_URL}/${resource}`, requestConfig)
    .then(handleResponse)
    .catch(handleError);
};

const post = (resource: string, data: any, requestConfig?: AxiosRequestConfig) => {
  requestConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken()}`,
      'Content-Type': 'application/json',
      ...requestConfig?.headers
    },
  };
  return axios
    .post(`${BASE_URL}/${resource}`, data, requestConfig)
    .then(handleResponse)
    .catch(handleError);
};

const put = (resource: string, id: string, data: any, requestConfig?: AxiosRequestConfig) => {
  requestConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken()}`,
      'Content-Type': 'application/json',
      ...requestConfig?.headers
    },
  };
  return axios
    .put(`${BASE_URL}/${resource}/${id}`, data, requestConfig)
    .then(handleResponse)
    .catch(handleError);
};

const patch = (resource: string, id: string, data: any, requestConfig?: AxiosRequestConfig) => {
  requestConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken()}`,
      'Content-Type': 'application/json',
      ...requestConfig?.headers
    },
    ...requestConfig
  };
  return axios
    .patch(`${BASE_URL}/${resource}/${id}`, data, requestConfig)
    .then(handleResponse)
    .catch(handleError);
};

const remove = (resource: string, id: string, requestConfig?: AxiosRequestConfig) => {
  requestConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken()}`,
      'Content-Type': 'application/json',
      ...requestConfig?.headers
    },
    ...requestConfig
  };
  return axios
    .delete(`${BASE_URL}/${resource}/${id}`, requestConfig)
    .then(handleResponse)
    .catch(handleError);
};

const apiProvider = {
  getBatch,
  getById,
  getCount,
  post,
  put,
  patch,
  remove,
  get
};

export default apiProvider;