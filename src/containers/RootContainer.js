import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Store from '../store/Store';
import Bundle from '../commons/LazyLoad/Bundle';
import SimpleCounter from './SimpleCounter';
import HooksContainer from './hooks/HooksContainer';
import SuspenseContainer from './suspense/SuspenseContainer';

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

const Test = (props) => (
    <Bundle load={() => import('../components/test/test')}>
        {Test => <Test {...props}/>}
    </Bundle>
)

const Table = (props) => (
  <Bundle load={() => import('../components/table/table')}>
    {Table => <Table {...props}/>}
  </Bundle>
)

const NewFeature = (props) => (
    <Bundle load={() => import('./NewFeature')}>
        {NewFeature => <NewFeature {...props}/>} 
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
                        <Route path='/test' component={Test}/>
                        <Route path='/table' component={Table}/>
                        <Route path='/newFeature' component={NewFeature} />
                        <Route path='/simple-counter' component={SimpleCounter} />
                        <Route path='/hooks' component={HooksContainer} />
                        <Route path='/suspense' component={SuspenseContainer} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}
