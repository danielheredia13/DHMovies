import React, { useEffect, useState } from "react";
import "../style/registerScreen.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/userLoginSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.name) {
      navigate("/");
    }
  }, [userInfo]);

  const loginHandler = (e) => {
    dispatch(login({ email, password }));

    e.preventDefault();

    setEmail("");
    setPassword("");
  };

  return (
    <div className="register-box">
      <h2>Sign In</h2>
      {loading && <Loader />}
      {error && <Message type="error" message={error} />}
      <form className="register-form">
        <label>Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="subscribe-btn" type="button" onClick={loginHandler}>
          Sign In
        </button>
      </form>
      <p>
        Not register ?{" "}
        <Link to="/register">
          <span className="register-span">Register</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginScreen;
