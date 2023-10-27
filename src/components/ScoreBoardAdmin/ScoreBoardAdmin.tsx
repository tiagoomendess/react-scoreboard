import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IScoreBoard } from '../../services/scoreboard';
import scoreboardService from '../../services/scoreboard';
import './index.css'
import StartPauseButton from '../StartPauseButton/StartPauseButton';
import Timer from '../Timer/Timer';
import { useNavigate } from 'react-router-dom';
import PreLoad from '../PreLoad/PreLoad';

const MINUTE_IN_MILLISECONDS = 60 * 1000;

export default function ScoreBoardAdmin() {
    const { code } = useParams()
    const [scoreboard, setScoreboard] = useState({} as IScoreBoard)
    const [isLoading, setIsLoading] = useState(true as boolean)

    const navigate = useNavigate();

    useEffect(() => getScoreBoard(), []) // eslint-disable-line react-hooks/exhaustive-deps

    const getScoreBoard = () => {
        scoreboardService.get(parseInt(code ?? "")).then(scoreboard => {
            setScoreboard(scoreboard)
            setIsLoading(false)
        }).catch(err => {
            if (err.response.status === 404) {
                document.cookie = `code=${code ?? ""};max-age=3600;path=/`
                console.log("Scoreboard not found, redirecting to create scoreboard")
                navigate(`/matches`)
                return
            }

            console.error(err)
            alert("Erro ao tentar obter placard, ver logs. ")
        })
    }

    const updateScoreBoard = (score: IScoreBoard) => {
        scoreboardService.update(score)
            .then(scoreboard => {
                document.cookie = `code=${code ?? ""};max-age=3600;path=/`
            })
            .catch(err => {
                navigate(`/matches`)
                console.error(`could not update scoreboard ${code}`, err)
            })
    }

    const handleScoreBtnClick = async (e: any) => {
        let name = e.target.dataset.name
        let tmpScoreboard = Object.assign({}, scoreboard);
        switch (name) {
            case "home-up":
                tmpScoreboard.homeScore++
                break;
            case "home-down":
                tmpScoreboard.homeScore > 0 ? tmpScoreboard.homeScore-- : tmpScoreboard.homeScore = 0
                break;
            case "away-up":
                tmpScoreboard.awayScore++
                break;
            case "away-down":
                tmpScoreboard.awayScore > 0 ? tmpScoreboard.awayScore-- : tmpScoreboard.awayScore = 0
                break;
        }

        updateScoreBoard(tmpScoreboard)
        setScoreboard(tmpScoreboard)
    }

    const handleStartPauseBtnClick = async (e: any) => {
        let tmpScoreboard = Object.assign({}, scoreboard);
        let now = new Date()

        if (scoreboard.timerPausedAt != null) {
            if (scoreboard.timerStart)
                tmpScoreboard.timerStart = now.getTime() - (scoreboard.timerPausedAt - scoreboard.timerStart)
            else
                tmpScoreboard.timerStart = now.getTime()

            tmpScoreboard.timerPausedAt = null
        } else {
            tmpScoreboard.timerPausedAt = now.getTime()
        }

        updateScoreBoard(tmpScoreboard)
        setScoreboard(tmpScoreboard)
    }

    const handleSetHalfTime = async (e: any) => {
        let now = new Date()
        let tmpScoreboard = Object.assign({}, scoreboard);
        tmpScoreboard.timerStart = now.getTime() - (MINUTE_IN_MILLISECONDS * 45)
        tmpScoreboard.timerPausedAt = now.getTime()
        updateScoreBoard(tmpScoreboard)
        setScoreboard(tmpScoreboard)
    }

    const handleBackTime = async (e: any) => {
        let tmpScoreboard = Object.assign({}, scoreboard);
        let now = new Date()
        if (tmpScoreboard.timerStart) {
            let result = tmpScoreboard.timerStart + MINUTE_IN_MILLISECONDS
            tmpScoreboard.timerStart = result < now.getTime() ? now.getTime() : result
            updateScoreBoard(tmpScoreboard)
            setScoreboard(tmpScoreboard)
        }
    }

    const handleForwardsTime = async (e: any) => {
        let now = new Date()
        let tmpScoreboard = Object.assign({}, scoreboard);
        tmpScoreboard.timerStart = (tmpScoreboard.timerStart ?? now.getTime() - 1000) - MINUTE_IN_MILLISECONDS
        updateScoreBoard(tmpScoreboard)
        setScoreboard(tmpScoreboard)
    }

    const handleResetTime = async (e: any) => {
        let tmpScoreboard = Object.assign({}, scoreboard);
        tmpScoreboard.timerStart = null
        tmpScoreboard.timerPausedAt = new Date().getTime()
        updateScoreBoard(tmpScoreboard)
        setScoreboard(tmpScoreboard)
    }

    const handleDelete = async (e: any) => {
        scoreboardService.remove(parseInt(code ?? ""))
            .then(() => {
                console.log(`scoreboard ${code} removed`)
                navigate(`/matches`)
            })
            .catch(err => {
                console.error("could not remove scoreboard", err)
            })
    }

    return (
        <div>
            <PreLoad isLoading={isLoading}/>
            <div className="scoreboard-admin" hidden={isLoading}>
                <h4>
                    <a href="#" onClick={handleDelete}>
                        <i className="material-icons">delete</i>
                    </a>
                    &nbsp;&nbsp;Placard {code}&nbsp;&nbsp;
                    <Link to={`/scoreboards/${scoreboard.code}`}>
                        <i className="material-icons">live_tv</i>
                    </Link>
                </h4>
                <div>
                    <div><img src={scoreboard.homeEmblem} alt="" /></div>
                    <div><img src={scoreboard.awayEmblem} alt="" /></div>
                </div>
                <div>
                    <div className="score-btns">
                        <button data-name="home-up" onClick={handleScoreBtnClick} className="waves-effect waves-light btn green">
                            <i data-name="home-up" className="material-icons">arrow_upward</i>
                        </button>
                        <button data-name="home-down" onClick={handleScoreBtnClick} className="waves-effect waves-light btn red">
                            <i data-name="home-down" className="material-icons">arrow_downward</i>
                        </button>
                    </div>
                    <span className="score">{scoreboard.homeScore}-{scoreboard.awayScore}</span>
                    <div className="score-btns">
                        <button data-name="away-up" onClick={handleScoreBtnClick} className="waves-effect waves-light btn green">
                            <i data-name="away-up" className="material-icons">arrow_upward</i>
                        </button>
                        <button data-name="away-down" onClick={handleScoreBtnClick} className="waves-effect waves-light btn red">
                            <i data-name="away-down" className="material-icons">arrow_downward</i>
                        </button>
                    </div>
                </div>

                <div>
                    <Timer
                        timerStart={scoreboard.timerStart}
                        timerPausedAt={scoreboard.timerPausedAt}
                        hideOnZero={false}
                    />
                </div>
                <div className="timer-buttons">
                    <button onClick={handleBackTime} className="waves-effect waves-light btn blue-grey darken-2"><i className="material-icons">fast_rewind</i></button>
                    <button onClick={handleResetTime} className="waves-effect waves-light btn red"><i className="material-icons">replay</i></button>
                    <StartPauseButton clickHandler={handleStartPauseBtnClick} isPaused={scoreboard.timerPausedAt != null} />
                    <button onClick={handleSetHalfTime} className="waves-effect waves-light btn orange darken-3"><i className="material-icons">alarm_on</i></button>
                    <button onClick={handleForwardsTime} className="waves-effect waves-light btn blue-grey darken-2"><i className="material-icons">fast_forward</i></button>
                </div>
            </div>
        </div>
    );
}
