import React, { PureComponent } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import AccountsList from '../components/newFeature/lifecycle/AccountsList';
import AutoFocusInput from '../components/newFeature/ref/AutoFocusInput';
import UnsafeLifecyle from '../components/newFeature/unsafeLifecyle/UnsafeLifecyle';
import ErrorBundary from '../components/newFeature/errorBoundary';
import ContextDemo from '../components/newFeature/context';
import Portals from '../components/newFeature/portal';

const fakeAccounts = [
	{
		id: 1,
		name: "One",
		email: "fake.email@example.com"
	},
	{
		id: 2,
		name: "Two",
		email: "fake.email@example.com"
	}
];

export default class NewFeature extends PureComponent {
	static tabs = [
		{
			name: 'new lifecycle',
			link: '/newFeature/lifecycle',
		}, {
			name: 'unsafe lifecycle',
			link: '/newFeature/unsafe',
		}, {
			name: 'error bundary',
			link: '/newFeature/errorBundary',
		}, {
			name: 'context',
			link: '/newFeature/context',
		}, {
			name: 'portal',
			link: '/newFeature/portal',
		}, {
			name: 'ref',
			link: '/newFeature/ref',
		},
	]
	render() {
		const { match } = this.props;
		const els = NewFeature.tabs.map((tab) => (
			<li key={tab.link}>
				<Link to={tab.link}>{tab.name}</Link>	
			</li>
		))
		return (
			<div>
				<ul>{els}</ul>
				<Switch>
					<Route 
						path={`${match.path}/lifecycle`} 
						component={() => (<AccountsList accounts={fakeAccounts}/>)}
					/>
					<Route 
						path={`${match.path}/unsafe`} 
						component={() => (<UnsafeLifecyle />)}
					/>
					<Route 
						path={`${match.path}/errorBundary`} 
						component={() => (<ErrorBundary />)}
					/>
					<Route 
						path={`${match.path}/context`} 
						component={() => (<ContextDemo />)}
					/>
					<Route 
						path={`${match.path}/portal`} 
						component={() => (<Portals />)}
					/>
					<Route 
						path={`${match.path}/ref`} 
						component={() => (<AutoFocusInput />)}
					/>
				</Switch>
			</div>
		);
	}
}