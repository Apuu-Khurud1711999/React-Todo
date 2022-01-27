import React, { Component } from 'react';
import Navs from './Navs';
import Footer from './Footer'
import ReactDOM from 'react-dom';

export class Dashboard extends Component {
    constructor(props){
       super(props);
    }
    render() {
        return (
            <>
                <Navs/>
               <h1 style={{textAlign:"center"}}>Welcome to our Todo App {JSON.parse(localStorage.getItem("credArr")).fName}</h1>
                <Footer />

            </>
        )
    }
}

export default Dashboard;
