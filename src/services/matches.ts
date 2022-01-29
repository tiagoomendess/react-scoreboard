const axios = require('axios');
const baseUrl = 'http://localhost:3001/matches';

export interface IMatch {
    id : number;
    home_score : number;
    away_score : number;
    home_emblem : string;
    away_emblem : string;
    home_name : string;
    away_name : string;
}

async function getAll() : Promise<IMatch[]> {
    let result = await axios.get(baseUrl);

    if (result.data.success) {
        return result.data.matches;
    } else {
        throw new Error(result.data.message ?? "Erro a obter jogos disponíveis");
    }
}

const service = {
    getAll
}

export default service
