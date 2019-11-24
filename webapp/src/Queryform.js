import React, { Component } from 'react';
import data from './data'
import { withRouter } from 'react-router-dom';
const axios = require("axios")

class Queryform extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault()
        var queryInput = document.getElementById("q");
        var queryText = queryInput.value;
        if(queryText === "" || queryText === undefined) {
            alert("Query is empty")
            return false;
        }  
      this.props.changeState(data)
      this.props.history.push("/results")
    }
    render() {
        return (
        <div className = "container">
        <div className = "input-field col s12">
            <input type = "text" id = "q" placeholder = "Please enter a keyword"/>
            
        </div>
        <button className="btn waves-effect waves-light" type="submit" onClick = {this.handleClick} name="action">Submit
            </button>
        </div>)
    }
}

export default withRouter(Queryform);