import React from 'react';

export default class UnsafeLifecyle extends React.Component {
    style = {
        fontSize: '20px',
        fontWeight: 'bold',
        display: 'block',
    }
    componentWillMount() {

    }

    componentWillReceiveProps() {

    }

    componentWillUpdate() {

    }

    render() {
        return (
            <div>
                <a style={this.style} target="_blank" href="https://www.youtube.com/watch?v=ZCuYPiUIONs">youtube</a>
                <a style={this.style} target="_blank" href="http://www.ayqy.net/blog/dive-into-react-fiber/">文章</a>
            </div>
        )
    }
}