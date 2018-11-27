import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RankList from "./RankList";


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


class AddScore extends React.Component {
    render(){
        return (
            <p>Your score is: {this.props.score}</p>
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
            episode_interrupt: null,
            gamma: null,
            totalStep: null,
            crash: false,
        };
    }

    checkEpisodeWin = () => {
        if (this.state.current_state_row === this.state.end_state_row &&
            this.state.current_state_col === this.state.end_state_col) {
            return true
        } else {
            return false
        }
    };

    next_round_board = () =>{
        this.setState({
            current_state_row: 5,
            current_state_col: 0,
            episode_win: false,
            step: 0,
            round: this.state.round +1,
        });
    };


    checkCrash = () => {
        const crashRate = (Math.round((1 - this.state.gamma)*100)/100);
        if (Math.random() < crashRate) {
            this.setState({
                crash: true,
            });
        }
    };

    handleKeyPress = (e) =>{

        this.setState({
            currentKey: e.key,
            step: this.state.step + 1,
            score: this.state.score - 1,
            totalStep: this.state.totalStep +1,
        });

        if (this.state.totalStep >= 1){
            this.checkCrash();
        }

        if (e.key === "ArrowRight") {
            if (this.state.current_state_col + 1 <= 5){
                this.setState({
                    current_state_col: this.state.current_state_col + 1,
                });
                if (this.checkEpisodeWin()) {
                    this.setState({
                        episode_win: true,
                        score: this.state.score + this.state.goal,
                    });
                    // setTimeout(()=>this.next_round_board(), 1000);
                    this.next_round_board()
                }
            }
        }else if (e.key === "ArrowUp") {
            if (this.state.current_state_row - 1 >= 0){
                this.setState({
                    current_state_row: this.state.current_state_row - 1
                });
                if (this.checkEpisodeWin()) {
                    this.setState({
                        episode_win: true,
                        score: this.state.score + this.state.goal,
                    });
                    // setTimeout(()=>this.next_round_board(), 1000);
                    this.next_round_board()
                }
            }
        }else if (e.key === this.state.teleportationKey){
            this.setState({
                current_state_row: this.state.end_state_row,
                current_state_col: this.state.end_state_col,
                episode_win: true,
                score: this.state.score + this.state.goal,
            });
            // TODO: freeze the function of steps count so that the
            if (this.checkEpisodeWin()){
                this.setState({
                    episode_win: true,
                    score: this.state.score + this.state.goal,
                });
                // setTimeout(()=>{this.next_round_board()}, 1000);
                this.next_round_board()
            }
        }

    };


    resetBoard = () => {
        this.next_round_board();
        this.setState({
            score: 0,
        });
    };


    gameStatus = () =>{
        return <p>step {this.state.step} / round {this.state.round}</p>
    };

    showCrashMessage= () =>{
        this.componentWillUnmount();
        return <p>Your spaceship crashes, game over!</p>
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
            gamma: 0.94,
            totalStep: 0,
            crash: false,
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    render() {
        const title = "Spaceship Adventure";
        const instruction1 = "skill1: try arrow keys to move. Hint: ArrowUp moves your spaceship up.";
        const instruction2 = "skill2: try [a-z] lower case letters to teleport the spaceship, so that your spaceship will reach the " +
            "dstination in one move";

        const status = this.gameStatus();

        return(
            <div>
                <h1 style={{ textAlign:'center'}}>{title}</h1>
                <h3 className="instruction1">{instruction1}</h3>
                <h3 className="instruction2">{instruction2}</h3>
                <div className="game_status">{status}</div>
                <p>Your total step: {this.state.totalStep}</p>
                <p>There is a {Math.round((1-this.state.gamma)*100)} percent probability that
                    your spaceship will crash in the next step!
                </p>
                <div>{this.state.crash && this.showCrashMessage()}</div>
                <AddScore
                    score={this.state.score}
                />
                <Board
                    current_state_row={this.state.current_state_row}
                    current_state_col={this.state.current_state_col}
                    end_state_row={this.state.end_state_row}
                    end_state_col={this.state.end_state_col}
                />
                <p>The last key you pressed: {this.state.currentKey}</p>
                <RankList totalStep={this.state.totalStep}/>
            </div>
        );
    }
}


// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Layout />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
