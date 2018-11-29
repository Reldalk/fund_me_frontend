import React from 'react';
import Login from '../login/Login'
//import Main from '../main/Main'
import Signup from '../sign_up/Sign_up'
import Dashboard from '../kickstarter/Kickstarter'
import SuggestQuery from '../suggest_query/Suggest_query'
import {Route} from 'react-router-dom';
import {loadAuthToken} from '../../local-storage'

export default class App extends React.Component{
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />

        <Route exact path="/dashboard"
         render={(props) => <Dashboard {...props} isAuthed={loadAuthToken()} />}/>

        <Route exact path="/register" component={Signup} />

        <Route exact path="/suggest_query"
        render={(props) => <SuggestQuery isAuthed={loadAuthToken()} />}/>
      </div>
  );
  }
}
