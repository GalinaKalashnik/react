import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'

const MyPosts = (props) => {

    let newPostElement = React.createRef();

    let newPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let newPostText = newPostElement.current.value;
        props.updateNewPostText(newPostText);
    }

    let postsElements = props.posts
        .map(p => <Post messages={p.message} likesCount={p.likesCount} />)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}
                              value={props.newPostText}
                              onChange={onPostChange}/>
                </div>
                <div>
                    <button onClick={newPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;
