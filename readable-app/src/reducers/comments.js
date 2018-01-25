import {
    FETCH_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    VOTE_COMMENT,
    EDIT_COMMENT
} from '../actions/types'

const initialCommentState = {
    comments: {}
};

export function comments(state = initialCommentState, action) {

    let convertArrayToObject = function (arr) {
        let obj = {};
        arr.forEach(function (item) {
            obj[item.id] = item;
        });

        return obj;
    };

    switch (action.type) {

        case FETCH_COMMENTS:
            let newComments = convertArrayToObject(action.comments);
            return {
                ...state,
                comments: Object.assign({}, state.comments, newComments)
            };

        case ADD_COMMENT:
            let comment = {};
            comment[action.payload.id] = action.payload;
            return {
                ...state,
                comments: Object.assign({}, state.comments, comment)
            };

        case EDIT_COMMENT:
            comment = {};
            comment[action.payload.id] = action.payload;
            return {
                ...state,
                comments: Object.assign({}, state.comments, comment)
            };

        case DELETE_COMMENT:
            comment = {};
            comment[action.payload.id] = action.payload;
            return {
                ...state,
                comments: Object.assign({}, state.comments, comment)
            };

        case VOTE_COMMENT:
            let comment2 = {};
            if (state.comments[action.payload.id]) {
                comment2[action.payload.id] = action.payload;
            }

            return {
                ...state,
                comments: Object.assign({}, state.comments, comment2)
            };

        default:
            return state;
    }
}