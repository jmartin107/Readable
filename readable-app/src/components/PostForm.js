import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doAddPost, doEditPost, postAddForm } from "../actions";
import GUID from 'guid';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: 4,
        minWidth: 120,
        width: 300
    },
    selectEmpty: {
        marginTop: 2,
    },
    textField: {
        width: 300
    }
};

class PostForm extends Component {

    constructor(props) {
        super(props);

        let isEdit = props.post ? true : false;

        this.state = {
            category: 'udacity',
            body: '',
            title: '',
            isEdit: isEdit,
            author: '',
            touched: {
                body: false,
                title: false,
                author: false
            }
        };

        if (props.post) {
            this.state = Object.assign({}, this.state, props.post)
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        // validate input                              
        if (this.state.body.trim().length < 1 &&
            this.state.title.trim().length < 1 &&
            this.state.author.trim().length < 1) {
                this.setState({
                    touched:{
                        body: true,
                        title: true,
                        author: true
                    }
                });
            return;
        }

        let post = this.state;
        let newPost = {
            id: GUID.raw(),
            timestamp: Date.now(),
            voteScore: 1,
            deleted: false,
            author: ''
        };

        post = Object.assign({}, newPost, post);

        if (this.state.isEdit) {
            this.props.editPost(post);
        } else {
            this.props.addNewPost(post);
        }
    };

    fieldBlur = (event) => {
        let name = event.target.name;
        this.setState({ touched: { ...this.state.touched, [name]: true } });
    };

    cancelEdit = () => {
        this.props.postAddForm(false);

        if (this.props.cancelEdit) {
            this.props.cancelEdit();
        }
    };

    validate = (inputs) => {
        return {
            title: inputs.title.length > 0 ? null : 'Title is required.',
            body: inputs.body.length > 0 ? null : 'Post is required.',
            author: inputs.author.length > 0 ? null : 'Author is required.'
        };
    };

    render() {

        const { classes } = this.props;

        const errors = this.validate({
            title: this.state.title,
            body: this.state.body,
            author: this.state.author
        });

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="category-simple">Category</InputLabel>
                        <Select
                            value={this.state.category}
                            onChange={this.handleChange}
                            input={<Input name="category" id="category-simple" />}
                        >
                            <MenuItem value='react'>React</MenuItem>
                            <MenuItem value='redux'>Redux</MenuItem>
                            <MenuItem value='udacity'>Udacity</MenuItem>
                        </Select>
                    </FormControl>

                    <div>
                        <TextField
                            id="post-title"
                            name="title"
                            label="Title"
                            className={classes.textField}
                            value={this.state.title}
                            onChange={this.handleChange}
                            margin="normal"
                            onBlur={this.fieldBlur}
                        />
                    </div>
                    <div>
                        {errors.title && this.state.touched.title ? <p className="error-message">{errors.title}</p> : null}
                    </div>
                    <div>
                        <TextField
                            id="post-body"
                            name="body"
                            label="Post"
                            multiline
                            onBlur={this.fieldBlur}
                            className={classes.textField}
                            value={this.state.body}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                    </div>
                    <div>
                        {errors.body && this.state.touched.body ? <p className="error-message">{errors.body}</p> : null}
                    </div>
                    <div>
                        <TextField
                            id="post-author"
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
                        {errors.author && this.state.touched.author ? <p className="error-message">{errors.author}</p> : null}
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
                            onClick={() => this.cancelEdit()}
                        >
                            Cancel
                    </Button>
                    </div>
                </form>

            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts,
        cancelEdit: ownProps.cancelEdit,
        categories: state.posts.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewPost: (data) => dispatch(doAddPost(data)),
        editPost: (post) => dispatch(doEditPost(post)),
        postAddForm: (isAddForm) => dispatch(postAddForm(isAddForm))
    }
}

PostForm = withStyles(styles, { name: 'PostForm' })(PostForm);
export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
