import React from 'react';
import Card from './Card';

const Posts = ({posts, loading}) => {

    if(loading) {
        return <h2>Loading</h2>
    }
    return (
        <div class="d-flex flex-wrap">
            {posts.map(post => <Card post={post} />)}
        </div>
    )
}

export default Posts
