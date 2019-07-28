import { combineReducers } from 'redux'
import {eventsReducer} from "./events";

export const rootReducer = combineReducers({
    events:eventsReducer,
})