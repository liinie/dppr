import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
        return (
            <button
                className="square"
                // onClick={() => this.setState({value:'X'})}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            current_state: null
        };
    }


    renderSquare(i) {
        // TODO: if arrowup: current_state - 5, else if arrow right: current_state + 1
        if (i === this.state.current_state){
            return <Square value={'X'}/>
        }else if (i === 4) {
            return <Square value={'O'}/>
        }else{
            return <Square value={''}/>
        }
    }



    render() {
        const status = 'You can use ArrowUp key to go up, find out how to go right or to teleport your spaceship!';
        document.onkeydown = function (event) {
            console.log(this.state.current_state);
            document.getElementById("key-press").innerHTML = event.key;
            if (event.key === 'ArrowRight') {
                console.log("you pressed ArrowRight");
                this.setState({current_state: this.state.current_state+1});
            }else if (event.key === 'ArrowUp') {
                console.log("you pressed ArrowUp");
                this.setState({current_state: this.state.current_state - 5});
            }else if (event.key.length === 1 && event.key.match(/[a-z]/)) {
                    console.log("the key you pressed is a lower case letter")
            }

        };


        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                </div>
                <div className="board-row">
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
                <div className="board-row">
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                </div>
                <div className="board-row">
                    {this.renderSquare(15)}
                    {this.renderSquare(16)}
                    {this.renderSquare(17)}
                    {this.renderSquare(18)}
                    {this.renderSquare(19)}
                </div>
                <div className="board-row">
                    {this.renderSquare(20)}
                    {this.renderSquare(21)}
                    {this.renderSquare(22)}
                    {this.renderSquare(23)}
                    {this.renderSquare(24)}
                </div>
                key pressed: <span id="key-press"></span>
            </div>
        );
    }
}



class Game extends React.Component {

    render() {
        const skill1 = 'Skill 1: You can use arrow keys to control your spaceship';
        const skill2 = 'Skill 2: You can use one of the 26 lowercase letters to teleport your spaceship ';


        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
