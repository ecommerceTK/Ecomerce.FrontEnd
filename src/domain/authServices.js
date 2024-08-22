import http from '../infrastructures/httpApi';

export default {
    register(data) {
        return http.post('auth/register', data);
    },
    otp(data) {
        return http.post('auth/registration/active', data);
    },
    newOtp(data) {
        return http.get('auth/registration/active-mail', {
            params: { email: data },
        });
    },
    login(data) {
        return http.post('auth/login', data);
    },
    getUser() {
        return http.get('user/my-info');
    },
    logOut(token) {
        return http.post('auth/logout', token);
    },
    changePassword(data) {
        return http.put('auth/password/change-password', data);
    },
    missPassword(data) {
        return http.post('auth/password/forgot-mail', data);
    },
    resetPassword(data) {
        return http.post('auth/password/reset', data);
    },
    getAddress(id) {
        return http.get('address/get_child_address_list', {
            params: {
                parent_id: id,
            },
        });
    },
    becomeSeller(data) {
        return http.post('seller/register', data);
    },
    getInfoSeller() {
        return http.get('seller/profile');
    },
    updateInfoSeller(id, data) {
        return http.put(`seller/${id}`, data);
    },
};
