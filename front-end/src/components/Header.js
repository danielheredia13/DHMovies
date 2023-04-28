import React from "react";
import "../style/navBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userLoginSlice";
import { reset } from "../features/movieUserFavoritesSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <header className="navbar-wrap">
      <Link to="/">
        <h3 className="nav-brand">DH Movies</h3>
      </Link>
      {userInfo && userInfo.name ? (
        <div>
          {" "}
          <Link to={`/profile/${userInfo._id}`}>
            <h4 className="user-name-header">
              {userInfo && userInfo.name && userInfo.name.split(" ")[0]}
            </h4>
          </Link>
          <p onClick={logoutHandler} className="logout-header">
            Logout
          </p>{" "}
        </div>
      ) : (
        <Link to="/login">
          <h4 className="sign-in">Sing In</h4>
        </Link>
      )}
    </header>
  );
};

export default Header;
