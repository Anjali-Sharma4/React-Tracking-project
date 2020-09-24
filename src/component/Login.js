import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram, faGoogle} from '@fortawesome/free-brands-svg-icons';
import LoginService from '../service/PostData'
import {Redirect} from 'react-router-dom'
const loginService = new LoginService();
class Login extends Component {
   constructor(props){
   super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
  /* redirect:false*/
   }
      handleCreate(){
        loginService.login(
          {
            "username": this.refs.username.value,
            "password": this.refs.password.value,
        }
        )
        .then((result)=>{
         window.location.href="/Hello"
        })
        .catch(()=>{
          alert('please enter correct username and password');
        });
      }
       handleSubmit(event) {
        const { match: { params } } = this.props;
        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }
        event.preventDefault();
      }
 render() {
        return (
        <div>
            <div>
                 <center><img src = {process.env.PUBLIC_URL + '/logo.svg' } alt="Logo" className="logo" /><br/></center>
                 <div>
                      <form onSubmit={this.handleSubmit}>

                       <div className="form-group ">
                       <input className="form-control" type="text" placeholder="Enter Email" ref='username' />
                       </div>

                       <div className="form-group">
                       <input type="password" className="form-control" placeholder="Enter Password" ref='password'/>
                       </div>
                        <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                         </div>
                    </div>


                        <input className="btn btn-primary" type="submit" value="Submit" />

                            <p className="forgot-password text-right"><a href="/forget"> Forgot password?</a>
                    </p>
                        <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-5 col-5 line"></div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2"><h5 className="or1"> or</h5></div>
                <div className="col-lg-5 col-md-5 col-sm-5 col-5 line"></div>
            </div>
            <div className="row social">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4"><a href="https://www.google.com"><FontAwesomeIcon icon={faGoogle} size='2x'/></a></div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4"><a href="https://www.instagram.com/accounts/login"><FontAwesomeIcon icon={faInstagram} size='2x'/></a></div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4"><a href="https://www.facebook.com/login.php"><FontAwesomeIcon icon={faFacebook} size='2x'/></a></div>
            </div>

                      </form>
                  </div>
            </div>
         </div>
        );
      }
}
export default Login;
