import React from 'react';
import Match from '../Match/Match';
import matchService, { IMatch } from '../../services/matches'
import PreLoad from '../PreLoad/PreLoad';
import './index.css'

interface IProps {
}

interface IState {
    matches: IMatch[];
    code: number | null;
    isLoading: boolean;
}

class Matches extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            matches: [],
            code: null,
            isLoading: false,
        }
    }

    async componentDidMount() {
        let code = null;
        // try and get code from cookie
        if (document.cookie.indexOf('code=') !== -1) {
            code = document.cookie.split('code=')[1].split(';')[0]
            code = parseInt(code)
            console.log(`Found code ${code} in cookie`)
        }

        this.setState({
            isLoading: true,
        })

        const matches = await matchService.getAll().catch((err) => {
            this.setState({
                isLoading: false,
            })
            console.log(err)
            return []
        })

        this.setState({
            matches: matches,
            code: code,
            isLoading: false,
        })
    }

    render() {
        return (<div className="matches">
            <PreLoad isLoading={this.state.isLoading}/>
            <h4 hidden={this.state.isLoading} className="center">Escolha um dos jogos abaixo</h4>
            <p hidden={this.state.matches.length >= 1 || this.state.isLoading} className='flow-text center'>Não existem jogos disponíveis</p>
            {this.state.matches.map((match, index) => <Match key={index} matchId={match.id} homeEmblem={match.home_emblem} awayEmblem={match.away_emblem} code={this.state.code} />)}
            <small className="center" hidden={this.state.isLoading || this.state.matches.length > 1}> Apenas aparecem os jogos de hoje</small>
        </div>)
    }
}

export default Matches
