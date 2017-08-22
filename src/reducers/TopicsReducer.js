import { List, Map } from 'immutable';

const initialState = Map({ fetching: true })

export default function (state = initialState, action) {
    switch(action.type) {
        case 'FETCHTOPICS':
            return state.update('Topics', () => List(action.data)).update('fetching', () => false)
        default:
            return state
    }
}