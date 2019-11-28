import * as React from "react";

export interface LoginProps {
  onSubmitLogin: (name: string) => void;
}

const Login: React.SFC<LoginProps> = ({ onSubmitLogin }) => {
  const [name, setName] = React.useState("");

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSubmitLogin(name);
      }}
    >
      <label>
        Your Nickname:
        <input
          autoFocus
          type="text"
          id="nickname"
          name="nickname"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </label>
    </form>
  );
};

export default Login;
