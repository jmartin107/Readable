import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postComment, editComment} from "../actions/comments";
import {fetchPost} from "../actions";
import GUID from 'guid';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = {};

class CommentForm extends Component {

    constructor(props) {
        super(props);

        let comment = this.props.comment;

        this.state = {
            id: comment ? comment.id : GUID.raw(),
            author: comment ? comment.author : '',
            body: comment ? comment.body : '',
            parentId: comment ? comment.parentId : '',
            timestamp: comment ? comment.timestamp : Date.now(),
            deleted: comment ? comment.deleted : false,
            touched: {
                author: false,
                body: false
            }
        };

    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    fieldBlur = (event) => {
        let name = event.target.name;
        this.setState({touched: {...this.state.touched, [name]: true}});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        // validate input                              
        if (this.state.body.trim().length < 1 &&
            this.state.author.trim().length < 1) {
            this.setState({
                touched: {
                    body: true,
                    author: true
                }
            });
            return;
        }

        let comment = {
            id: this.state.id,
            parentId: this.props.parentId,
            body: this.state.body,
            author: this.state.author,
            deleted: false,
            timestamp: Date.now()
        };

        if (this.props.editMode) {
            this.props.editComment(comment)
                .then(comment => {
                    this.props.commentAdded();
                    this.props.fetchPost(comment.parentId);
                });
        } else {
            this.props.postComment(comment)
                .then(comment => {
                    this.props.commentAdded();
                    this.props.fetchPost(comment.parentId);
                });
        }


    };

    validate = (inputs) => {
        return {
            body: inputs.body.length > 0 ? null : 'Comment is required.',
            author: inputs.author.length > 0 ? null : 'Author is required.'
        };
    };

    render() {
        const {classes} = this.props;

        const errors = this.validate({
            body: this.state.body,
            author: this.state.author
        });

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <TextField
                        id="author"
                        name="author"
                        label="Author"
                        className={classes.textField}
                        value={this.state.author}
                        onChange={this.handleChange}
                        onBlur={this.fieldBlur}
                        margin="normal"
                    />
                </div>
                <div>
                    {errors.author && this.state.touched.author ?
                        <p className="error-message">{errors.author}</p> : null}
                </div>
                <div>
                    <TextField
                        id="comment-body"
                        name="body"
                        label="Comment"
                        multiline
                        rowsMax="4"
                        className={classes.textField}
                        value={this.state.body}
                        onChange={this.handleChange}
                        onBlur={this.fieldBlur}
                        margin="normal"
                    />
                </div>
                <div>
                    {errors.body && this.state.touched.body ? <p className="error-message">{errors.body}</p> : null}
                </div>
                <div>
                    <Button
                        color="primary"
                        className={this.props.classes.button}
                        type="submit"
                    >
                        Save
                    </Button>
                    <Button
                        color="primary"
                        className={this.props.classes.button}
                        onClick={this.props.cancelAdd}
                    >
                        Cancel
                    </Button>
                </div>

            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments.comments,
        parentId: state.posts.post ? state.posts.post.id : ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postComment: (comment) => dispatch(postComment(comment)),
        editComment: (comment) => dispatch(editComment(comment)),
        fetchPost: (postId) => dispatch(fetchPost(postId))
    }
}

CommentForm = withStyles(styles, {name: 'CommentForm'})(CommentForm);
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

