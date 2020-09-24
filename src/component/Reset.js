
import React, { Component } from "react";
import { render } from "react-dom";
class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      c_password: "",
    };
    this.submitData = this.submitData.bind(this);
  }
  inputPassword = event => {
    this.setState({ password: event.target.value });
  };
  confirmPassword = event => {
    this.setState({ c_password: event.target.value });
  };
  submitData(event) {
    event.preventDefault();
    const { password, c_password } = this.state;
    const matches = password === c_password;
    matches ? window.location.href="/" : alert("NO MATCH");
  }
  render() {
    return (
      <div>
        <center><img src = {process.env.PUBLIC_URL + '/logo.svg' } alt="Logo" className="logo" /><br/></center>
            <h4 className="forgetpwd">Recovery Email ptripathi@gmail.com</h4>
        <form onSubmit={this.submitData}>



                    <div className="form-group">
                       <input type="password" className="form-control"  name="password" placeholder="Enter password" onChange={this.inputPassword} />
                    </div>
                    <div className="form-group">
                       <input type="password"  name="c_password" className="form-control" placeholder="Confirm password"  onChange={this.confirmPassword} />
                    </div>
                    <button className="btn btn-primary" type="submit">Send</button>


        </form>
      </div>
    );
  }
}
export default Reset;