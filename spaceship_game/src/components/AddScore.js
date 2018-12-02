import React from "react";

class AddScore extends React.Component {
    render(){
        const scoreColor = this.props.score <= 0 ? "red": "green";

        return (
            <p>Your score is:
                <span style={{color: scoreColor}}> {this.props.score}</span></p>
        );
    }
}

export default AddScore;