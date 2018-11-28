import React from 'react';
import Login from '../login/Login'
//import Main from '../main/Main'
import Signup from '../sign_up/Sign_up'
import Dashboard from '../kickstarter/Kickstarter'
import SuggestQuery from '../suggest_query/Suggest_query'
import {Route} from 'react-router-dom';



const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Login />
  },
  {
    path: '/register',
    exact: true,
    component: () => <Signup />
  },
  {
    path: '/dashboard',
    exact: true,
    component: () => <Dashboard />
  },
  {
    path: '/suggest_query',
    exact: true,
    component: () => <SuggestQuery />
  }
]

export default class App extends React.Component{
  render() {
    return (
      <div>
        {
         routes.map((route,index) => (
         <Route 
           key={index}
           path={route.path}
           exact={route.exact}
          component={route.component}
         />
        ))
       }
      </div>
  );
  }
}
