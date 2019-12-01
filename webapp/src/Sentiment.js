import React , { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
import data from './data';

const parse = require("xml-parser")
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Sentiment extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        var element = document.getElementsByClassName("sentiment-analysis")[0];
    }

    getTopWordsDataPoints() {
        var dataPoints = []
        for(var i = 0 ; i < this.props.data.top_word_graph.length;i++) {
            dataPoints.push({label : this.props.data.top_word_graph[i][0], y : this.props.data.top_word_graph[i][1] })
        }

        return dataPoints;
    }
    render() {
        var output = undefined
        if(this.props.data.sentiment_plot != undefined) {
            const sentimentOptions = {
                title : {
                    text : "Sentiment Analysis on Replies"
                },
                data : [
                    {
                        type :  "column",
                        dataPoints : [
                            {label : "Neutral", y : this.props.data.sentiment_plot["Neutral"]},
                            {label : "Positive", y : this.props.data.sentiment_plot["Positive"]},
                            {label : "Negative", y : this.props.data.sentiment_plot["Negative"]}
                        ] 
                    }
                ]
            }
            
            const topWordOptions = {
                title : {
                    text : "Top Ten Words"
                },
                data : [
                    {
                        type : "column",
                        dataPoints : this.getTopWordsDataPoints()
                    }
                ]
            }
            
            output = [<CanvasJSChart options = {sentimentOptions}/>,
            <CanvasJSChart options = {topWordOptions}/> ]
        }
        else {
            output = (<h3>Nothing to display</h3>)
        }
        return (
            <div className = "sentiment-analysis">
                <div className = "container" style = {{marginTop:5 + "%"}}>
                    {output}
                </div>
             </div>
        )
    }
}

export default Sentiment;