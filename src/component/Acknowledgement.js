import React, {Component} from 'react';

class Forget extends Component {
Forget(){
alert("Forget Called")
console.warn("state", this.state)
}
render()
{
return(
    <div className="container">
        <div className="row">
            <div className=" col-lg-12">
                <center>
                    <img src = {process.env.PUBLIC_URL + '/logo.svg' } alt="Logo" className="logo" />
<div className="ack">
<p>Link to change password has been sent to provided email address <br/>kindly verify your mail id and proceed through the link
</p>
                    </div>


                </center>
            </div>
        </div>
    </div>
);
}
}
export default Forget;