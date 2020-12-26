import {applyMiddleware, combineReducers, createStore, compose} from "redux"
import galleryReducer from "./gallery-reducer"
import searchBarReducer from "./searchbar-reducer"
import thunkMiddleware from "redux-thunk"



let reducers = combineReducers({
    galleryPage: galleryReducer,
    searchBarPage: searchBarReducer

})


type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>



// @ts-ignore
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store