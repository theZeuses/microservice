import apiProvider from './provider';
import { AxiosRequestConfig } from 'axios';

type TOption = {
  getBatch?: boolean,
  getCount?: boolean,
  getById?: boolean,
  post?: boolean,
  put?: boolean,
  patch?: boolean,
  remove?: boolean,
  url: string,
  plural?: string,
  single?: string
}

export interface ApiCore {
  getBatch(requestConfig?: AxiosRequestConfig): Promise<any>;
  getCount(requestConfig?: AxiosRequestConfig): Promise<any>;
  getById(id: string, requestConfig?: AxiosRequestConfig): Promise<any>;
  post(body: any, requestConfig?: AxiosRequestConfig): Promise<any>;
  put(id: string, body: any, requestConfig?: AxiosRequestConfig): Promise<any>;
  patch(id: string, body: any, requestConfig?: AxiosRequestConfig): Promise<any>;
  remove(id: string, requestConfig?: AxiosRequestConfig): Promise<any>;
}

export class ApiCore {
  constructor(options: TOption) {
    if (options.getBatch) {
      this.getBatch = (requestConfig?: AxiosRequestConfig) => {
        return apiProvider.getBatch(options.url, requestConfig);
      };
    }

    if (options.getCount) {
      this.getCount = (requestConfig?: AxiosRequestConfig) => {
        return apiProvider.getCount(options.url, requestConfig);
      };
    }

    if (options.getById) {
      this.getById = (id: string, requestConfig?: AxiosRequestConfig) => {
        return apiProvider.getById(options.url, id, requestConfig);
      };
    }

    if (options.post) {
      this.post = (body: any, requestConfig?: AxiosRequestConfig) => {
        return apiProvider.post(options.url, body, requestConfig);
      };
    }

    if (options.put) {
      this.put = (id: string, body: any, requestConfig?: AxiosRequestConfig) => {
        return apiProvider.put(options.url, id, body, requestConfig);
      };
    }

    if (options.patch) {
      this.patch = (id: string, body: any, requestConfig?: AxiosRequestConfig) => {
        return apiProvider.patch(options.url, id, body, requestConfig);
      };
    }

    if (options.remove) {
      this.remove = (id: string, requestConfig?: AxiosRequestConfig) => {
        return apiProvider.remove(options.url, id, requestConfig);
      };
    }
  }
}