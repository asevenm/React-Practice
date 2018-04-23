import React, { Component, Fragment } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    static Tabs = [
       {
           name: 'React',
           link: 'topics'
       },
       {
           name: 'React Native',
           link: 'test'
       },
       {
           name: 'React Router',
           link: 'topics'
       },
       {
           name: 'Immutable',
           link: 'topics'
       },
       {
           name: 'Redux',
           link: 'topics'
       },
       {
           name: 'webpack',
           link: 'topics'
       },
       {
           name: 'demo',
           link: 'topics'
       }
    ]
    render() {
        let els = Home.Tabs.map((item,index) => {
            return (
                <li key={'item' + index}>
                    <Link to={`/${item.link}`}>{item.name}</Link> 
                </li>
            )
        })
        return (
            <Fragment>
                <nav>
                    <ul className='nav'>{els}</ul> 
                </nav>
                <div>just a test</div>
            </Fragment>
        ) 
    }
}