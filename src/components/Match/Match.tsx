
import './index.css'
import scoreboardService from '../../services/scoreboard'
import { useNavigate } from 'react-router'

interface MatchPropsInterface {
    key: number;
    matchId: number;
    code: number | null;
    homeEmblem: string;
    awayEmblem: string;
}

export default function Match({ matchId, homeEmblem, awayEmblem, code }: MatchPropsInterface) {

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            let data = await scoreboardService.create(matchId, code)
            navigate(`/scoreboards/${data.code}/admin`)
        } catch (err) {
            alert(err)
        }
    }

    return (<div className="match">
        <div onClick={handleClick}>
            <img src={homeEmblem} alt="" />
            <span>vs</span>
            <img src={awayEmblem} alt="" />
        </div>
    </div>)
}

