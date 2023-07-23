import { createStore, applyMiddleware } from "redux";
import myReducer from "./Reducer";
import logger from "redux-logger"; 


const myStore = createStore(myReducer);

export default myStore;
