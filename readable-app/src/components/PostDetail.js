import React, { Component } from 'react';
import { deletePost, doEditPost, fetchPost, doVotePost, getPost, postIsDetail, setPostTitle } from "../actions";
import { fetchComments } from "../actions/comments";
import { connect } from 'react-redux';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import Post from './Post';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
    button: {
        margin: '0px',
    },
    commentButton: {
        float: 'left'
    },
    comments: {
        clear: 'both',
        border: '1px solid blue',
        margin: '10px',
        padding: '10px'
    },
    clear: {
        clear: 'both'
    },
    notfound: {
        margin: '20px',
        padding: '20px'
    }
};

class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            body: '',
            author: '',
            voteScore: 1,
            cntComments: 0,
            deleted: false,
            showComment: false,
            showPostForm: false
        };

    }

    componentDidMount() {
        this.props.postIsDetail(true);
        this.props.setPostTitle('');
        this.props.fetchPost(this.props.match.params.id)
            .then(res => {
                return this.props.fetchComments(this.props.match.params.id);
            })
    }

    addComment = () => {
        this.setState({
            ...this.state,
            showComment: true
        })
    };

    commentAdded = () => {
        this.setState({
            ...this.state,
            showComment: false
        })
    };

    cancelCommentAdd = () => {
        this.setState({
            ...this.state,
            showComment: false
        })
    };

    renderCommentForm = () => {
        if (this.state.showComment) {
            return <CommentForm
                commentAdded={this.commentAdded}
                cancelAdd={this.cancelCommentAdd}
            />
        }
    };

    showPostForm = () => {
        this.setState({ showPostForm: true });
    };

    render() {
        if (Object.keys(this.props.post).length > 0 && !this.props.post.deleted) {
            return (
                <div>
                    <div>
                        <Post
                            post={this.props.post}
                            canEdit={true}
                        />
                    </div>
                    <div style={styles.commentButton}>
                        <Button
                            color="primary"
                            className={this.props.classes.button}
                            onClick={this.addComment}>
                            Add Comment
                                    </Button>
                    </div>
                    <div style={styles.clear}>
                        {this.renderCommentForm()}
                    </div>
                    <div >
                        {Object.values(this.props.comments)
                            .filter((comment) => {
                                return !comment.deleted && (this.props.post.id === comment.parentId)
                            })
                            .sort((a, b) => {
                                if (this.props.commentSort === 'votes') {
                                    return a.voteScore - b.voteScore;
                                } else {
                                    return a.timestamp - b.timestamp;
                                }
                            })
                            .map((comment) => (
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))}

                    </div>
                </div>
            );
        } else {
            return <div style={styles.notfound}><p>404 - Page Not Found</p><p>This Post is no longer available.</p></div>
        }
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        post: state.posts.post,
        comments: state.comments.comments,
        commentSort: state.posts.commentSort,
        postAddForm: state.posts.postAddForm
    }
}

function mapDispatchToProps(dispatch) {

    return {
        votePost: (vote) => dispatch(doVotePost(vote)),
        fetchPost: (postId) => dispatch(fetchPost(postId)),
        editPost: (data) => dispatch(doEditPost(data)),
        getPost: (post) => dispatch(getPost(post)),
        fetchComments: (postId) => dispatch(fetchComments(postId)),
        deletePost: (id) => dispatch(deletePost(id)),
        postIsDetail: (isDetail) => dispatch(postIsDetail(isDetail)),
        setPostTitle: (title) => dispatch(setPostTitle(title))
    }
}


PostDetail = withStyles(styles, { name: 'PostDetail' })(PostDetail);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
