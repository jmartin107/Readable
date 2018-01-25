import React, {Component} from 'react';

class Vote extends Component {

    render() {
        return (
            <div className="post-vote-container">
                <div
                    className="vote-up"
                    onClick={() => this.props.votePost({id: this.props.id, option:'upVote'} )}>

                </div>
                <div>{this.props.voteScore}</div>
                <div
                    className="vote-down"
                    onClick={() => this.props.votePost({id: this.props.id, option: 'downVote'})}>
                </div>
            </div>
        );
    }
}

export default Vote;