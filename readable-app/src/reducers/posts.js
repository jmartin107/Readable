import {
    ADD_POST,
    REMOVE_POST,
    GET_ALL_POSTS,
    VOTE_POST,
    GET_POST,
    EDIT_POST,
    GET_CATEGORIES,
    SORT_POST,
    POST_ADD_RESET,
    POST_IS_DETAIL,
    POST_ADD_FORM,
    SORT_COMMENT,
    SET_POST_TITLE
} from '../actions/types'


const initialPostState = {
    posts: {},
    sort: 'votes',
    commentSort: 'votes',
    post: {},
    postAddSuccess: false,
    category: 'all',
    isDetail: false,
    categories: [],
    postAddForm: false,
    postTitle: 'Posts'
};

export function posts(state = initialPostState, action) {

    switch (action.type) {
        case ADD_POST:
            let post = {};
            post[action.payload.id] = action.payload;
            return {
                ...state,
                posts: Object.assign({}, state.posts, post),
                postAddForm: !action.postAddSuccess,
                postAddSuccess: !action.postAddSuccess
            };

        case POST_ADD_RESET:
            return {
                ...state,
                postAddSuccess: false
            };

        case GET_POST:
            post = {};
            if (Object.keys(action.post).length > 0) {
                post[action.post.id] = action.post;
            }

            return {
                ...state,
                posts: Object.assign({}, state.posts, post),
                post: action.post
            };

        case EDIT_POST:
            post = {};
            post[action.payload.id] = action.payload;
            return {
                ...state,
                posts: Object.assign({}, state.posts, post),
                postAddSuccess: action.postAddSuccess,
                post: action.payload
            };

        case GET_ALL_POSTS:
            return {
                ...state,
                posts: Object.assign({}, state.posts, action.payload)
            };

        case VOTE_POST:
            post = {};
            if (state.posts[action.payload.id]) {
                post[action.payload.id] = action.payload;
            }

            return {
                ...state,
                posts: Object.assign({}, state.posts, post),
                post: action.payload
            };

        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };

        case SORT_POST:
            return {
                ...state,
                sort: action.sortValue
            };

        case SORT_COMMENT:
            return {
                ...state,
                commentSort: action.sortValue
            };

        case REMOVE_POST:
            post = {};
            post[action.payload.id] = action.payload;

            return {
                ...state,
                posts: Object.assign({}, state.posts, post),
                post: action.payload
            };

        case POST_IS_DETAIL:
            return {
                ...state,
                isDetail: action.isDetail
            };

        case POST_ADD_FORM:
            return {
                ...state,
                postAddForm: action.postAddForm
            };

        case SET_POST_TITLE:
            return {
                ...state,
                postTitle: action.postTitle
            };

        default:
            return state
    }
}
