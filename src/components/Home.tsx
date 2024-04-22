import React from "react";

const Home = () => {
  const homeStyle: React.CSSProperties = {
    backgroundImage: 'url("/picture/ram.jpg")',
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textShadow: "2px 2px 4px #000000",
  };

  return (
    <div style={homeStyle}>
      <h1>Welcome to Rick And Morty!</h1>
      <p>Discover the characters from Rick and Morty.</p>
    </div>
  );
};

export default Home;
