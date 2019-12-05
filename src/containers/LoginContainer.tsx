import * as React from "react";
import { connect } from "react-redux";
import Login, { LoginProps } from "../components/Login";
import { login } from "../actions";

const LoginContainer: React.SFC<LoginProps> = props => {
  return <Login {...props} />;
};

export default connect(null, (dispatch: any) => ({
  onSubmitLogin: (name: string) => dispatch(login(name))
}))(LoginContainer);
