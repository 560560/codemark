import {applyMiddleware, combineReducers, createStore} from "redux"
import galleryReducer from "./gallery-reducer"
import searchBarReducer from "./searchbar-reducer"
import thunkMiddleware from "redux-thunk"



let reducers = combineReducers({
    galleryPage: galleryReducer,
    searchBarPage: searchBarReducer

})

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>


const store = createStore(reducers, applyMiddleware(thunkMiddleware)
)

export default store