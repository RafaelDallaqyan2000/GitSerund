import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './rootReducer';

    const middleware = [
        thunk
    ];

    const rootReducer = combineReducers({
        ...reducers,
    });


    export default createStore(
        rootReducer,
        applyMiddleware(...middleware)
    );
