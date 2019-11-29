import React, { Component } from 'react';

const parse = require('xml-parser')
class TopicAnalysis extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var element = document.getElementsByClassName("topic-analysis")[0];
        if(this.props.data.lda_graph != undefined) {
          var obj = parse("<root>" + this.props.data.lda_graph + "</root>")
          console.log(obj)
          var linkElement = obj.root.children[0]
          var divElement = linkElement.children[0]
          var  scripElement = linkElement.children[1]
          var divTag = document.createElement("div")
          divTag.id = divElement.attributes.id
          divTag.style = "width:50%"
          console.log(divTag)
          element.appendChild(divTag)
          var scriptTag = document.createElement("script")
          scriptTag.type = scripElement.attributes.type
          scriptTag.async = true;
          scriptTag.innerHTML = scripElement.content
          element.appendChild(scriptTag)
        }
    }

    render() {
        console.log(this.props.data)
        if(this.props.data.tweets.length > 0) {
            return (<div className = "topic-analysis">
            </div>)
        } else {
            return (
                <div className = "topic-analysis">
                    <h3>Nothing to display </h3>
                </div>
            )
        }
    }
}
export default TopicAnalysis;