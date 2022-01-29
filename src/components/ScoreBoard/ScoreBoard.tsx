import React, { useEffect, useState } from 'react'
import './index.css'
import scoreboardService, { IScoreBoard } from '../../services/scoreboard'
import { useParams } from 'react-router'
import Timer from '../Timer/Timer'

function ScoreBoard() {

    const { code } = useParams()
    const [scoreboard, setScoreboard] = useState({} as IScoreBoard)

    function updateScoreBoard(): void {
        scoreboardService.get(parseInt(code ? code : "")).then(scoreboard => {
            setScoreboard(scoreboard)
        })
    }

    useEffect(() => updateScoreBoard(), [])

    useEffect(() => {
        const requestInterval = setInterval(() => {
            updateScoreBoard()
        }, 2000);

        return () => {
            clearInterval(requestInterval);
        };
    }, [])

    return (<div className="scoreboard">
        <div className="emblemCol">
            <img src={scoreboard.homeEmblem} alt="" />
        </div>
        <div className="middleCol">
            <Timer
                timerStart={scoreboard.timerStart}
                timerPausedAt={scoreboard.timerPausedAt}
                hideOnZero={true}
            />
            <div>
                <span className="scoreboard-score">{scoreboard.homeScore}-{scoreboard.awayScore}</span>
            </div>
        </div>
        <div className="emblemCol">
            <img src={scoreboard.awayEmblem} alt="" />
        </div>
    </div>)
}

export default ScoreBoard
