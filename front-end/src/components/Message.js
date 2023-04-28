import React from "react";
import "../style/message.css";

const Message = ({ type, message, loginErrorReset }) => {
  let icon;
  let backgroundColor;

  switch (type) {
    case "success":
      icon = "✔";
      backgroundColor = "rgb(98, 148, 98)";
      break;
    case "warning":
      icon = "⚠";
      backgroundColor = "rgb(252, 207, 124)";
      break;
    case "error":
      icon = "✖";
      backgroundColor = "rgb(243, 140, 140)";
      break;
    default:
      icon = "";
      backgroundColor = "rgb(160, 160, 160)";
  }

  return (
    <div
      onClick={loginErrorReset}
      className="message-box"
      style={{ backgroundColor }}
    >
      <span className="icon">{icon}</span>
      <span className="message">{message}</span>
    </div>
  );
};

export default Message;
