const api = "http://localhost:3001";


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json());

export const addPost = (post) => {
    return fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(function (res) {
        return res.json()
    })
};

export const getPosts = () =>
    fetch(api + '/posts', { headers })
        .then(res => res.json());


export const postVote = (id, option) => {
    return fetch(api + '/posts/' + id, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, option })
    }).then(res => res.json())
};

export const fetchComments = (id) => {
    return fetch(api + '/posts/' + id + '/comments',
        { headers })
        .then(res => res.json())
};

export const addComment = (comment) => {
    return fetch(api + '/comments', {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(function (res) {
        return res.json();
    })
};

export const editComment = (comment) => {
    return fetch(api + '/comments/' + comment.id, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(function (res) {
        return res.json();
    })
};

export const deleteComment = (id) => {
    return fetch(api + '/comments/' + id, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    })
};

export const voteComment = (id, option) => {
    return fetch(api + '/comments/' + id, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, option })
    }).then(function (res) {
        return res.json();
    })
};

export const getPost = (postId) => {
    return fetch(api + '/posts/' + postId, { headers })
        .then(res => {
            return res.json()
        });
};


export const editPost = (post) => {
    return fetch(api + '/posts/' + post.id, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(function (res) {
        return res.json();
    })
};

export const deletePost = (id) => {
    return fetch(api + '/posts/' + id, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    })
};
