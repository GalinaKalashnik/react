import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import AddMessageFormRedux from "./AddNewPostForm";

const MyPosts = React.memo(props => {
    let postsElements = props.posts.map((p, index) => <Post message={p.message} likesCount={p.likesCount}
                                                            id={p.id} key={index}/>)

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddMessageFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

export default MyPosts;