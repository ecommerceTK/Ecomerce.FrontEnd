// useAuthUser.js
import { useStorage } from '@vueuse/core';

export function useAuthUser() {
    const userStore = useStorage('user', null);

    const setUser = newUser => {
        userStore.value = newUser;
    };

    const clearUser = () => {
        userStore.value = null;
    };

    return {
        userStore,
        setUser,
        clearUser,
    };
}
