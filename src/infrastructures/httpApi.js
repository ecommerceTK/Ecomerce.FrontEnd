import axios from 'axios';
import { useAuthToken } from '../storage/useAuthToken';
import { useAuthUser } from '../storage/useAuthUser';

const { token, refreshToken, setToken, clearToken } = useAuthToken();
const { clearUser } = useAuthUser();

const httpApi = axios.create({
    baseURL: 'https://922c-210-245-51-162.ngrok-free.app/api/v1/',
    headers: {
        'ngrok-skip-browser-warning': '1',
        Accept: 'application/json',
    },
});

let isRefreshing = false;
let failedQueue = [];
let refreshPromise = null;

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

// Interceptor để thêm token vào header cho mọi request
httpApi.interceptors.request.use(config => {
    if (token.value && !config.url.includes('auth/refreshToken')) {
        config.headers['Authorization'] = `Bearer ${token.value}`;
    }
    return config;
});

// Interceptor để xử lý lỗi 401 và yêu cầu refresh token
httpApi.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Chờ đợi cho đến khi refreshPromise hoàn thành
                return refreshPromise
                    .then(token => {
                        originalRequest.headers['Authorization'] =
                            `Bearer ${token}`;
                        return httpApi(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            refreshPromise = new Promise((resolve, reject) => {
                httpApi
                    .get('auth/refreshToken', {
                        params: {
                            refreshToken: refreshToken.value,
                        },
                    })
                    .then(response => {
                        const newToken = response.data.result.token;
                        const newRefreshToken =
                            response.data.result.refreshToken;

                        setToken(newToken, newRefreshToken);

                        // Cập nhật token mới cho các yêu cầu đang chờ đợi
                        processQueue(null, newToken);
                        resolve(newToken);

                        // Cập nhật token cho yêu cầu gốc và thực hiện lại yêu cầu đó
                        originalRequest.headers['Authorization'] =
                            `Bearer ${newToken}`;
                        return httpApi(originalRequest);
                    })
                    .catch(error => {
                        clearToken();
                        clearUser();
                        processQueue(error, null);
                        reject(error);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });

            return refreshPromise;
        }

        return Promise.reject(error);
    }
);

export default httpApi;
