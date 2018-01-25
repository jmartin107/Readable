import * as PostsApi from '../PostsApi.js';

export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const GET_POST = 'GET_POST';
export const EDIT_POST = 'EDIT_POST';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SORT_POST = 'SORT_POST';
export const POST_ADD_RESET = 'POST_ADD_RESET';
export const POST_ADD_FORM = 'POST_ADD_FORM';
export const POST_IS_DETAIL = 'POST_IS_DETAIL';
export const SORT_COMMENT = 'SORT_COMMENT';
export const SET_POST_TITLE = 'SET_POST_TITLE';

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