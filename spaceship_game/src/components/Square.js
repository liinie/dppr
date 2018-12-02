import React from "react";

class Square extends React.Component{
    render(){
        return <div className="square">{this.props.value}</div>;
    }
}

export default Square;