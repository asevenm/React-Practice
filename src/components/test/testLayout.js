import React, { Component } from 'react';
import TestItem from './testItem';

export default class testLayout extends Component {
    constructor(props) {
        super(props);
        this.peopleSet = this.createDataSet();
    } 
  
    componentDidMount() {

    }

    createDataSet() {
        const peopleSet = new Set(this.props.people);
        return peopleSet;
    }

    render() {
        const { people } = this.props;
        return people.map((person, index) => {
            return this.props.children({
                testItem: props => <TestItem {...props}/>,
                person
            })
        })
    }
}
