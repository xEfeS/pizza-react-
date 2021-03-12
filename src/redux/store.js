import {combineReducers, createStore, compose, applyMiddleware} from "redux";
import filtersReducer from "./reducers/filters";
import pizzasReducer from "./reducers/pizzas";
import thunkMiddleware from 'redux-thunk'
import cartReducer from "./reducers/cart";


const reducer = combineReducers({
    filters: filtersReducer,
    pizzas: pizzasReducer,
    cart:cartReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store