import React from "react";
import Board from './components/Board';
import AddScore from './components/AddScore';
import RankList from './components/RankList';
import negative_sound from './assets/negative_sound.mp3';
import positive_sound from './assets/positive_sound.mp3';
import LogFile from './components/LogFile';
import Sidebar from './components/Sidebar';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';

class GamePage extends React.Component {
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
            sidebarOpen: true,
            keyPressHist: [],
            // scoreIncrease:false,
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
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
        if ((e.key === "ArrowRight" ||
            e.key === "ArrowUp" ||
            e.key ===this.state.teleportationKey) ||
            (((97 <= e.key.charCodeAt(0) &&
                e.key.charCodeAt(0) <= 122) ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowDown")&&
                !this.state.keyPressHist.includes(e.key))){

            console.log(e.key.charCodeAt(0));
            this.setState({
                currentKey: e.key,
                step: this.state.step + 1,
                score: this.state.score - 1,
                totalStep: this.state.totalStep +1,
            });

            this.setState(previousState => ({
                keyPressHist: [...previousState.keyPressHist, e.key]
            }));

            if (this.state.totalStep >= 1){
                this.checkCrash();
            }

            if (e.key === "ArrowRight") {
                if (this.state.current_state_col + 1 <= 5){
                    this.setState({
                        current_state_col: this.state.current_state_col + 1,
                    });
                }
                this.checkGameStatus();
            }else if (e.key === "ArrowUp") {
                if (this.state.current_state_row - 1 >= 0){
                    this.setState({
                        current_state_row: this.state.current_state_row - 1
                    });
                }
                this.checkGameStatus();
            }else if (e.key === this.state.teleportationKey){
                this.setState({
                    current_state_row: this.state.end_state_row,
                    current_state_col: this.state.end_state_col,
                    episode_win: true,
                    score: this.state.score + this.state.goal,
                });
                // TODO: freeze the function of steps count
                this.checkGameStatus();
            }else{
                if (!this.state.crash){
                    document.getElementById('negative_sound').play();
                }
            }
        }else{

        }

    };

    checkGameStatus() {
        if (this.checkEpisodeWin()) {
            this.setState({
                episode_win: true,
                score: this.state.score + this.state.goal,
            });
            // setTimeout(()=>this.next_round_board(), 1000);
            document.getElementById('positive_sound').play();

            let wait = ms => new Promise((r, j) => setTimeout(r, ms));
            let prom = wait(2000);
            let show_next_round = () => this.next_round_board();
            prom.then(show_next_round())

        } else {
            if (!this.state.crash){
                document.getElementById('negative_sound').play();
            }
        }
    }

    gameStatus = () =>{
        return <p>step {this.state.step} / round {this.state.round}</p>
    };

    showCrashMessage = () =>{
        this.componentWillUnmount();
        return <p>Your spaceship crashes, game over, thanks for playing!</p>
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
            goal: 20,
            score: 0,
            gamma: 0.94,
            totalStep: 0,
            crash: false,
            sidebarOpen:false,
        });
    }


    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }


    render() {
        const title = "Spaceship Adventure";
        const instruction1 = "skill1: try arrow keys to move. Hint: ArrowUp moves your spaceship up.";
        const instruction2 = "skill2: try [a-z] lower case letters to teleport the spaceship, " +
            "so that your spaceship will reach the " +
            "destination in one move";

        const status = this.gameStatus();
        console.log("get into layout render");

        return(
            <div>
                <Sidebar
                sidebar={
                    <div>
                        {/*<b>Rank list</b>*/}
                        <RankList totalStep={this.state.totalStep}/>
                    </div>
                }
                open={this.state.sidebarOpen}
                // onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}>
                {/*<button onClick={() => this.onSetSidebarOpen(true)}>*/}
                {/*</button>*/}
                <h1 style={{textAlign:'center'}}>{title}</h1>
                <h3 style={{paddingLeft: '50px'}} className="instruction1">{instruction1}</h3>
                <h3 style={{paddingLeft: '50px'}} className="instruction2">{instruction2}</h3>
                <div style={{paddingLeft: '50px'}} className="game_status">{status}</div>
                <p style={{paddingLeft: '50px'}}>Your total step: {this.state.totalStep}</p>
                <p style={{paddingLeft: '50px'}}>There is a {Math.round((1-this.state.gamma)*100)} percent probability that
                    your spaceship will crash in the next step!
                </p>
                {/*<div>{this.state.crash && this.showCrashMessage()}</div>*/}
                <AddScore
                    score={this.state.score}
                />
                <Board
                    current_state_row={this.state.current_state_row}
                    current_state_col={this.state.current_state_col}
                    end_state_row={this.state.end_state_row}
                    end_state_col={this.state.end_state_col}
                />
                <p style={{paddingLeft:'50px'}}>The key(s) you pressed: {this.state.keyPressHist.map((data) => {
                    return <li>{data}</li>
                })
                }</p>
                <audio id="negative_sound" src={negative_sound}/>
                <audio id="positive_sound" src={positive_sound}/>
                {this.state.crash &&
                <LogFile keyPressHist={this.state.keyPressHist}/>
                }
                {this.state.crash && <Redirect to='/gameOver'/>}
                </Sidebar>

            </div>
        );
    }
}

export default GamePage;