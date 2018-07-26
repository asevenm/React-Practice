import React, { PureComponent } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import AccountsList from '../components/newFeature/lifecycle/AccountsList';
import AutoFocusInput from '../components/newFeature/ref/AutoFocusInput';

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
						path={`${match.path}/ref`} 
						component={() => (<AutoFocusInput />)}
					/>
				</Switch>
			</div>
		);
	}
}