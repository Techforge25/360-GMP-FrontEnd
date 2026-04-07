'use client';
import axios from 'axios';

// Axios configuration
export const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials:true,
    timeout:0
});