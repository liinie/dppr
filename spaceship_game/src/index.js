import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component{
    render(){
        return <div className="square">{this.props.value}</div>;
    }
}


class Board extends React.Component{

    render(){
        const g = Array(6).fill().map(x => Array(6).fill());
        const board = g.map((row, i) => { return (
            <tr key={"row_"+i}>
                {row.map((col, j) => {
                    console.log([i, j]);
                    if (i === this.props.current_state_row && j === this.props.current_state_col) {
                        return <Square value={'X'}/>;
                    } else if (i === this.props.end_state_row && j === this.props.end_state_col){
                        return <Square value={'O'}/>
                    } else {
                        return <Square value = {''}/>
                    }
                })}
            </tr>)
        });

        return (
            <div style={{ textAlign:'center'}}>
                <div style={{margin: 'auto', width:"40%"}}>
                    <table cellSpacing="0">
                        <tbody>
                        {board}
                        </tbody>
                    </table>
                </div>
                <br />
                {/*<Button onClick={this.handleReset} />*/}
            </div>
        )

    }
}


class RankingBoard extends React.Component {
    render(){
        return(
            <div>
                <h2 className="steps">spaceship heros ranking board
                    after step {this.props.step} in round {this.props.round}</h2>


                <ol>
                    <li>A. Turing: 10</li>
                    <li>J. Neumann: 10</li>
                    <li>J. Tennenbaum: 10</li>
                    <li>A. Einstein</li>
                </ol>
            </div>
        );
    }

}

class Score extends React.Component {
    render(){
        return (
            <h2>Your score is: {this.props.score}</h2>
        );
    }
}


class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentKey: '',
            current_state_row: null,
            current_state_col:null,
            end_state_row:null,
            end_state_col:null,
            teleportationKey: '',
            episode_win: null,
            step: null,
            round: null,
            score: null,
            goal: null,
        };
        // this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress = (e) =>{
        //TODO: add the case when moving out of the board
        this.setState({
            currentKey: e.key,
            step: this.state.step + 1,
            score: this.state.score - 1,
        });
        if (!this.state.episode_win){
            if (e.key === "ArrowRight") {
                if (this.state.current_state_col + 1 <= 5){
                    this.setState({
                        current_state_col: this.state.current_state_col + 1,
                    });
                }
            }else if (e.key === "ArrowUp") {
                if (this.state.current_state_row - 1 >= 0){
                    this.setState({current_state_row: this.state.current_state_row - 1});
                }
            }else if (e.key === this.state.teleportationKey){
                this.setState({
                    current_state_row: this.state.end_state_row,
                    current_state_col: this.state.end_state_col,
                })
            }
        }else {

        }
    };

    next_round_board = () =>{
        this.setState({
            current_state_row: 5,
            current_state_col: 0,
            episode_win:false,
            step:0,
            round: this.state.round +1,
        });
    };

    checkEpisodeOver = () =>{
        if (this.state.current_state_row === this.state.end_state_row &&
        this.state.current_state_col === this.state.end_state_col){
            this.setState({
                episode_win: true,
                score: this.state.score + this.state.goal,
            });
            this.next_round_board();
        } else {
            return <h1>step {this.state.step} / round {this.state.round}</h1>
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        this.setState({
            current_state_row: 5,
            current_state_col: 0,
            end_state_row: 0,
            end_state_col: 5,
            teleportationKey: "p",
            episode_win:false,
            step:0,
            round:1,
            goal: 10,
            score: 0,
            goal: 10,
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    render() {
        const status = this.checkEpisodeOver();
        return(
            <div>
                <div className="game_status">{status}</div>
                <Score score={this.state.score}/>
                <h2>The last key you pressed: {this.state.currentKey}</h2>
                <Board
                    current_state_row={this.state.current_state_row}
                    current_state_col={this.state.current_state_col}
                    end_state_row={this.state.end_state_row}
                    end_state_col={this.state.end_state_col}
                />
                <RankingBoard step={this.state.step} round={this.state.round}/>
            </div>
        );
    }
}


ReactDOM.render(
    <Layout/>,
    document.getElementById('root')
);