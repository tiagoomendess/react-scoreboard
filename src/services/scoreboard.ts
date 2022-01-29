import axios from 'axios'

const baseUrl = 'http://localhost:3001/scoreboards';

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

async function get(code : number) : Promise<IScoreBoard> {
    let { data } = await axios.get(`${baseUrl}/${code}`);
    return data;
}

async function create(matchId: number) : Promise<IScoreBoard> {
    let { data } = await axios.post(`${baseUrl}`, { matchId: matchId });
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

const service = {
    get,
    create,
    update
}

export default service