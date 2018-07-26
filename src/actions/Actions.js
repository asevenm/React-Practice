import 'whatwg-fetch';

export const fetchTopics = (page = 1, limit = 10) => {
    return async (dispatch, getState) => {
        let res = await fetch(`https://cnodejs.org/api/v1/topics?page=${page}&limit=${limit}`);
        let resJson = await res.json();
        dispatch({
             type: 'FETCHTOPICS',
             data:  resJson.data 
        })
    }
 }