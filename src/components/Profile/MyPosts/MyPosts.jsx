import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post'

const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div className={styles.posts}>
                <Post messages='hi how are you' likesCount='0' />
                <Post messages='bla bla bla ' likesCount='23' />
            </div>
        </div>
    )
}

export default MyPosts;
