import * as PostsApi from "../PostsApi";
import GUID from 'guid';

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export const doFetchComments = comments => ({
    type: FETCH_COMMENTS,
    comments
});

export const addComment = ({
                               id = GUID.raw(),
                               body = '',
                               author = 'Anonymous',
                               timestamp = Date.now(),
                               parentId = 0,
                               deleted = false,
                               voteScore = 1
                           } = {}) => (
    {
        type: ADD_COMMENT,
        payload: {
            id, body, author, timestamp, parentId, deleted, voteScore
        }

    });

export const deleteCommentAction = (comment) => ({
    type: DELETE_COMMENT,
    payload: comment
});

export const voteComment = (comment) => ({
    type: VOTE_COMMENT,
    payload: comment
});


export function fetchComments(postId) {
    return function (dispatch) {
        PostsApi.fetchComments(postId)
            .then(function (comments) {
                dispatch(doFetchComments(comments));
            })
    }
}

export const postComment = (comment) => (dispatch) => {
    return PostsApi.addComment(comment)
        .then(comment => {
            dispatch(addComment(comment));
            return comment;
        });
};

export const editComment = (comment) => (dispatch) => {
    return PostsApi.editComment(comment)
        .then(comment => {
            dispatch({
                type: EDIT_COMMENT,
                payload: comment
            });
            return comment;
        })
};

export const deleteComment = (id) => (dispatch) => {
    return PostsApi.deleteComment(id)
        .then(comment => {
            dispatch(deleteCommentAction(comment));
            return comment;
        })
};


export function doVoteComment(vote) {
    return function (dispatch) {
        PostsApi.voteComment(vote.id, vote.option)
            .then(function (res) {
                dispatch(voteComment(res));
            })
    }
}

