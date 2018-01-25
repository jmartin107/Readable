import * as PostsApi from '../PostsApi.js';

import {
    ADD_POST,
    REMOVE_POST,
    GET_ALL_POSTS,
    VOTE_POST,
    GET_POST,
    EDIT_POST,
    GET_CATEGORIES,
    SORT_POST,
    POST_ADD_FORM,
    POST_IS_DETAIL,
    SORT_COMMENT,
    SET_POST_TITLE
} from './types'


export function addPost(post, success) {
    return {
        type: ADD_POST,
        payload: post,
        postAddSuccess: success
    }
}

export function postIsDetail(isDetail) {
    return {
        type: POST_IS_DETAIL,
        isDetail
    }
}

export const setPostTitle = (title) => ({
    type: SET_POST_TITLE,
    postTitle: title
});

export const postAddForm = (showAddForm) => (
    {
        type: POST_ADD_FORM,
        postAddForm: showAddForm
    }
);


export const sortPost = sortValue => {
    return {
        type: SORT_POST,
        sortValue
    }
};

export const sortComment = sortValue => {
    return {
        type: SORT_COMMENT,
        sortValue
    }
};

export const getPost = post => (
    {
        type: GET_POST,
        post: post
    }
);

export const getCategories = categories => (
    {
        type: GET_CATEGORIES,
        categories
    });

export const receivePosts = posts => {
    let postsObject = posts.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
    }, {});

    return {
        type: GET_ALL_POSTS,
        payload: postsObject
    };
};

export const editPost = (post, success) => {
    return {
        type: EDIT_POST,
        payload: post,
        postAddSuccess: success
    }
};


export function votePost(post) {
    return {
        type: VOTE_POST,
        payload: post
    }
}


export const fetchPosts = () => (dispatch) => {
    return PostsApi.getPosts()
    .then(posts => {
        dispatch(receivePosts(posts));
    })
};

export const fetchPost = (postId) => (dispatch) => {
    return PostsApi.getPost(postId)
        .then(post => {
            dispatch({
                type: GET_POST,
                post: post
            });
            return post;
        });
};

export function fetchCategories() {
    return function (dispatch) {
        PostsApi.getCategories()
            .then(function (categories) {
                dispatch(getCategories(categories.categories));
            })
    }
}

export function doAddPost(post) {
    return function (dispatch) {
        PostsApi.addPost(post)
            .then(function (res) {
                // Set form submit response
                dispatch(addPost(res, true));
            })
    }
}

export function doVotePost(vote) {
    return function (dispatch) {
        PostsApi.postVote(vote.id, vote.option)
            .then(function (post) {
                dispatch(votePost(post));
            })
    }
}

export function doEditPost(post) {
    return function (dispatch) {
        PostsApi.editPost(post)
            .then(function (post) {
                dispatch(editPost(post, true))
            })
    }
}

export const deletePost = (postId) => (dispatch) => {
    return PostsApi.deletePost(postId)
        .then(post => {
            dispatch({
                type: REMOVE_POST,
                payload: post
            });
            return post;
        });
};