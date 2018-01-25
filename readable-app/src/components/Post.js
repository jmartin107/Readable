import React, { Component } from 'react';
import Vote from './Vote'
import '../App.css';
import { connect } from 'react-redux';
import { doVotePost, deletePost, fetchPost } from "../actions";
import { fetchComments } from "../actions/comments";
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import PostForm from './PostForm';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
    button: {
        margin: '0px',
    },
    editButtons: {
        display: 'inline'
    },
    post: {
        display: 'inline'
    },
    comments: {
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
        width: '400px'
    }
};

class Post extends Component {

    state = {
        editMode: false
    };

    componentDidMount() {
        this.props.fetchComments(this.props.post.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.postAddSuccess) {
            this.setState({ editMode: false });
        }
    }

    editPost = () => {
        this.setState({ editMode: true });
    };

    cancelEditPost = () => {
        this.setState({ editMode: false });
    };

    deletePost = () => {
        this.props.deletePost(this.props.post.id)
            .then(post => {
                this.props.fetchPost(post.id);
            })
    };

    renderTitle = () => {
        const { title, id, category } = this.props.post;
        if (this.props.canEdit) {
            return <div className="post-title">{title}</div>
        } else {
            return <div className="post-title"><Link to={`${category}/${id}`}>{title}</Link></div>
        }
    };

    renderPost = () => {
        const { id, body, voteScore } = this.props.post;
        if (this.state.editMode) {
            return <PostForm
                post={this.props.post}
                cancelEdit={this.cancelEditPost}
            />
        } else {
            return <table>
                <tbody>
                    <tr><td colSpan="3">{this.renderTitle()}</td></tr>
                    <tr>
                        <td>
                            <Vote
                                id={id}
                                voteScore={voteScore}
                                votePost={this.props.votePost}
                            />
                        </td>
                        <td><div className="post-body">{body}</div></td>
                        <td><div style={styles.editButton}><Button
                            color="primary"
                            className={this.props.classes.button}
                            onClick={() => this.editPost()}>
                            Edit Post
                                </Button>
                        </div>
                            <div>
                                <Button
                                    color="primary"
                                    className={this.props.classes.button}
                                    onClick={this.deletePost}>
                                    Delete Post
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        }
    };

    render() {
        const { commentCount, timestamp, author } = this.props.post;

        let modified = '';
        if (timestamp) {
            modified = dateFormat(new Date(timestamp), 'mm/dd/yyyy HH:MM:ss');
        }

        if (Object.keys(this.props.post).length > 0) {
            return (
                <div>
                    <div>
                        {this.renderPost()}
                    </div>
                    <div>
                        <table style={styles.detail}>
                            <tbody>
                                <tr><td><div style={styles.comments}>Comments: {commentCount}</div></td><td><div style={styles.date}>Modified: {modified}</div></td></tr>
                                <tr><td colSpan="2"><div style={styles.comments}>Author: {author}</div></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }

    }
}

function mapStateToProps(state, ownProps) {

    let objectToArray = function (obj) {
        return Object.keys(obj).map((key) =>
            obj[key]
        )
    };

    let commentArray = objectToArray(state.comments.comments);

    return {
        comments: commentArray,
        post: ownProps.post,
        postAddSuccess: state.posts.postAddSuccess,
        canEdit: ownProps.canEdit
    }
}

function mapDispatchToProps(dispatch) {
    return {
        votePost: (vote) => dispatch(doVotePost(vote)),
        fetchComments: (id) => dispatch(fetchComments(id)),
        deletePost: (id) => dispatch(deletePost(id)),
        fetchPost: (postId) => dispatch(fetchPost(postId))
    }
}

Post = withStyles(styles, { name: 'Post' })(Post);
export default connect(mapStateToProps, mapDispatchToProps)(Post);

