import React from 'react';
import Queryform from './Queryform'


const Home = function(props) {
    return (
        <div className = "home">
            <Queryform data = {props.data} changeState = {props.changeState}/>
        </div>
    )
}

export default Home;