import React from 'react'
import './index.css'

interface IProps {
    isPaused: boolean;
    clickHandler: any;
}

export default function StartPauseButton(props : IProps) {

    return (<div className="startPauseButton">
        <button onClick={props.clickHandler} className="blue waves-effect waves-light btn"><i className="material-icons left">{props.isPaused ? 'play_arrow' : 'pause'}</i></button>
    </div>)
}
