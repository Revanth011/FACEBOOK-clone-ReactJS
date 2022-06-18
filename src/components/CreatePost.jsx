import "./CreatePost.css";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Photo } from "../svg"

const CreatePost = ({ setPost }) => {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [text, setText] = useState();
    const user = useSelector((state) => state.user);
    const textInput = useRef(null);

    const formData = new FormData();

    const postSubmit = async (e) => {
        e.preventDefault();
        if (!text) { return }
        setLoading(true)
        formData.set('text', text);
        formData.set('File', selectedFile);
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/post/createPost`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`
            }
        });
        textInput.current.value = "";
        setPost(data.data.post);
        setLoading(false);
    }

    return (
        <>
            <div className="createPost" id="postFile">
                <div className="createPostHeader">
                    <img src="./defaultUser.jpg" alt="" className="createPostProfImg" />
                    <input
                        type="text"
                        placeholder="what's on your mind?"
                        className="createPostInput"
                        required={true}
                        ref={textInput}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="createPostBottom">
                    <label htmlFor="fileIcon" className="fileIcon">
                        <input
                            type='file'
                            id="fileIcon"
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                        <Photo />
                        <span>{selectedFile ? "/" + selectedFile.name : ""}</span>
                    </label>
                    <button type="submit" onClick={postSubmit}>Post</button>
                </div>
                {loading ? <div className="loader" ><HashLoader size={35} /></div> : ""}
            </div>
        </>
    )
}

export default CreatePost;
