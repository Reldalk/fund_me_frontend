import React, {Component} from 'react';
import './Suggest_query.css';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {submitQuery} from '../../actions/submit_query';
import {withRouter} from 'react-router-dom';
import {loadAuthToken, clearAuthToken} from '../../local-storage'

export class Suggest_query extends Component{
  constructor(props) {
    super(props);
    this.state = {
      feedback: 'Submit your query',
      isAuthed: false
    };
  }

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth() {
    console.log(loadAuthToken);
    if (!loadAuthToken()) {
      this.props.history.push('/')
    }
  }

  onSubmit(e) {
    const query_info = {title: e.target.title_text.value, description: e.target.description_text.value};
    console.log(query_info)
    submitQuery(query_info).then( res => {
      console.log(res);
      if(res.status){
        this.setState({
          feedback : res.message
        })
      }
      else{
        this.setState({
          feedback: 'query submission successful'
        })
      }
    })
  }

  go_to_previous_page(){
    this.props.history.push('/dashboard')
  }

render(){
  console.log("testing")
  return (
    <div className="full_page_sky">
      <Link to='/'>
        <button onClick={clearAuthToken} className="logout">Logout</button>
      </Link>
        <form className="query_center_box" onSubmit={(e)=>{
          e.preventDefault();
          this.onSubmit(e);
          }}>
          <p className="feedback_center">{this.state.feedback}</p>
        <div className="top_elements">
          <label className="query_label_one">Query title (What is it?)</label>
          <input type="text" name="title_text" className="title_text"></input>
        </div>
        <div className="bottom_elements">
          <label className="query_block">Query Description (What's it do?)</label>
          <textarea hint="text" name="description_text" className="description_box"></textarea>
        </div>
        <button type="submit" className="Submit_button">Submit</button>
        <Link to="/dashboard">
          <button className="back_button">Back</button>
        </Link>
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
