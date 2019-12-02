import * as React from "react";

export interface LoginProps {
  onSubmitLogin: (name: string) => void;
}

const Login: React.SFC<LoginProps> = ({ onSubmitLogin }) => {
  const [name, setName] = React.useState("");

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        fontSize: "2em"
      }}
      onSubmit={event => {
        event.preventDefault();
        onSubmitLogin(name);
      }}
    >
      <label style={{ marginBottom: 50 }}>Your Nickname</label>
      <input
        autoFocus
        type="text"
        id="nickname"
        name="nickname"
        value={name}
        onChange={event => setName(event.target.value)}
        style={{
          backgroundColor: "inherit",
          border: "none",
          borderBottom: "2px solid white",
          textAlign: "center",
          marginBottom: 100
        }}
      />
    </form>
  );
};

export default Login;
