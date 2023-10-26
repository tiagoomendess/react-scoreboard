
const baseUrl =  process.env.NODE_ENV === 'production' ? 'https://placard.domingoasdez.com' : 'http://localhost:3000';
const baseApiUrl = process.env.NODE_ENV === 'production' ? 'https://placard-api.domingoasdez.com' : 'http://localhost:3001';

export {
    baseUrl,
    baseApiUrl
}