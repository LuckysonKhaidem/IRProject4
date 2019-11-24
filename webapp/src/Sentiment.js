import React , { Component } from 'react';

const parse = require("xml-parser")
class Sentiment extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        var element = document.getElementsByClassName("sentiment-analysis")[0];
        if(this.props.data.sentiment_plot != undefined) {
            var obj = parse("<root>" + this.props.data.sentiment_plot + "</root>")
            var div = document.createElement("div")
            var scriptCode= obj.root.children[2].content;
            scriptCode = scriptCode.replace('"tickvalues": [0.0, 1.0, 2.0]','"tickvalues": ["Neutral","Positive","Negative"]' )
            div.setAttribute("id",obj.root.children[1].attributes.id)
            element.appendChild(div)
            var script = document.createElement("script")
            script.type = "text/javascript"
            script.async = true
            script.innerHTML = scriptCode
            element.appendChild(script)
        }
        else {
            element.innerHTML = "<h3>Nothing to display</h3>"
        }
    }
    render() {
        return(
            <div className = "sentiment-analysis">
                </div>
        )
    }
}

export default Sentiment;