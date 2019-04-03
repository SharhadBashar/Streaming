import _ from 'lodash';
import {CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, EDIT_STREAM, DELETE_STREAM} from '../Actions/Types';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_STREAM:
        case FETCH_STREAM:
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            return (_.omit(state, action.payload));
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')}  
        default:
            return state;
    }
}