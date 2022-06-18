import CreatePost from "../components/CreatePost"
import Post from "../components/Post"
import { useEffect, useState } from "react"
import axios from 'axios'
import Cookies from 'js-cookie'
import Header from "../components/Header"
import "./Home.css"

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState(false)
    const token = JSON.parse(Cookies.get('user')).token;
    const setPost = (data) => {
        setPosts([...posts, data]);
        setNewPost(!newPost);
    }
    useEffect(() => {
        const fetchPosts = async () => {
            const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/post/getAllPosts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(data.data.posts);
        }
        fetchPosts();
    }, [token, newPost])
    return (
        <>
            <Header />
            <div className="Home">
                <CreatePost setPost={setPost} />
                {posts.map((post) => {
                    return (
                        <Post key={post._id} post={post} />
                    )
                })}
            </div>
        </>
    )
}
export default Home
