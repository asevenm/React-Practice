import React, { PureComponent, Suspense, lazy } from 'react';
import { withRouter } from 'react-router-dom';
import { unstable_createResource } from 'react-cache';

const Topics = lazy(() => import('../../components/Topics'));


class SuspenseContainer extends PureComponent {
  state = {
    topics: [],
  }
  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = async (page = 1, limit = 10) => {
    const res = await fetch(`https://cnodejs.org/api/v1/topics?page=${page}&limit=${limit}`);
    const resJson = await res.json();
    this.setState({ topics: resJson.data });
  }

  render() {
    console.log(this.props);
    const { topics } = this.state;
    const { match } = this.props;
    return (
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <Topics topics={topics} match={this.props} />
        </Suspense>
      </div>
    )
  }
}

export default withRouter(SuspenseContainer);