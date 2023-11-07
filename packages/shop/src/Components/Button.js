import React, { useEffect } from "react";

export default ({ text = "Home Button", onClick }) => {
  const onClickHandler = () => {
    console.log(`Button.js: "${text}" clicked!`);
    onClick?.();
  };

  useEffect(() => {
    console.log("Button.js: mounted.");
    return () => console.log("Button.js: unmounted.");
  }, []);

  return (
    <button
      style={{
        border: "none",
        background: "red",
        color: "white",
        padding: "20px",
      }}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};
