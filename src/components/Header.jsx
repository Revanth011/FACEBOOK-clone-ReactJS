import "../components/Header.css";
import { Link } from "react-router-dom";
import { Friends, Gaming, Home, Logo, Market, Search, Watch, Menu, Messenger, Notifications } from "../svg"
import { Popover } from 'antd';
import { useSelector } from "react-redux";

const Header = () => {
    const user = useSelector((state) => state.user);
    const searchDisplay = (
        <div className="searchDisplay">
            <span>Recent Searchres</span>
            <span>Edit</span>
        </div>
    );
    return (
        <header>
            <div className="headerLeft">
                <Link to="/" className="headerLogo">
                    <div className="circle">
                        <Logo />
                    </div>
                </Link>
                <Popover placement="bottom" content={searchDisplay} trigger="click">
                    <div className="search">
                        <Search />
                        <input type="text" placeholder="Search Facebook" className="searchInput" />
                    </div>
                </Popover>
            </div>
            <div className="headerMiddle">
                <Link to="/" className="active"><Home /></Link>
                <Link to="/" className="active"><Friends /></Link>
                <Link to="/" className="active"><Watch /></Link>
                <Link to="/" className="active"><Gaming /></Link>
                <Link to="/" className="active"><Market /></Link>
            </div>
            <div className="headerRight">
                <Link to="/" className="active"><Menu /></Link>
                <Link to="/" className="active"><Messenger /></Link>
                <Link to="/" className="active"><Notifications /></Link>
                <Link to="/" className="profileLink">
                    <img src="./defaultUser.jpg" className="userImg" alt="" />
                    {user ? <span>{user.userName}</span> : ""}
                </Link>
            </div>
        </header>
    )
}
export default Header
