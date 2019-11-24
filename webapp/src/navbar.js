import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

class Navbar extends Component {
    render() { 
        return (
            <nav className = "nav-wrapper red darken-3">
                <div className = "container">
                    <ul className = "left">
                        <li><Link to = "/">Home</Link></li>
                        <li><NavLink to = "/results">Tweet Results</NavLink></li>
                        <li><NavLink to= "/sentiments">Sentiment Analysis</NavLink></li>
                        <li><NavLink to= "/topics">Topic Analysis</NavLink> </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);