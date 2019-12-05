import * as React from "react";

export interface LobbyButtonProps {
  onClick: () => void;
  text: string;
}

const LobbyButton: React.SFC<LobbyButtonProps> = ({ text, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: "0.5rem",
        display: "block",
        padding: "1rem 2rem",
        margin: "4rem 2rem",
        border: "0.15rem solid",
        textTransform: "uppercase",
        fontWeight: "lighter",
        fontSize: "1.2em",
        boxShadow: "0 0 1rem, inset 0 0 0.6rem",
        cursor: "pointer",
        textAlign: "center"
      }}
    >
      {text}
    </div>
  );
};

export default LobbyButton;
