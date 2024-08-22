// useAuthToken.js
import { useStorage } from '@vueuse/core';

export function useAuthToken() {
    // Lưu trữ token vào localStorage với key là 'auth-token'
    const token = useStorage('token', null);
    const refreshToken = useStorage('refreshToken', null);

    // Hàm để cập nhật token
    const setToken = (newToken, newRefreshToken) => {
        token.value = newToken;
        refreshToken.value = newRefreshToken;
    };

    // Hàm để xóa token
    const clearToken = () => {
        token.value = null;
        refreshToken.value = null;
    };

    return {
        token,
        refreshToken,
        setToken,
        clearToken,
    };
}
