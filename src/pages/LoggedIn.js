import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./Login"

export default function LoggedIn() {
    const user = useSelector((state) => state.user);
    return user ? <Outlet /> : <Login />
}