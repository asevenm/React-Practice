import React from 'react';
import { Link } from 'react-router-dom';
import './Topics.css';

const Topic = ({topic, index, match}) => {
    return (
        <Link className='topicItem' to={`${match.match.path}/${index}`}>
            <div className='avatar'>
                <img src={topic.author.avatar_url} alt=""/> 
            </div>
            <div className='title'>{topic.title}</div>
        </Link>
    )
}

const Topics = ({topics, match}) => {
    return (
        <div className='topic-list'>
            {
                topics.map((item, index) => {
                    return <Topic topic={item} index={index} match={match} key={'item' + index}/>
                })
            } 
        </div>
    )
}

export default Topics;