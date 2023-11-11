import React, { useEffect, useState } from 'react'
import './index.css'
import scoreboardService, { IScoreBoard } from '../../services/scoreboard'
import { useParams } from 'react-router'
import Timer from '../Timer/Timer'
import { useNavigate } from 'react-router-dom'
import PreLoad from '../PreLoad/PreLoad'

function ScoreBoard() {

    const { code } = useParams()
    const [scoreboard, setScoreboard] = useState({} as IScoreBoard)
    const [isLoading, setIsLoading] = useState(true as boolean)
    const navigate = useNavigate()


    function updateScoreBoard(): void {
        scoreboardService.get(parseInt(code ? code : "")).then(scoreboard => {
            setScoreboard(scoreboard)
            setIsLoading(false)
            document.cookie = `code=${code ?? ""};max-age=600;path=/`
        }).catch(err => {
            // if it is 404 return to index
            if (err.response.status === 404) {
                console.log("Scoreboard not found, redirecting to home to display qr code")
                navigate(`/`)
                return
            }

            console.error(err)
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

    function goToAdminPage(): void {
        navigate(`/scoreboards/${code}/admin`)
    }

    return (<div>
        <PreLoad isLoading={isLoading} />
        <div hidden={isLoading} className="scoreboard">
            <div className="emblemCol">
                <img onClick={goToAdminPage} src={scoreboard.homeEmblem} alt="" />
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
                <img onClick={goToAdminPage} src={scoreboard.awayEmblem} alt="" />
            </div>
        </div>
    </div>)
}

export default ScoreBoard
