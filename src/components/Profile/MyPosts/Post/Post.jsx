import React from "react";
import styles from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={styles.item}>
            <img src="http://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg"
                 alt=""/>
            {props.messages}
            <div>
                <span>like {props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post;
