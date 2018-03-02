import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const { NODE_ENV } = process.env
const devCompose = composeWithDevTools(applyMiddleware(thunk));
const prodCompose = applyMiddleware(thunk);
/*const shouldCompose = NODE_ENV === 'development' ?
    devCompose : prodCompose;*/

const store = createStore(
    rootReducer,
    devCompose
);

export default store