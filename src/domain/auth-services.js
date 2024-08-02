import http from '../infrastructures/http_api-auth';

export default {
    register(data) {
        return http.post('auth/register', data)
    },
    otp(data) {
        return http.post('auth/registration/active', data)
    },
    newOtp(data) {
        return http.get('auth/registration/active-mail',{
            params: {email: data}
        })
    },
    login(data) {
        return http.post('auth/login', data)
    },
    getUser(token) {
        return http.get('user/my-info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    logOut(token) {
        return http.post('auth/logout', token);
    },
    changePassword(token,data) {
        return http.put('auth/password/change-password', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    missPassword(data) {
        return http.post('auth/password/forgot-mail', data);
    },
    resetPassword(data) {
        return http.post('auth/password/reset', data);
    }
}