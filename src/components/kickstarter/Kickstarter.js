import React from 'react';
import Select from 'react-select'
import {kickstarter, indiegogo, compare} from './data/categories'
import {setCategory} from './data/dataCategories'
import './Kickstarter.css'
import {fetch_database} from '../../actions/fetch_database'
import {Link} from 'react-router-dom';
import {clearAuthToken, loadAuthToken} from '../../local-storage'
import * as d3 from 'd3-format'

import {
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  Hint,
  FlexibleXYPlot,
} from 'react-vis';

export default class Kickstarter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      database_value : "",
      number_value : 10,
      data : [{x: 0, y: 0}],
      category_value: '',
      options: [],
      data_value: 'backers_count',
      hoveredCell: false
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

  handleCategoryChange = (category_value) => {
    console.log('outside if');
    this.setState({ category_value });
    if(this.state.database_value !== ""){
      console.log('this is A TEST ' + category_value.value)
      fetch_database(this.state.database_value, category_value.value, this.state.data_value)
      .then( res => {
        this.setState({
          data : res
        })
      })
    }
  }

  handleChange(database_value){
    this.setState(
      {database_value}
    )
    this.setState({
      category_value : ''
    })
    if(database_value !== '')
    {
      if(database_value === 'Kickstarter'){
        this.setState({
          options : kickstarter
        })
      }
      else if(database_value === 'Indiegogo')
      {
        this.setState({
          options : indiegogo
        })
      }
      this.setState({
        data_value : setCategory(database_value)[0].value
      })
        fetch_database(database_value, "", setCategory(database_value)[0].value)
        .then( res => {
          this.setState({
            data : res
          })
        })
    }
  }

  handleDataChange(data_value){
    this.setState(
      {data_value}
    )
    if(this.state.database_value !== ""){
      fetch_database(this.state.database_value, this.state.category_value.value || "", data_value)
      .then(res => {
        this.setState({
          data : res
        })
      })
    }
  }

  handle_number_change(value){
    this.setState({
      number_value : value
    })
  }

  single_bar_graph(){
    const tipStyle = {
      display: 'flex',
      color: 'white',
      background: '#000',
      alignItems: 'center',
      padding: '5px'
    };
    const dict_names = {
      'backers_count' : 'Total Backers: ',
      'goal' : 'Project Goal: $',
      'usd_pledged' : 'Total USD Pledged: $'
    }   
    const {hoveredCell } = this.state;
    const {useCanvas} = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    const array = this.state.data.slice(0, this.state.number_value);
    return (
      <div className="graph_container">
        <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css"></link>
          <FlexibleXYPlot margin={{left:45}}  className="testing" xType="ordinal">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis style={{ticks: {stroke: 'white', fontSize: '12px'}}}/>
          <YAxis tickFormat={tick => d3.format('.2s')(tick)} style={{ticks: {stroke: "white", fontSize: '12px'}}}/>
          <BarSeries data={array}
            onValueMouseOver={ v => {
              this.setState({hoveredCell: v});
            }}
            onTouchStart={ v => {
              console.log('test');
              this.setState({hoveredCell: v});
            }}
            onTouchEnd={v => this.setState({hoveredCell: false})}
            onValueMouseOut={v => this.setState({hoveredCell: false})}
            onValueClick={(datapoint, event)=>{
              window.open(datapoint.url, '_blank')
            }}/>
          {hoveredCell && (
            <Hint value={hoveredCell}>
              <div style={tipStyle}>
                {hoveredCell.name}
                <br/>
                {dict_names[this.state.data_value]}{hoveredCell.y}
              </div>
            </Hint>
          )}
        </FlexibleXYPlot> 
      </div>
    )
  }

  render() 
  { 
    const { category_value} = this.state;
    const data_categories_select = setCategory(this.state.database_value);
    return (
      <div className="full_page_sky">
      <div className="logout_box">
        <Link to='/'>
          <button onClick={clearAuthToken} className="logout">Logout</button>
        </Link>
      </div>
        <form className="login_center_box_kick">
          <div className="container">
            <table cellPadding="0" className="table">
              <tbody>
                <tr className="row">
                  <td className="labelData">
                    <label className="label">Database</label>
                  </td>
                  <td>
                  <select className = "input_boxes" value={this.state.database_value} onChange={e => this.handleChange(e.target.value)}>
                    <option value="">Select your database</option>
                    <option value="Kickstarter">Kickstarter</option>
                    <option value="Indiegogo">Indiegogo</option>
                    {/*<option value="Compare">Compare Them</option>*/}
                  </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label">Category</label>
                  </td>
                  <td>
                    <select className="input_boxes" onChange={e => this.handleDataChange(e.target.value)}>
                    {
                      data_categories_select.map(function(category) {
                        return <option key={category._id}
                          value={category.value}>{category.name}</option>;
                      })
                    }
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label"># entries</label>
                  </td>
                  <td>
                    <input className="input_boxes" type="number" min="0" max="15" value={this.state.number_value} onChange = {e => this.handle_number_change(e.target.value)}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                  <label className="label">Category</label>
                  </td>
                  <td>
                  <Select
                    className="special_box"
                    value={category_value}
                    onChange={this.handleCategoryChange}
                    options={this.state.options}
                    placeholder="Select your Category"
                  />
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            {this.single_bar_graph()}
        <div className="center_bottom">
        <Link className = "Link"to="/suggest_query">Click here to suggest a new Query!</Link>
        </div>
        </form>
      </div>
  );
  }
}