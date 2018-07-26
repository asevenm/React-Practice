import React, { Component, Fragment } from "react";

// This is an example of an "uncontrolled" component.
// We call it this because the component manages its own "draft" state.
export default class UncontrolledEmailInput extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}
  // Default the "draft" email to the value passed in via props.
  state = {
    email: this.props.defaultEmail,
    prevPropsUserID: this.props.userID
  };

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.userID !== state.prevPropsUserID) {
      return {
        prevPropsUserID: props.userID,
        email: props.defaultEmail
      };
    }
    return null;
  }
  
  //before
  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.userID !== state.prevPropsUserID) {
  //     this.setState({
  //       prevPropsUserID: nextProps.userID,
  //       email: this.props.defaultEmail,
  //     });
  //   }
  // } 
	
	componentDidMount() {
		this.inputRef.current.focus();
	}

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
			<Fragment>
				<label>
						Email: <input onChange={this.handleChange} value={this.state.email} />
				</label>
				<label>
						password: <input type="password" ref={this.inputRef}/>
				</label>
			</Fragment>
    );
  }
}
