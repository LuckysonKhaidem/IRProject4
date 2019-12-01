import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Queryform from './Queryform'
import Navbar from './navbar'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home'
import TweetResults from './TweetResults'
import Sentiment from './Sentiment'
import TopicAnalysis from './TopicAnalysis'
import 'react-table-filter/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RelevantNews from './RelevantNews'

class App extends Component  {
  state = {
    tweets : [],
    sentiment_plot : undefined,
    lda_graphs: undefined,
    top_word_graph: undefined,
    poi_volume : undefined,
    reply_volume: undefined,
    news: []
  }
  changeState = (data) => {
    console.log(data)
    this.setState({
      tweets : data["result"]["response"]["docs"],
      sentiment_plot: data["sentiment_plot"],
      lda_graphs : data["lda_graphs"],
      top_word_graph : data["top10_plot"],
      poi_volume : data["poi_volume"],
      reply_volume: data["reply_volume"],
      news: data["news_result"]["response"]["docs"]
    })
  }

  render() {
    return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Route exact path = "/"  component = {() => <Home {...this.props} data = {this.state} changeState = {this.changeState}/>}/>
      <Route path = "/results" component = {() => <TweetResults {...this.props} data = {this.state}/>}  />
      <Route path = "/statistics" component = {() => <Sentiment {...this.props} data = {this.state}/>}  />
      <Route path = "/topics" component = {() => <TopicAnalysis {...this.props} data = {this.state}/>} />
      <Route path = "/news" component = {() => <RelevantNews {...this.props} data = {this.state}/>} />
    </div>
    </BrowserRouter>
  )
}
}

export default App;
