import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Navigation = () => {
  const navStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "50px",
    // background: "#f0f0f0",
    margin: "0 auto",
    width: "100%",
    maxWidth: "600px",
    padding: "0 20px",
  };

  return (
    <div style={navStyle}>
      <Link to="/">
        <Button type="primary">Home</Button>
      </Link>
      <Link to="/characters">
        <Button type="primary">Characters</Button>
      </Link>
      <Link to="/about">
        <Button type="primary">About</Button>
      </Link>
    </div>
  );
};

export default Navigation;
