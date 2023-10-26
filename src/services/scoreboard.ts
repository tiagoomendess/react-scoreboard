import axios from 'axios'

const baseUrl =  process.env.NODE_ENV === 'production' ? 'https://placard-api.domingoasdez.com/scoreboards' : 'http://localhost:3001/scoreboards';

export interface IScoreBoard {
    code: number,
    homeEmblem: string,
    awayEmblem: string,
    matchId: number,
    homeScore: number,
    awayScore: number,
    isPaused: boolean,
    isFinished: boolean,
    timerStart: number | null,
    timerPausedAt: number | null,
}

export interface IReserve {
    success: boolean,
    code: number,
}

export interface IRemove {
    success: boolean,
}

async function get(code : number) : Promise<IScoreBoard> {
    let { data } = await axios.get(`${baseUrl}/${code}`);
    return data;
}

async function create(matchId: number, code: number | null) : Promise<IScoreBoard> {
    let { data } = await axios.post(`${baseUrl}`, { matchId: matchId, code: code });
    if (data && data.success)
        return data.created;
    else
        throw new Error(data.message ?? "Erro a criar scoreboard");
}

async function update(scoreboard : IScoreBoard) : Promise<IScoreBoard> {
    let { data } = await axios.put(`${baseUrl}/${scoreboard.code}`, scoreboard);
    if (data && data.success)
        return data.updated;
    else
        throw new Error(data.message ?? "Erro a actualizar scoreboard");
}

async function reserve() : Promise<IReserve> {
    let { data } = await axios.get(`${baseUrl}/reserve`);
    return data;
}

async function remove(code : number) : Promise<IRemove> {
    let { data } = await axios.delete(`${baseUrl}/${code}`);
    return data;
}

const service = {
    get,
    create,
    update,
    reserve,
    remove
}

export default service