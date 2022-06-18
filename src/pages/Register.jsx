import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addUser } from "../store/userReducer";
import axios from "axios"
import Cookies from 'js-cookie'
import HashLoader from "react-spinners/HashLoader";
import "./Login.css"

const Register = () => {
    let [Message, setMessage] = useState("");
    let [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
            "firstName": e.target.elements.firstName.value,
            "lastName": e.target.elements.lastName.value,
            "userName": e.target.elements.userName.value,
            "email": e.target.elements.email.value,
            "password": e.target.elements.password.value,
        })
        dispatch(addUser({ userProfile: data.data.userProfile, token: data.data.token, type: "LOGIN" }));
        Cookies.set('user', JSON.stringify({ ...data.data.userProfile, token: data.data.token }));
        setLoading(true)
        setMessage(data.data.message);
        if (data.data.status === 200) setTimeout(() => {
            setLoading(false);
            navigate("/");
        }, 6000);
        else setLoading(false);
    }
    return (
        <>
            <div className="loginMain">
                <div className="loginContainer">
                    <div className="loginTitle">Register</div>
                    <form id="registerForm" onSubmit={(e) => handlelogin(e)}>
                        <input type="text" name="firstName" placeholder="First Name" required />
                        <input type="text" name="lastName" placeholder="Last Name" required />
                        <input type="text" name="userName" placeholder="Username" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="on"
                            placeholder="Password"
                            required
                        />
                        <span style={{ color: "green" }}>{Message}</span>
                        <button type="submit">Register</button>
                    </form>
                    <br />
                    {loading ? <div className="loader"><HashLoader size={40} /></div> : ""}
                    <br />
                    <Link to="/login">Already Registered? Login</Link>
                </div>
            </div>
        </>
    )
}
export default Register
