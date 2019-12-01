import React, { Component } from 'react';
import Select from 'react-select';

const parse = require('xml-parser')
class TopicAnalysis extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    state = {
        selectedOption: null
    }
    renderLDAGraph(lda_graph) {
        var element = document.getElementsByClassName("topic-analysis")[0];
        element.innerHTML = "";
        var obj = parse("<root>" + lda_graph + "</root>")
        var linkElement = obj.root.children[0]
        var divElement = linkElement.children[0]
        var  scripElement = linkElement.children[1]
        var divTag = document.createElement("div")
        divTag.id = divElement.attributes.id
        divTag.style = "width:50%"
        element.appendChild(divTag)
        var scriptTag = document.createElement("script")
        scriptTag.type = scripElement.attributes.type
        scriptTag.async = true;
        scriptTag.innerHTML = scripElement.content
        element.appendChild(scriptTag)

        var ldaElement = document.getElementById(divElement.attributes.id)
        console.log(ldaElement)
    }
    getOptions() {
        var options = []
        for (var country in this.props.data.lda_graphs) {
            options.push({value : country, label: country})
        }
        return options
    }
    componentDidMount() {
        if(this.props.data.lda_graphs != undefined) {
            var countries = []
            for (var country in this.props.data.lda_graphs) {
                countries.push(country)
            }
            this.renderLDAGraph(this.props.data.lda_graphs[countries[0]])
        }
    }
    handleChange(e) {
        this.setState({selectedOption: e.value})
        this.renderLDAGraph(this.props.data.lda_graphs[e.value])
    }

    getDefaultSelectValue() {
        var options = this.getOptions()
        console.log(options)
        // this.setState({selectedOption : options[0].value})
    }
    render() {
        if(this.props.data.tweets.length > 0) {
            this.getDefaultSelectValue()
            const { selectedOption } = this.state;
            return (<div className = "topic-analysis-parent">
                    <Select placeholder = "Select Country" options = {this.getOptions()} onChange = {this.handleChange}/>
                    <div className = "topic-analysis"> </div>

            </div>)
        } else {
            return (
                <div className = "topic-analysis-parent">
                        <h3>Nothing to display </h3>
                </div>
            )
        }
    }
}
export default TopicAnalysis;