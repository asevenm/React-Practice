import React from 'react';
import { connect } from 'react-redux';
import { fetchTopics } from '../../../actions/Actions';

class ExampleComponent extends React.Component {
  listRef = null;

  state = {
    externalData: null,
  };

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   // Are we adding new items to the list?
  //   // Capture the scroll position so we can adjust scroll later.
  //   if (prevProps.id < this.props.id) {
  //     return (
  //       this.listRef.scrollHeight - this.listRef.scrollTop
  //     );
  //   }
  //   return null;
  // }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        externalData: null,
        prevId: props.id,
      };
    }

    // No state update necessary
    return null;
  }

  componentDidMount() {
    this._loadAsyncData(this.props.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('this is snapshot:', snapshot);
    if (this.state.externalData === null) {
      this._loadAsyncData(this.props.id);
    }
    if (snapshot !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight - snapshot;
    }
  }

  // componentDidUpdate(prevProps) {
  //   if(prevProps.id !== this.props.id) {
  //     this._loadAsyncData(this.props.id);
  //   }
  // }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
      return (
        <div ref={this.setListRef}>------------------------------------------------loading---------------------------------------------------</div>
      )
    } else {
      // Render real UI ...
    }
  }
  setListRef = ref => {
    this.listRef = ref;
  };

  _loadAsyncData(id) {
    this.props.fetchTopics();
    
    // this._asyncRequest = () => {
    //   // your ajax code here
    // }
    // this._asyncRequest = asyncLoadData(id).then(
    //   externalData => {
    //     this._asyncRequest = null;
    //     this.setState({externalData});
    //   }
    // );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTopics: (params) => {
            dispatch(fetchTopics(params))
        }
    }
};

export default connect(null, mapDispatchToProps)(ExampleComponent)