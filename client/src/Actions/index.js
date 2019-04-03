import streams from '../API/Streams';
import {SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, EDIT_STREAM, DELETE_STREAM} from './Types';
import history from '../History';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
}


//we can rewrite the bottom function as: 
//export const streams = formValues => async dispatch => {stuff for function goes in here};
export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await streams.post('/streams', {...formValues, userId});
        dispatch ({
            type: CREATE_STREAM,
            payload: response.data
        })
        history.push('/'); //this is how we navigate users around. use push and the string of the path we wat the user to nav to
    };
}

export const fetchStreams = () => {
    return async (dispatch) => {
        const response = await streams.get('/streams');
        dispatch ({
            type: FETCH_STREAMS,
            payload: response.data
        })
    };
}

export const fetchStream = (id) => {
    return async (dispatch) => {
        const response = await streams.get(`/streams/${id}`);
        dispatch ({
            type: FETCH_STREAM,
            payload: response.data
        })
    };
}

export const editStream = (id, formValues) => {
    return async (dispatch) => {
        const response = await streams.patch(`/streams/${id}`, formValues);
        dispatch ({
            type: EDIT_STREAM,
            payload: response.data
        })
        history.push('/');
    };
}

export const deleteStream = (id) => {
    return async (dispatch) => {
        await streams.delete(`/streams/${id}`);
        dispatch ({
            type: DELETE_STREAM,
            payload: id
        })
        history.push('/');
    };
}