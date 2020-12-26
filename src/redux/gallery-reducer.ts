const SET_PICTURE = "SET_PICTURE"
const CLEAR_PICTURES = "CLEAR_PICTURES"
const SET_GROUP_OF_PICTURE = "SET_GROUP_OF_PICTURE"



////////////////////////////////////////// Описываю типы массива изображений //////////////////////////////////////////
export type PicturesType = {
    tag: string,
    url: string
}[]

////////////////////////////////////////// Описываю начальный стейт //////////////////////////////////////////
type InitialStateType = {
    pictures: PicturesType[],
    groups: string[]
}
const initialState: InitialStateType = {
    pictures: [],
    groups: []
}

////////////////////////////////////////// Редьюсер //////////////////////////////////////////
const galleryReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_PICTURE:
            return {
                ...state,
                pictures: [...state.pictures, [{url: action.url, tag: action.tag}]],
                groups: [...state.groups].includes(action.tag) ? [...state.groups] : [...state.groups, action.tag]
            }
        case SET_GROUP_OF_PICTURE:
            return {
                ...state,
                pictures: [...state.pictures, action.picturesBatch]
            }
        case CLEAR_PICTURES:
            return {
                ...state,
                pictures: [],
                groups: []
            }
        default:
            return {
                ...state
            }


    }
}


////////////////////////////////////////// Описываю Action Creator добавления в стейт одиночного изображения //////////////////////////////////////////
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


////////////////////////////////////////// Описываю Action Creator добавления в стейт пачки изображений //////////////////////////////////////////
type SetGroupOfPicturesActionType = {
    type: typeof SET_GROUP_OF_PICTURE,
    picturesBatch: PicturesType
}

export const setGroupOfPictures = (picturesBatch: PicturesType):SetGroupOfPicturesActionType => {
    return{
        type: SET_GROUP_OF_PICTURE,
        picturesBatch
    }
}


////////////////////////////////////////// Описываю Action Creator очистки массива Pictures в стейте //////////////////////////////////////////
type ClearPicturesActionType = {
    type: typeof CLEAR_PICTURES
}
export const clearPictures = (): ClearPicturesActionType => {
    return {
        type: CLEAR_PICTURES
    }
}

export default galleryReducer