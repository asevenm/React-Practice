import React, { Component } from 'react';
import TestLayout from './testLayout';

export default class Test extends Component {
    state = {
        people: []
    };

    componentDidMount() {
        this.createData();
    }

    createData() {
        let people = [];
        for(let i = 0; i < 20; i ++) {
            people.push({ name: '大内密探零零' + i, id: i })
        }
        this.setState({ people })
    }
    render() {
        return (
            <div>
                <TestLayout people={this.state.people}>
                    {
                        person => (
                            <person.testItem name={person.person.name} key={person.person.id} />
                        )
                    } 
                </TestLayout>
            </div>
        )
    }
}