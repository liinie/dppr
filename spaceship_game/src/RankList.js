import React, { Component } from 'react';
import FakeData from './fake_data'
// import BestScores from './best_score_list'

class RankList extends Component {


    render(){
        return(
            this.props.totalStep > 0 && this.props.totalStep % 10 === 0 &&
            <div>
                <h2 className="steps"> Ranking board
                    after total step of {this.props.totalStep}</h2>

                {/*<ol>*/}
                    {/*<li>A. Turing: 10</li>*/}
                    {/*<li>J. Neumann: 10</li>*/}
                    {/*<li>J. Tennenbaum: 10</li>*/}
                    {/*<li>A. Einstein: 10</li>*/}
                {/*</ol>*/}
                {FakeData.map((data) =>{
                    return (
                        <div>
                            <li>{data.id}: {data.name} {data.score}</li>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default RankList;