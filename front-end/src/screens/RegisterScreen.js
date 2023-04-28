import React, { useState } from "react";
import "../style/registerScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../features/userRegisterSlice";
import { login } from "../features/userLoginSlice";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;

  const registerHandler = (e) => {
    if (userInfo) {
    }
    if (password === confirmPassword) {
      dispatch(
        register({
          name,
          email,
          password,
        })
      );
      dispatch(login({ email, password }));
      navigate("/");
    }
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="register-box">
      <h2>Register</h2>
      <form className="register-form">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <label>Confirm password: </label>
        <input
          type="password"
          name="password"
          id="confirmPassword"
          placeholder="Confirm your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          className="subscribe-btn"
          type="button"
          onClick={registerHandler}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
