import React, { Component } from 'react';
import Categories from './Categories';
import Sort from './Sort';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { postAddForm } from "../actions";

const styles = {
    button: {
        margin: '2px',
    },
    input: {
        display: 'none',
    },
    container: {
        marginTop: '75px'
    }
};

class Menu extends Component {

    onAddPostClick = () => {
        this.props.postAddForm(true);
    };

    renderButton = () => {
        const { classes } = this.props;
        if (this.props.isDetail) {
            return <div></div>
        } else {
            return <Button
                raised color="primary"
                className={classes.button}
                onClick={this.onAddPostClick}
            >
                Add Post
            </Button>
        }
    };


    renderSort = () => {
        if (this.props.isDetail) {
            return <Sort
                title="Sort Comments By"
                name="comments"
            />
        } else {
            return <Sort
                title="Sort Posts By"
                name="posts"
            />
        }
    };


    render() {
        return (
            <div style={styles.container}>
                {this.renderButton()}
                <hr />
                <Categories />
                <hr />
                {this.renderSort()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isDetail: state.posts.isDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postAddForm: (isAddForm) => dispatch(postAddForm(isAddForm))
    }
}

Menu = withStyles(styles, { name: 'Menu' })(Menu);
export default connect(mapStateToProps, mapDispatchToProps)(Menu);