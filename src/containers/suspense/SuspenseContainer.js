import React, { PureComponent, Suspense, lazy } from 'react';
import { withRouter } from 'react-router-dom';
import { unstable_createResource } from 'react-cache';
import Spin from '../../components/spin/Spin.jsx';

const Topics = lazy(() => import('./Topics'));


class SuspenseContainer extends PureComponent {
  state = {
    topics: [],
  }

  componentDidMount() {
    this.fetchTopics();
  }

  topicsResource = unstable_createResource()

  fetchTopics = async (page = 1, limit = 10) => {
    const res = await fetch(`https://cnodejs.org/api/v1/topics?page=${page}&limit=${limit}`);
    const resJson = await res.json();
    this.setState({ topics: resJson.data });
  }

  render() {
    const { topics } = this.state;
    return (
      <div>
        <Suspense fallback={<Spin size={'large'}/>}>
          <Topics topics={topics} match={this.props} />
        </Suspense>
      </div>
    )
  }
}

export default withRouter(SuspenseContainer);