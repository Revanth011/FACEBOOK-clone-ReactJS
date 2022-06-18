import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import LoggedIn from "./pages/LoggedIn"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<LoggedIn />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}
export default App
