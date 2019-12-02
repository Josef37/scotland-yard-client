import * as React from "react";

export interface AnimatedTextProps {
  text: string;
}

const AnimatedText: React.SFC<AnimatedTextProps> = ({ text }) => {
  return (
    <div
      style={{
        textAlign: "left",
        overflow: "hidden",
        marginLeft: "auto",
        display: "inline-block",
        maxWidth: "100%"
      }}
    >
      <span
        style={{
          position: "relative",
          whiteSpace: "nowrap",
          animation: `${text.length / 10 +
            2}s linear 0s infinite normal scroll`,
          left: 0,
          display: "inline-block"
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default React.memo(AnimatedText);
