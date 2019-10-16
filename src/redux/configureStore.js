import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUC_DEVTOOLS_EXTENSION_COMPOSE__DETAILS || compose
    return createStore(
        rootReducer, 
        initialState,
        composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))    
    );
}