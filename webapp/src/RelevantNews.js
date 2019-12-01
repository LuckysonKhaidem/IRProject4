import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class RelevantNews extends Component {
    constructor(props) {
        super(props)
    }

    generateNewsCards() {
        var newsCards = []
        for(var i = 0 ; i < this.props.data.news.length;i++) {
            newsCards.push(
                <div className="col s12 m7">
                    <h2 className="header">{this.props.data.news[i].title}</h2>
                    <div className="card horizontal">
                    <div className="card-image">
                        <img src={this.props.data.news[i].imageUrl}/>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                        <p>{this.props.data.news[i].summary}</p>
                        </div>
                        <div className="card-action">
                        <a href= {this.props.data.news[i].url} target= "_blank">Original Article</a>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
        console.log(newsCards)
        return newsCards;
    }
    render() {
        if(this.props.data.news.length > 0) {

            return (
                <div className = "relevant-news container">
                   {this.generateNewsCards()}
                </div>
            )

        }
        else {
            return (
                <div className = "relevant-news">
                    <h3>Nothing to display</h3>
                </div>
            )
        }
    }
}
export default withRouter(RelevantNews)