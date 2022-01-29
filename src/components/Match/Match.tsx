
import './index.css'
import scoreboardService from '../../services/scoreboard'
import { useNavigate } from 'react-router'

interface MatchPropsInterface {
    key: number;
    matchId: number;
    homeEmblem: string;
    awayEmblem: string;
}

export default function Match({ matchId, homeEmblem, awayEmblem }: MatchPropsInterface) {

    const navigate = useNavigate();

    const handleClick = async () => {
        //alert(`Match ${this.state.matchId}`)
        try {
            let data = await scoreboardService.create(matchId)
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

