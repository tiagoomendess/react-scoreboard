import React from 'react';
import GetScoreBoardForm from '../ScoreBoardForm/ScoreBoardForm';
import './index.css'

class Home extends React.Component {
    render() {
        return (<div className="home">
            <p className="flow-text center">Introduza o código do seu placard</p>
            <GetScoreBoardForm />
            <p className="center">Alternativamente pode criar um <a href="/matches">novo</a></p>
        </div>)
    }
}

export default Home