import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Store from '../store/Store';
import Home from '../components/Home';
import Topics from '../containers/Topics';

const history = createBrowserHistory();
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