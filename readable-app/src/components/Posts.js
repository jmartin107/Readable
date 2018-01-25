import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import {fetchPosts, postIsDetail, setPostTitle} from "../actions";
import PostForm from './PostForm';

class Posts extends Component {

    componentWillMount() {
        this.props.fetchPosts();
    }

    componentDidMount() {
        this.props.postIsDetail(false);   
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.postAddSuccess) {
            this.setState({showPostForm: false});
        }

        if(nextProps.match.params.category) {
            this.props.setPostTitle('Posts - Category: ' + nextProps.match.params.category);
        } else {
            this.props.setPostTitle('Posts - Category: All');
        }
    }

    renderPostForm = () => {
        if (this.props.postAddForm) {
            return <PostForm/>
        }
    };

    /*
    showPostForm = () => {
        this.setState({showPostForm: true});
    };
    */

    render() {
        const { match } = this.props;

        return (

            <div>
                <div>
                    {this.renderPostForm()}
                </div>

                {Object.values(this.props.posts)
                    .filter((post) => {
                        if(match.params.category) {
                            return !post.deleted && post.category === match.params.category
                        } else {
                            return !post.deleted
                        }
                    })
                    .sort((a, b) => {
                            if (this.props.sort === 'votes') {
                                return a.voteScore - b.voteScore;
                            } else {
                                return a.timestamp - b.timestamp;
                            }
                        }
                    )
                    .map((post) => (
                            <Post
                                key={post.id}
                                post={post}
                                canEdit={false}
                            />
                        )
                    )}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        posts: state.posts.posts,
        sort: state.posts.sort,
        category: state.posts.category,
        postAddSuccess: state.posts.postAddSuccess,
        postAddForm: state.posts.postAddForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        postIsDetail: (isDetail) => dispatch(postIsDetail(isDetail)),
        setPostTitle: (title) => dispatch(setPostTitle(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)