import React from "react";

class AddScore extends React.Component {
    render(){
        const scoreColor = this.props.score <= 0 ? "red": "green";

        return (
            <p style={{paddingLeft: '50px'}}>Your score is:
                <span style={{color: scoreColor}}> {this.props.score}</span></p>
        );
    }
}

export default AddScore;