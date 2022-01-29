import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'

const GetScoreBoardForm = () => {

    const [code, setCode] = useState(0)
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault()
        navigate("/scoreboards/" + code)
    }

    const handleInputChange = (e: any) => {
        let value = e.target.value
        if (value.length > 4)
            value = value.substring(0, 4)
        setCode(parseInt(value))
        e.target.value = value
    }

    return (<div className="codeForm">

        <form onSubmit={handleSubmit} className="">
            <div className="input-field inline">
                <input id="code_input" onChange={handleInputChange} type="number" />
                <label className="white-text" htmlFor="code_input">Código</label>
            </div>
            <button type="submit" className="waves-effect waves-light btn green darken-2">Ok</button>
        </form>

    </div>)
}

export default GetScoreBoardForm
