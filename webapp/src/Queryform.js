import React, { Component } from 'react';
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
        var formData = new FormData()
        formData.set("q", queryText)
        axios({
            method : "post",
            url : "/api/fetch",
            data: formData
        }).then(function(response) {
            console.log("THis is the response")
            console.log(Object.keys(response))
            console.log(response.data)
            this.props.changeState(response.data);
            this.props.history.push("/results");
        }.bind(this)).catch(function(error){
            console.log(error)
            alert("There was an error while trying to reach the server");
            return false;
        })

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