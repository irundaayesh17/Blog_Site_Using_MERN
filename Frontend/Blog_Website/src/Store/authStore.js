import {create} from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true, 

    // Register User
    signup: async (firstname, lastname, email, password) => {
        set({isLoading: true});
        try {
            const res = await axios.post(`${API_URL}/signup`, {firstname, lastname, email, password});
            set({user: res.data.user,isAuthenticated: true ,isLoading: false, error: null});
        } catch (err) {
            set({error: err.response.data.error, isLoading: false});
            throw err;
        }
    },

    verifyEmail: async (code) => {
        set({isLoading: true, error: null});
        try {
            const res = await axios.post(`${API_URL}/verify-email`, {code});
            set({user: res.data.user, isAuthenticated: true, isLoading: false});
            return res.data;
        } catch (err) {
            set({error: err.response.data.error, isLoading: false});
            throw err;
        }
    },

    checkAuth: async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        set({isCheckingAuth: true, error: null});
        try {
            const res = await axios.get(`${API_URL}/check-auth`);
            set({user: res.data.user, isAuthenticated: true, isCheckingAuth: false});
        } catch (err) {
            set({isCheckingAuth: false});
            throw err;
        }
    },

    signin: async (email, password) => {
        set({isLoading: true, error: null});
        try {
            const res = await axios.post(`${API_URL}/signin`, {email, password});
            console.log(res.data);
            set({user: res.data.user, isAuthenticated: true, isLoading: false, error: null});
        } catch (err) {
            set({error: err.response.data.error, isLoading: false});
            throw err;
        }
    },

    logout: async () => {
        set({isLoading: true, error: null});
        try {
            await axios.post(`${API_URL}/logout`);
            set({user: null, isAuthenticated: false, isLoading: false, error: null});
        } catch (err) {
            set({error:"Error Logging Out", isLoading: false});
            throw err;
        }
    },
}));

