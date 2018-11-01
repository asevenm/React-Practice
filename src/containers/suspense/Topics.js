import React, { PureComponent, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { unstable_createResource } from 'react-cache';
import Spin from '../../components/spin/Spin.jsx';
import './Topics.scss';

const imageSource = unstable_createResource((src) => new Promise(
  resolve => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.src = src;
  }
));

const Img = ({ src, alt, ...rest }) => {
  return <img src={imageSource.read(src)} alt={alt} {...rest} />
}

const Topic = ({topic, index, match}={}) => {
  return (
    <Link className='topicItem' to={`${match.match.path}/${index}`}>
      <div className='avatar'>
        <Suspense fallback={<Spin />}>
          <Img src={topic.author.avatar_url} alt=""/> 
        </Suspense>
      </div>
      <div className='title'>{topic.title}</div>
    </Link>
  )
}

export default class Topics extends PureComponent {
  render() {
    const { topics, match } = this.props;
    return (
      <div className='topic-list'>
        {
          topics.map((item, index) => {
            return (
              <Topic 
                topic={item} 
                index={index} 
                match={match} 
                key={'item' + index}
              />
            )
          })
        } 
      </div>
    );
  }
}