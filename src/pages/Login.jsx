import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addUser } from "../store/userReducer";
import axios from "axios"
import Cookies from 'js-cookie'
import HashLoader from "react-spinners/HashLoader";
import "./Login.css"

const Login = () => {
    const [Message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
            "email": e.target.elements.email.value,
            "password": e.target.elements.password.value,
        })
        setLoading(true)
        setMessage(data.data.message);
        if (data.data.status === 200) setTimeout(() => {
            dispatch(addUser({ userProfile: data.data.userProfile, token: data.data.token, type: "LOGIN" }));
            Cookies.set('user', JSON.stringify({ ...data.data.userProfile, token: data.data.token }));
            setLoading(false);
            navigate("/");
        }, 4000);
        else setLoading(false);
    }
    return (
        <>
            <div className="loginMain">
                <div className="loginContainer">
                    <div className="loginTitle">Login</div>
                    <form onSubmit={(e) => handlelogin(e)}>
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="password" name="password" autoComplete="on" placeholder="Password" required />
                        <span style={{ color: "green" }}>{Message}</span>
                        <button type="submit">Login</button>
                    </form>
                    {loading ? <div className="loader"><HashLoader size={40} /></div> : ""}
                    <br />
                    <Link to="/register">Need an Account? Register</Link>
                </div>
            </div>
        </>
    )
}
export default Login
