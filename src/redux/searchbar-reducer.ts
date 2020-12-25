import {imagesAPI} from "../api/api";

const SET_SI_FETCHING = "SET_SI_FETCHING"


export type InitialStateType ={
    isFetching: boolean,
    grouped: boolean
}
const initialState: InitialStateType = {
    isFetching: false,
    grouped: false
}



const searchBarReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_SI_FETCHING:
            return {
                ...state,
                isFetching: action.fetchingStatus
            }

        default:
            return {
                ...state
            }


    }
}

type SetIsFetchingActionType = {
    type: typeof SET_SI_FETCHING,
    fetchingStatus: boolean
}
const setIsFetching = (fetchingStatus: boolean): SetIsFetchingActionType => {
    return {
        type: SET_SI_FETCHING,
        fetchingStatus
    }
}


export const getTags = (tags: [string]) => async (dispatch: any) => {
    dispatch(setIsFetching(true))
    for (const tag of tags) {
        try {
            let response = await imagesAPI.getImage(tag)
        } catch (e) {


        }
    }




    dispatch(setIsFetching(false))
}

export default searchBarReducer