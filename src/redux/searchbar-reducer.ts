import {imagesAPI} from "../api/api";
import {setPicture} from "./gallery-reducer";

const SET_IS_GROUPED = "SET_IS_GROUPED"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_SERVER_ERROR_MESSAGE = "SET_SERVER_ERROR_MESSAGE"
const SET_TAG_TO_SEARCH_FIELD = "SET_TAG_TO_SEARCH_FIELD"

export type InitialStateType = {
    isFetching: boolean,
    grouped: boolean,
    serverErrorMessage: string,
    searchFieldValue: string
}
const initialState: InitialStateType = {
    isFetching: false,
    grouped: false,
    serverErrorMessage: "",
    searchFieldValue: ""
}


const searchBarReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.fetchingStatus
            }
        case SET_IS_GROUPED:
            return {
                ...state,
                grouped: action.groupedStatus
            }
        case SET_TAG_TO_SEARCH_FIELD:
            return {
                ...state,
                searchFieldValue: action.pictureTag
            }
        case SET_SERVER_ERROR_MESSAGE:
            return {
                ...state,
                serverErrorMessage: action.message
            }

        default:
            return {
                ...state
            }


    }
}

type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING,
    fetchingStatus: boolean
}
const setIsFetching = (fetchingStatus: boolean): SetIsFetchingActionType => {
    return {
        type: SET_IS_FETCHING,
        fetchingStatus
    }
}

type SetIsGroupedActionType = {
    type: typeof SET_IS_GROUPED,
    groupedStatus: boolean
}
export const setIsGrouped = (groupedStatus: boolean): SetIsGroupedActionType => {
    return {
        type: SET_IS_GROUPED,
        groupedStatus
    }
}


type SetTagToSearchFieldActionType = {
    type: typeof SET_TAG_TO_SEARCH_FIELD,
    pictureTag: string
}
export const setTagToSearchField = (pictureTag: string): SetTagToSearchFieldActionType => {
    return {
        type: SET_TAG_TO_SEARCH_FIELD,
        pictureTag
    }
}



type SetServerErrorMessageActionType = {
    type: typeof SET_SERVER_ERROR_MESSAGE,
    message: string
}

export const setServerErrorMessage = (message: string): SetServerErrorMessageActionType => {

    return {
        type: SET_SERVER_ERROR_MESSAGE,
        message
    }
}

export const getTags = (tags: string[]) => async (dispatch: any) => {
    dispatch(setIsFetching(true))
    for (const tag of tags) {

        try {
            if (tags.length === 1 && tags[0] === "delay"){
                let response = await imagesAPI.getRandomImage()
                dispatch(setPicture(response.data.data.image_url, tag))
            } else {
                let response = await imagesAPI.getImage(tag)
                if (response.data.data.length === 0) {
                    dispatch(setServerErrorMessage("По тегу ничего не найдено"))
                } else {
                    dispatch(setPicture(response.data.data.image_url, tag))
                }
            }


        } catch (e) {
            dispatch(setServerErrorMessage("Произошла http ошибки"))
        }
    }


    dispatch(setIsFetching(false))
}

export default searchBarReducer