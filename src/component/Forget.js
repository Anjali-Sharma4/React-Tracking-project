import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram, faGoogle} from '@fortawesome/free-brands-svg-icons';
import LoginService from '../service/PostData'
import {Redirect, Route, Switch} from 'react-router-dom'
const forgetService = new LoginService();
class Forget extends Component {
   constructor(props){
   super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
  redirect:false
   }
      handleCreate(){
        forgetService.forget(
          {
            "email": this.refs.email.value,
        }
        )
        .then((result)=>{
       window.location.href="/Acknowledgement"
        })
        .catch(()=>{
          alert('please enter correct Email Id');
        });
      }
       handleSubmit(event) {
        const { match: { params } } = this.props;
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
                       <h4 className="forgetpwd">Forgot Your Password? Please Enter Your Email Id</h4>
                       <div className="form-group ">
                       <input className="form-control" type="text" placeholder="Enter Email" ref='email' />
                       </div>
                        <input className="btn btn-primary" type="submit" value="Submit" />
                      </form>
                  </div>
            </div>
         </div>
        );
      }
}
export default Forget;