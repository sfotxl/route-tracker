import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';
import AsyncStore from '@react-native-async-storage/async-storage';
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': 
            return {
                ...state, errorMessage: action.payload
            }
        case 'signin':
            return {
                errorMessage: '', token: action.payload
            }
        default: 
            return state;
    }
};

const signup = (dispatch) => async ({ email, password }) => {
    // Make api request to sign up with email and password
    try {
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStore.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('TrackList');
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign up.'})
    }
};

const signin = (dispatch) => async  ({ email, password }) => {
    // Try to sign in
    try {
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStore.setItem('token', response.data.token);
        // Handle success by updating state
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('TrackList');
    } catch (err) {
        // Handle failure by showing error message
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign in.'})
    }
};

const signout = (dispatch) => {
    return () => {
        // Sign out
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    {signin, signout, signup}, 
    { token: null, errorMessage: '' }
)