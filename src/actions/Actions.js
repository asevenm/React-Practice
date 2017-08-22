import 'whatwg-fetch';

export const fetchTopics = () => {
    return async (dispatch, getState) => {
        let res = await fetch('https://cnodejs.org/api/v1/topics');
        let resJson = await res.json();
        dispatch({
             type: 'FETCHTOPICS',
             data:  resJson.data 
        })
    }
 }