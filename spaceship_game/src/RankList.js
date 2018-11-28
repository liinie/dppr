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

                {FakeData.map((data) =>{
                    return (
                        <div>
                            <li>{data.id}: {data.name} {data.score.map((scoreData, index) =>{
                                if(index === ((this.props.totalStep/10) - 1)){return <div>{scoreData}</div>}
                                }
                            )}</li>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default RankList;