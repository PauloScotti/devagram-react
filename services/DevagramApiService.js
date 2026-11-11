import axios from 'axios';
import { LoadingHelper } from '../helpers/LoadingHelper';
import { encerrarSessao } from '../utils/sessao';

export default class DevagramApiService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
        });

        this.quantidadeRequisicoes = 0;
        this.axios.interceptors.request.use((config) => {
            this.quantidadeRequisicoes++;
            if (this.quantidadeRequisicoes === 1) {
                LoadingHelper.exibir();
            }

            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token
            }

            return config;
        });

        const aoTerminar = () => {
            this.quantidadeRequisicoes--;
            if (this.quantidadeRequisicoes === 0) {
                LoadingHelper.ocultar();
            }
        };

        this.axios.interceptors.response.use(
            (response) => {
                aoTerminar();
                return response;
            },
            (erro) => {
                // Sem isto, uma requisição com erro deixava o "carregando" preso na tela.
                aoTerminar();

                // Token expirado ou inválido: encerra a sessão e volta para o login.
                if (erro?.response?.status === 401 && localStorage.getItem('token')) {
                    encerrarSessao();
                    window.location.href = '/';
                }
                return Promise.reject(erro);
            }
        );
    }

    post(url, data) {
        return this.axios.post(url, data);
    }

    get(url) {
        return this.axios.get(url);
    }

    put(url, data) {
        return this.axios.put(url, data);
    }
}