import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment, doVoteComment } from "../actions/comments";
import { fetchPost } from "../actions";
import CommentForm from '../components/CommentForm';
import Vote from './Vote'
import dateFormat from 'dateformat';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';


const styles = {
    author: {
        fontSize: '0.8em',
        color: 'grey',
        textAlign: 'left',
        marginLeft: '6px'
    },
    date: {
        fontSize: '0.8em',
        color: 'grey',
        textAlign: 'right'
    },
    detail: {
        width: '250px',
        textAlign: 'left',
        border: '1px solid black'
    },
    container: {
        marginLeft: '10px',
        padding: '6px'
    }
}

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: this.props.comment || {},
            isEditMode: false
        };
    }

    commentAdded = () => {
        this.setState({
            ...this.state,
            isEditMode: false
        })
    };

    editComment = (comment) => {
        this.setState({
            ...this.state,
            isEditMode: true
        })
    };

    deleteComment = comment => {
        this.props.deleteComment(comment.id)
        .then(comment => {
            this.props.fetchPost(comment.parentId)
        })

    };

    renderCommentForm = () => {

        const { author, timestamp} = this.props.comment;
        let modified = dateFormat(new Date(timestamp), 'mm/dd/yyyy HH:MM:ss');

        if (this.state.isEditMode) {
            return <CommentForm
                commentAdded={this.commentAdded}
                comment={this.props.comment}
                editMode={true}
            />
        } else {
            return <div style={styles.container}>
                <table >
                    <tbody>
                        <tr>
                            <td><Vote
                                id={this.props.comment.id}
                                voteScore={this.props.voteScore || this.props.comment.voteScore}
                                votePost={this.props.voteComment}
                            /></td>
                            <td><div className="comment-body">{this.props.comment.body}</div></td>
                            <td rowSpan="2">
                                <div>
                                    <Button
                                        color="primary"
                                        className={this.props.classes.button}
                                        onClick={() => this.editComment(this.props.comment)}>
                                        Edit Comment
                                </Button>
                                </div>
                                <div>
                                    <Button
                                        color="primary"
                                        className={this.props.classes.button}
                                        onClick={() => this.deleteComment(this.props.comment)}>
                                        Delete Comment
                                </Button>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td><div style={styles.author}>Author: {author}</div></td><td><div style={styles.date}>Modified: {modified}</div></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        }
    };

    render() {
        return (
            <div>
                {this.renderCommentForm()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        voteScore: state.comments.comment ? state.comments.comment.voteScore : null
    };

}

function mapDispatchToProps(dispatch) {
    return {
        deleteComment: (id) => dispatch(deleteComment(id)),
        voteComment: (vote) => dispatch(doVoteComment(vote)),
        fetchPost: (postId) => dispatch(fetchPost(postId))
    }
}


Comment = withStyles(styles, { name: 'Comment' })(Comment);
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
