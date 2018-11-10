import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component{
    render(){
        return <div className="square">{this.props.value}</div>;
    }
}


class Board extends React.Component{

    renderSquare(i) {
        // TODO: if arrowup: current_state - 5, else if arrow right: current_state + 1
        if (i === this.props.current_state){
            return <Square value={'X'}/>
        }else if (i === this.props.end_state) {
            return <Square value={'O'}/>
        }else{
            return <Square value={''}/>
        }
    }

    render(){
        return (
            <div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                    {this.renderSquare(16)}
                    {this.renderSquare(17)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(18)}
                    {this.renderSquare(19)}
                    {this.renderSquare(20)}
                    {this.renderSquare(21)}
                    {this.renderSquare(22)}
                    {this.renderSquare(23)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(24)}
                    {this.renderSquare(25)}
                    {this.renderSquare(26)}
                    {this.renderSquare(27)}
                    {this.renderSquare(28)}
                    {this.renderSquare(29)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(30)}
                    {this.renderSquare(31)}
                    {this.renderSquare(32)}
                    {this.renderSquare(33)}
                    {this.renderSquare(34)}
                    {this.renderSquare(35)}
                </div>
            </div>
        );
    }
}


class ranking_board extends React.Component {

}

class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentKey: '',
            current_state: null,
            end_state:null,
            teleportationKey: ''
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        //TODO: add the case when moving out of the board
        this.setState({currentKey: e.key});
        if(e.key === "ArrowRight") {
            this.setState({current_state: this.state.current_state + 1});
        }else if (e.key === "ArrowUp") {
            this.setState({current_state: this.state.current_state - 6});
        }else if (e.key === this.state.teleportationKey){
            this.setState({current_state: this.state.end_state})
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        this.setState({current_state: 30, end_state:5, teleportationKey: "p"});
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    render() {
        return(
            <div>
                <h2>The last key you pressed has the keycode: {this.state.currentKey}</h2>
                <Board current_state={this.state.current_state} end_state={this.state.end_state}/>
            </div>
        );
    }
}


ReactDOM.render(
    <Layout/>,
    document.getElementById('root')
);