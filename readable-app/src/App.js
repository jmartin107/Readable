import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import {Switch, Route, withRouter} from 'react-router-dom';
import {fetchPosts} from './actions';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import Sidebar from 'react-sidebar';
import Menu from './components/Menu';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sidebarOpen: false
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    };

    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        let sidebarContent = <Menu/>;

        const contentStyle = {
            marginTop: 64
        };

        return (
            <div className="App">
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            {this.props.postTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div>
                    <Sidebar sidebar={sidebarContent}
                             open={true}
                             onSetOpen={this.onSetSidebarOpen}
                             docked={true}
                             style={contentStyle}>
                        <div style={contentStyle}>
                            <Switch>
                                <Route exact path='/' component={Posts}/>
                                <Route exact path='/:category' component={Posts}/>
                                <Route exact path='/:category/:id' component={PostDetail}/>
                            </Switch>
                        </div>
                    </Sidebar>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        postTitle: state.posts.postTitle
    }
}

export default withRouter(connect(mapStateToProps, {fetchPosts})(App));
