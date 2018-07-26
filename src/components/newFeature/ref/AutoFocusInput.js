import React, { Fragment } from 'react';
import CustomTextInput from  './CustomText';

const FancyButton = React.forwardRef((props, ref) => (
	<button ref={ref}>{props.children}</button>
));

const ref = React.createRef();
console.log('ref:', ref);
export default class AutoFocusTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.textInput = React.createRef();
	}
  
	componentDidMount() {
		console.log('parent:', this.textInput);
		this.textInput.current.focusTextInput();
	}
  
	render() {
		return (
			<Fragment>
				<CustomTextInput ref={this.textInput} />
				<FancyButton ref={ref}>Click me</FancyButton>
			</Fragment>
		);
	}
}
  