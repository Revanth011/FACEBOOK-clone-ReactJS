import moment from 'moment';
import { useSelector } from "react-redux";

import "./Post.css"

const Post = ({ post }) => {
    const user = useSelector((state) => state.user);
    return (
        <div className="Post">
            <div className="postHeader">
                <div className="postProfile">
                    <img src="./defaultUser.jpg" className="postProfImg" alt="" />
                    <span>{user.userName}</span>
                </div>
                <div>{moment(post.createdAt).fromNow()}</div>
            </div>
            <div className="postContent">
                <span>{post.text}</span>
                {post.images[0] ? <img src={post.images[0]} alt="" className="postImg" /> : ""}
            </div>
            <div className="postBottom">
            </div>
        </div>
    )
}

export default Post
