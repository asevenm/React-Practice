import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { fetchTopics } from '../actions/Actions';
import Bundle from '../commons/LazyLoad/Bundle';

const TopicsLayout = (props) => (
    <Bundle load={()=>import('../components/Topics')}>
        {(TopicsLayout) => <TopicsLayout {...props}/>} 
    </Bundle>
)

const TopicDetail = (props) => (
    <Bundle load={()=>import('../components/TopicDetail')}>
        {(TopicDetail) => <TopicDetail {...props}/>} 
    </Bundle>
)

class Topics extends Component {
    componentDidMount() {
        this.props.fetchTopics();
    }
    render() {
        const { Topics, fetching, match } = this.props;
        return (
            <div>
                <Switch>
                    <Route path={`${match.path}`} exact render={(match)=>{
                        return !fetching 
                        ? <TopicsLayout topics={Topics} match={match}/>
                        : <div />
                    }}/>
                    <Route path={`${match.path}/:topicid`} render={({match})=>(
                        <TopicDetail {...Topics.get(match.params.topicid)} />
                    )}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Topics: state.get('TopicsReducer').get('Topics'),
        fetching: state.get('TopicsReducer').get('fetching')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTopics: (params) => {
            dispatch(fetchTopics(params))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Topics))