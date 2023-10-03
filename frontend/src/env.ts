const isDevelopment = process.env.NODE_ENV === 'development';

export const env = {
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment,
    urls: {
        backend: process.env.REACT_APP_BACKEND_ORIGIN || 'http://localhost:3000',
        bitrix_backend: process.env.REACT_APP_BITRIX_BACKEND_ORIGIN || 'http://localhost:3001'
    }
};
