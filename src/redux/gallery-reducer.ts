import {type} from "os";

const SET_PICTURE = "SET_PICTURE"
const CLEAR_PICTURES = "CLEAR_PICTURES"

export type PicturesType = {
    tag: string,
    url: string
}

type InitialStateType = {
    pictures: PicturesType[]
}

const initialState: InitialStateType = {
    pictures: []
}

const galleryReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_PICTURE:
            return {
                ...state,
                pictures: [...state.pictures, {url: action.url, tag: action.tag}]
            }
        case CLEAR_PICTURES:
            return {
                ...state,
                pictures: []
            }
        default:
            return {
                ...state
            }


    }
}

type SetPictureActionType = {
    type: typeof SET_PICTURE,
    url: string,
    tag: string
}
export const setPicture = (url: string, tag: string): SetPictureActionType => {

    return {
        type: SET_PICTURE,
        url,
        tag
    }
}


type ClearPicturesActionType = {
    type: typeof CLEAR_PICTURES
}
export const clearPictures = (): ClearPicturesActionType => {
    return {
        type: CLEAR_PICTURES
    }
}

export default galleryReducer