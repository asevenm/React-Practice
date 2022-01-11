import React, { Component, PureComponent } from 'react';

class Show extends Component {
  render() {
    const { people } = this.props;
    return (
      <ul>
        {
          people.map(item => (
            <li>{item}</li>
          ))
        } 
      </ul>
    )
  }
}

export default class CheckRender extends PureComponent {
  state = {
    pepole: ['xiaoming']
  }

  addPerson = () => {
    let { pepole } = this.state;
    pepole.push('xiaohong');
    // this.setState({ pepole: [...pepole, 'xiaohaong'] });
    this.setState({ pepole }, () => {
      console.log(this.state.pepole)
    });
  }

  render() {
    console.log(this.state.pepole);
    return(
      <div>
        <button onClick={this.addPerson}>add person</button>
        <Show people={this.state.pepole}/>
      </div>
    )
  }
}