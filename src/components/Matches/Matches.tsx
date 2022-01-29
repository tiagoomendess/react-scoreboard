import React from 'react';
import Match from '../Match/Match';
import matchService, { IMatch } from '../../services/matches'
import './index.css'

interface IProps {
}

interface IState {
    matches: IMatch[];
}

class Matches extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            matches: []
        }
    }

    async componentDidMount() {
        this.setState({ matches: await matchService.getAll() })
    }

    render() {
        return (<div className="matches">
            <p className="flow-text center">Escolha um dos jogos abaixo</p>
            {this.state.matches.map((match, index) => <Match key={index} matchId={match.id} homeEmblem={match.home_emblem} awayEmblem={match.away_emblem} />)}
        </div>)
    }

}

export default Matches