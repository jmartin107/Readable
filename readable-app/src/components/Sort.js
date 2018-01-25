import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Radio, {RadioGroup} from 'material-ui/Radio';
import {FormLabel, FormControl, FormControlLabel} from 'material-ui/Form';
import {connect} from 'react-redux';
import {sortPost, sortComment} from "../actions";

const styles = {
    root: {
        display: 'flex',
    },
    formControl: {
        margin: 3,
    },
    group: {
        margin: `1px 0`,
    },
};

class Sort extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: 'votes',
            posts: 'votes'
        }

    }

    handleChange = (event, value) => {
        let name = event.target.name;
        debugger;
        this.setState({
            [name]:value
        });

        if(this.props.isDetail) {
            this.props.sortComment(value);
        } else {
            this.props.sortPost(value);
        }    
    };

    render() {
        const { classes, name } = this.props;
        return <div><FormControl component="fieldset" required className={classes.formControl}>
            <FormLabel component="legend">{this.props.title}</FormLabel>
            <RadioGroup
                name={name}
                className={classes.group}
                value={this.state[name]}
                onChange={this.handleChange}
            >
                <FormControlLabel value="votes" control={<Radio/>} label="Votes"/>
                <FormControlLabel value="date" control={<Radio/>} label="Date"/>
            </RadioGroup>
        </FormControl>
        </div>
    }

}

function mapStateToProps(state, ownProps) {
    return {
        isDetail: state.posts.isDetail,
        title: ownProps.title,
        name: ownProps.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sortPost: (sortValue) => dispatch(sortPost(sortValue)),
        sortComment: (sortValue) => dispatch(sortComment(sortValue))
    }
}

Sort = withStyles(styles, {name: 'Sort'})(Sort);
export default connect(mapStateToProps, mapDispatchToProps)(Sort);