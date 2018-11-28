import React from 'react';
import './Main.css';
export default class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      page: 'button',
      repos: []
    };
  }

  handleClick() {
    fetch("http://localhost:8080/kickstarter/")
      .then(res => res.json()
      )
      .then(repos => {
        this.setState({ repos });
      })
      .then(() => {
        this.setState({page: 'get'});
      });
  }

  render() {
    const { repos } = this.state;
    if(this.state.page === 'button'){
      return (
        <div className="App">
          <h1>Github Repos</h1>
          <button onClick={e => this.handleClick(e)}>Get Repos!</button>
        </div>
      );
    }
    else if(this.state.page === 'get'){
      return (
        <div className="App">
          <h1>Github Repos</h1>
          <button onClick={e => this.handleClick(e)}>Get Repos!</button>
          <ul>
            {
              repos.kickstarters.map(repo => (
              <li>{repo.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}