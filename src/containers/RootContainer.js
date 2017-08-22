import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Store from '../store/Store';
import Bundle from '../commons/LazyLoad/Bundle';

const history = createBrowserHistory();

const Home = (props) => (
    <Bundle load={()=>import('../components/Home')}>
        {(Home)=><Home />} 
    </Bundle>
)

const Topics = (props) => (
    <Bundle load={()=>import('../containers/Topics')}>
        {(Topics)=><Topics {...props}/>}
    </Bundle>
)

export default class RootContainer extends Component {
    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/topics' component={Topics}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}