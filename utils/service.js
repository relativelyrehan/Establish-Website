/* eslint-disable no-undef */
import axios from 'axios';
import { ACCESS_TOKEN_KEY } from './constants';
const checkStatus = (status) => status >= 200 && status < 300;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const client = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'platform': 'web',
        'x-frame-options': 'SAMEORIGIN'
    },
    validateStatus: checkStatus,
    timeout: 20000,
});

// Add tokens for every request if provided
client.interceptors.request.use((config) => {
    let accessToken = `bearer ${window.localStorage.getItem(ACCESS_TOKEN_KEY)}`;
    if (typeof window && window?.webengage) {
        let os = window?.webengage?.BrowserDetect?.os();
        let device_type = window?.webengage?.BrowserDetect?.device();
        let screen_size = `${window?.screen?.availWidth} x ${window?.screen?.availHeight}`
        let browser = window?.webengage?.BrowserDetect?.browser();

        config.headers['os'] = os || '';
        config.headers['device-type'] = device_type || '';
        config.headers['screen-size'] = screen_size || '';
        config.headers['browser'] = browser || '';
    }
    if (accessToken) {
        config.headers['Authorization'] = accessToken;
    }
    return Promise.resolve(config);
});

export const getData = async (endpoint) => {
    try {
        const response = await client.get(endpoint);
        if (response.status === 403) {
            await postData('/logout', {});
            window.localStorage.clear();
            window.location.href === '/';
        }
        return response;
    } catch (error) {
        if (error?.response?.status == 401) {
            window.localStorage.clear();
            window.location.href === '/';
        }
        return error.response;
    }
};

export const postData = async (endpoint, payload) => {
    try {
        const response = await client.post(endpoint, payload);
        if (response.status === 403) {
            await postData('/logout', {});
            window.localStorage.clear();
            window.location.href === '/';
        }
        return response;
    } catch (error) {
        if (error?.response?.status == 401) {
            window.localStorage.clear();
            window.location.href === '/';
        }
        return error.response;
    }
};

export const patchData = async (endpoint, payload) => {
    try {
        const response = await client.patch(endpoint, payload);
        if (response.status === 403) {
            await postData('/logout', {});
            window.localStorage.clear();
            window.location.href === '/';
        }
        return response;
    } catch (error) {
        if (error?.response?.status == 401) {
            window.localStorage.clear();
            window.location.href === '/';
        }
        return error.response;
    }
};

export const putData = async (endpoint, payload) => {
    try {
        const response = await client.put(endpoint, payload);
        if (response.status === 403) {
            await postData('/logout', {});
            window.localStorage.clear();
            window.location.href === '/';
        }
        return response;
    } catch (error) {
        if (error?.response?.status == 401) {
            window.localStorage.clear();
            window.location.href === '/';
        }
        return error.response;
    }
};

export const deleteData = async (endpoint, payload) => {
    try {
        const response = await client.delete(endpoint, {
            data: payload,
        });
        if (response.status === 403) {
            await postData('/logout', {});
            window.localStorage.clear();
            window.location.href === '/';
        }
        return response;
    } catch (error) {
        if (error?.response?.status == 401) {
            window.localStorage.clear();
            window.location.href === '/';
        }
        return error.response;
    }
};
