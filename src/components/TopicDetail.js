import React from 'react';

import './TopicDetail.css';

const TopicDetail = (topic) => {
    return(
        <div className='container'>
            <div dangerouslySetInnerHTML={{__html: topic.content}} />  
        </div>
    ) 
}

export default TopicDetail;