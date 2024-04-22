import React from "react";

function About() {
  const aboutStyle: React.CSSProperties = {
    backgroundImage: 'url("/picture/ram2.jpg")',
    height: "100vh",
    width: "97.5vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textShadow: "2px 2px 4px #000000",
    padding: "20px",
    textAlign: "center",
  };

  return (
    <div style={aboutStyle}>
      <h2>
        Welcome to our Rick and Morty fan page! Dive into the zany multiverse of
        one of television's most beloved animated series. Here, you'll discover
        a treasure trove of information about your favorite characters from the
        show. From the eccentric genius Rick Sanchez to his adventure-seeking
        grandson Morty Smith, explore detailed insights and fun facts about each
        character that brings this chaotic universe to life. P.S Don't sue me!
      </h2>
    </div>
  );
}

export default About;
