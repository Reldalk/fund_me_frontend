import React, {Component} from 'react';
import './Suggest_query.css';
import {authUser} from '../../actions/users';
import {reduxForm} from 'redux-form';
import {withRouter} from 'react-router-dom';

export class Suggest_query extends Component{
  constructor(props) {
    super(props);
    this.state = {
      feedback: ''
    };
  }

  onSubmit(e) {
    console.log(e.target.username.value);
    const user = {username: e.target.username.value, password: e.target.password.value};
    authUser(user, 'user').then( res => {
      if(res.status){
        this.setState({
          feedback : res.message
        })
      }
      else{
        this.props.history.push('/')
      }
    })
}

render(){
  console.log("testing")
  return (
    <div className = "full_page">
        <form className="signup_center_box" onSubmit={(e)=>{
          e.preventDefault();
          this.onSubmit(e);
          }}>
        <p className ="sign_up_text_description">{this.state.feedback}</p>
        <input name="firstName" className="sign_up_centered sign_up_first_name_input sign_up_input_boxes" type="text" placeholder="First Name" id="firstName" component="Input"></input>
        <input name="lastName" className="sign_up_centered sign_up_last_name_input sign_up_input_boxes" type="text" placeholder="Last Name" id="lastName"  component="Input"></input>
        <input name="username" className="sign_up_centered sign_up_username_input sign_up_input_boxes" type="text" placeholder='Username' id="username"  component="Input"></input>
        <input name="password" className="sign_up_centered sign_up_password_input sign_up_input_boxes" type="password" placeholder='Password' id="password"  component="Input"></input>
        <button type="submit" className="sign_up_centered sign_up_submit_button">Submit</button>
      </form>
    </div>
  );
}};

export default 
withRouter(
  reduxForm({
    form: 'contact'
  })(Suggest_query)
)
