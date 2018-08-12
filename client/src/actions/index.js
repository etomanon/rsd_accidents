import axios from 'axios';

export const USER_GET = 'USER_GET';
export const AUTH_GET ='AUTH_GET';

export function userGet() {
    const request = axios.get('/api/profile');
    return {
        type: USER_GET,
        payload: request
    };
}

export function authGet() {
    const request = axios.get('/api/auth/check');
    return {
        type: AUTH_GET,
        payload: request
    };
}