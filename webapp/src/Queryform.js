import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const axios = require("axios")

class Queryform extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        var loader = document.getElementById("loader");
        loader.style.display = "none";
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
        document.getElementById("loader").style.display = "block";
        document.getElementById("submit_btn").disabled = true;

        axios({
            method : "post",
            url : "/api/fetch",
            data: formData
        }).then(function(response) {
            document.getElementById("loader").style.display = "none";
            document.getElementById("submit_btn").disabled = false;
            this.props.changeState(response.data);
            this.props.history.push("/results");
        }.bind(this)).catch(function(error){
            console.log(error)
            alert("There was an error while trying to reach the server");
            document.getElementById("loader").style.display = "none";
            document.getElementById("submit_btn").disabled = false;
            return false;
        })

    }
    render() {
        return (
        <div className = "container">
        <div className = "input-field col s12">
            <input type = "text" id = "q" placeholder = "Please enter a keyword"/>
        
        </div>
        <button className="btn waves-effect waves-light" id = "submit_btn" type="submit" onClick = {this.handleClick} name="action">Submit
            </button>
            <div id = "loader">
                <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
            </div>
        </div>)
    }
}

export default withRouter(Queryform);