import React, { Component } from "react";
import Input from "./input";
// import { createForm } from "rc-form";
import { createForm } from "./my-rc-form";

@createForm
class MyRcForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  nameChange = (e) => {
    this.setState({ userName: e.target.value });
  };
  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  submit = () => {
    // const { userName, password } = this.state;
    const { getFieldValue, validateFields } = this.props.form;
    validateFields((err, state) => {
      if (!err) {
        console.log("submit success");
        console.log(
          "form value is ",
          getFieldValue("userName"),
          getFieldValue("password")
        );
      } else {
        console.log("failed", err);
      }
    });
  };
  render() {
    console.log(this.props);
    // stateform
    const { getFieldDecorator } = this.props.form;
    // const { userName, password } = this.state;
    return (
      <div>
        <h3>MyRcForm</h3>
        {getFieldDecorator("userName", { msg: "this is userName" })(
          <Input placeholder="name" />
        )}
        {getFieldDecorator("password", { msg: "password is required" })(
          <Input placeholder="password" />
        )}
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default MyRcForm;
