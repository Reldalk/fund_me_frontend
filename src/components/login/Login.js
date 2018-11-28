import React from 'react';
import './Login.css';
import {reduxForm, Field} from 'redux-form';
import {withRouter, Link, Redirect} from 'react-router-dom';
import {authUser} from '../../actions/users';

export class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      feedback: ''
    };
  }

  onSubmit(e) {
    console.log(e.target.username.value);
    const user = {username: e.target.username.value, password: e.target.password.value};
    authUser(user, 'login').then( res => {
      if(res.status){
        this.setState({
          feedback : 'invalid username and password combination'
        })
      }
      else{
        this.props.history.push('/dashboard')
      }
    })
}

  username_change = (e) => {
    this.setState({username : e.target.value});
  }

  password_change = (e) => {
    this.setState({password : e.target.value})
  }

  handle_login = (e) => {
    e.preventDefault();
    return fetch('http://localhost:8080/api/login', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      body: JSON.stringify({username: this.state.username, password: this.state.password}), // body data type must match "Content-Type" header
  })
  .then(response => response.json()); // parses response to JSON
  }

  render(){
    return (
      <div className="full_page">
        <form className="login_center_box" onSubmit={(e)=>{
          e.preventDefault();
          this.onSubmit(e);
          }}>
          <p className ="sign_up_text_description">{this.state.feedback}</p>
          <Field name="usernemae" className="login_centered login_username_input login_input_boxes" id="username" 
          type="text" placeholder="Username" component="input"/>
          <Field name="password" className="login_centered login_password_input login_input_boxes" id="password" 
          type="password" placeholder="Password" component="input"/>
          <button disabled={this.props.pristine || this.props.submitting} className="login_centered login_login_button" >Sign in</button>
        </form>
        <Link to="/register">
          <button className="login_centered login_sign_up_button">Sign up</button>
        </Link>
      </div>
    );
  }
}

export default 
withRouter(
  reduxForm({
    form: 'contact'
  })(Login)
)
