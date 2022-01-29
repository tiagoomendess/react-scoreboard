import React, { useEffect, useState } from 'react'
import './index.css'

interface IProps {
    timerStart : number | null;
    timerPausedAt : number | null;
    hideOnZero : boolean;
}

export default function Timer(props: IProps) {

    const [text, setText] = useState<string>("")

    function updateText(props : IProps) : void {
        let now = new Date()
        let tmp = props.hideOnZero ? "" : "00:00"
        let diff = 0

        if (now.getTime() < (props.timerStart ?? now.getTime())) return

        if (props.timerStart && props.timerPausedAt) {
            diff = props.timerPausedAt - props.timerStart
            let sec = diff / 1000
            let minutes = Math.floor(sec / 60)
            let seconds = Math.floor(sec % 60)
            tmp = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" : ""}${seconds}`
        } else if (props.timerStart) {
            diff = now.getTime() - props.timerStart
            let sec = diff / 1000
            let minutes = Math.floor(sec / 60)
            let seconds = Math.floor(sec % 60)
            tmp = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" : ""}${seconds}`
        }

        setText(tmp)
    }

    useEffect(() => {
        let interval = setInterval(() => {
            updateText(props)
        }, 50)

        return () => {
            clearInterval(interval);
        };
    }, [props])

    return (<div className="timer">
        <span>{text}</span>
    </div>)
}
