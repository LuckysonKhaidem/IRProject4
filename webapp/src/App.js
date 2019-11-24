import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Queryform from './Queryform'
import Navbar from './navbar'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home'
import TweetResults from './TweetResults'
import Sentiment from './Sentiment'
import 'react-table-filter/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component  {
  state = {
    tweets : [],
    sentiment_plot : undefined,
  }
  changeState = (data) => {
    console.log(data)
    this.setState({
      tweets : data["result"]["response"]["docs"],
      sentiment_plot: data["sentiment_plot"]
    })
  }

  render() {
    return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Route exact path = "/"  component = {() => <Home {...this.props} data = {this.state} changeState = {this.changeState}/>}/>
      <Route path = "/results" component = {() => <TweetResults {...this.props} data = {this.state}/>}  />
      <Route path = "/sentiments" component = {() => <Sentiment {...this.props} data = {this.state}/>}  />
    </div>
    </BrowserRouter>
  )
}
}

export default App;
