import * as React from "react";

export interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.SFC<CloseButtonProps> = ({ onClose }) => {
  return (
    <span
      onClick={event => onClose()}
      style={{
        fontSize: "4em",
        position: "absolute",
        right: 0,
        top: 0,
        marginRight: ".5em",
        cursor: "pointer"
      }}
    >
      ×
    </span>
  );
};

export default CloseButton;
