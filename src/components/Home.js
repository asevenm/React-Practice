import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    static Tabs = [
       {
           name: 'React'
       },
       {
           name: 'React Native'
       },
       {
           name: 'React Router'
       },
       {
           name: 'Immutable'
       },
       {
           name: 'Redux'
       },
       {
           name: 'webpack'
       },
       {
           name: 'demo'
       }
    ]
    render() {
        let els = Home.Tabs.map((item,index) => {
            return (
                <li key={'item' + index}>
                    <Link to='/topics'>{item.name}</Link> 
                </li>
            )
        })
        return (
            <nav>
                <ul className='nav'>{els}</ul> 
            </nav>
        ) 
    }
}