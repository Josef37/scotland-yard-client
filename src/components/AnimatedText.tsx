import * as React from "react";

export interface AnimatedTextProps {
  text: string;
}

const AnimatedText: React.SFC<AnimatedTextProps> = ({ text }) => {
  React.useLayoutEffect(() => {
    (Array.from(document.querySelectorAll(".animated-text")) as Array<
      HTMLSpanElement
    >).forEach(span => {
      if (
        span.parentElement &&
        span.offsetWidth <= span.parentElement.offsetWidth
      ) {
        span.style.removeProperty("animation");
      }
    });
  });
  return (
    <div
      style={{
        textAlign: "left",
        overflow: "hidden",
        marginLeft: "auto"
      }}
    >
      <span
        className="animated-text"
        style={{
          position: "relative",
          whiteSpace: "nowrap",
          animation: `${text.length / 10 +
            2}s linear 0s infinite normal scroll`,
          display: "inline-block",
          transform: "translateX(-100%)",
          left: "100%"
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default React.memo(AnimatedText);
