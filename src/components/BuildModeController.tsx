import * as React from "react";
import { BuildMode } from "../reducers/builder";
import { TransportationType, transportationColors } from "../constants";

export interface BuildModeControllerProps {
  onBuildModeSwitch: (mode: BuildMode) => void;
  onSubmit: () => void;
}

const BuildModeController: React.SFC<BuildModeControllerProps> = ({
  onBuildModeSwitch,
  onSubmit
}) => {
  return (
    <div
      style={{
        width: 170,
        height: "100%",
        display: "flex",
        flexFlow: "column nowrap",
        // alignItems: "flex-start",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        right: 0,
        marginRight: 30,
        textAlign: "center"
      }}
    >
      <h2 style={{ fontWeight: "lighter" }}>Connection Type</h2>
      {Object.values(TransportationType).map(type => (
        <ModeButton
          key={type}
          backgroundColor={transportationColors.get(type) || "black"}
          onClick={() => onBuildModeSwitch({ mode: "connection", item: type })}
          text={type}
        />
      ))}
      <h2 style={{ fontWeight: "lighter" }}>Starting Positions</h2>
      <ModeButton
        backgroundColor={"black"}
        onClick={() =>
          onBuildModeSwitch({ mode: "startingPosition", item: "mrx" })
        }
        text="Mr. X"
      />
      <ModeButton
        backgroundColor={"blue"}
        onClick={() =>
          onBuildModeSwitch({ mode: "startingPosition", item: "detective" })
        }
        text="Detective"
      />
      <h3
        onClick={onSubmit}
        style={{
          textTransform: "uppercase",
          border: "2px solid",
          padding: "1rem",
          marginTop: "3rem",
          background: "rgba(255,255,255,0.2)"
        }}
      >
        Submit changes
      </h3>
    </div>
  );
};

interface ModeButtonProps {
  onClick: () => void;
  backgroundColor: string;
  color?: string;
  text: string;
}

const ModeButton: React.SFC<ModeButtonProps> = ({
  onClick,
  backgroundColor,
  color,
  text
}) => {
  return (
    <span
      onClick={onClick}
      style={{
        backgroundColor,
        color,
        cursor: "pointer",
        padding: ".5rem 1rem",
        margin: ".5rem 0",
        display: "inline-block",
        borderRadius: ".3rem",
        border: ".15rem solid",
        fontWeight: 600
      }}
    >
      {text}
    </span>
  );
};

export default React.memo(BuildModeController);
