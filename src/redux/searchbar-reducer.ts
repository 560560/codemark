import {imagesAPI} from "../api/api";
import {setGroupOfPictures, setPicture} from "./gallery-reducer";

const SET_IS_GROUPED = "SET_IS_GROUPED"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_SERVER_ERROR_MESSAGE = "SET_SERVER_ERROR_MESSAGE"
const SET_TAG_TO_SEARCH_FIELD = "SET_TAG_TO_SEARCH_FIELD"

////////////////////////////////////////// Описываю начальный стейт //////////////////////////////////////////
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

////////////////////////////////////////// Редьюсер //////////////////////////////////////////
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

////////////////////////////////////////// Описываю Action Creator включения и отключения индикатора получения данных от API//////////////////////////////////////////
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

////////////////////////////////////////// Описываю Action Creator включения индикатора группировки картинок в UI //////////////////////////////////////////
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

////////////////////////////////////////// Описываю Action Creator добавдение в стейт поискового запроса//////////////////////////////////////////
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

////////////////////////////////////////// Описываю Action Creator добавление в стейт ошибки от сервера//////////////////////////////////////////
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


////////////////////////////////////////// Описываю Thunk Creator //////////////////////////////////////////
export const getTags = (tags: string[]) => async (dispatch: any) => {

    dispatch(setIsFetching(true))  //запускаю индикатор загрузки данных от API

    if (tags.length === 1 && tags[0] === "delay") { //если пришел тег delay, делаю запрос рандомной картинки
        let response = await imagesAPI.getRandomImage()
        dispatch(setPicture(response.data.data.image_url, tags[0])) //диспатчу полученную картинку
    } else if (tags.length === 1) { //если пришел другой одиночный запрос получаю его от API и добавляю в стейт
        try {
            let response = await imagesAPI.getImage(tags[0])
            if (response.data.data.length === 0) {
                dispatch(setServerErrorMessage(`По тегу ${tags[0]} ничего не найдено`))
            } else {
                dispatch(setPicture(response.data.data.image_url, tags[0]))
            }

        } catch (e) {
            dispatch(setServerErrorMessage("Произошла http ошибки"))
        }


    } else if (tags.length > 1) {  //если пришли несколько тегов, запускаю обратботчик пачки изображений
        let picturesButch: {tag: string, url: string }[] = [] //стартовый массив для будущей пачки изображений
        for (const tag of tags) {
            try {
                let response = await imagesAPI.getImage(tag)  // запрос к API
                if (response.data.data.length === 0) {
                    dispatch(setServerErrorMessage(`По тегу ${tag} ничего не найдено`))
                } else {
                    picturesButch = [...picturesButch, {url: response.data.data.image_url, tag: tag}] //Добавляю полученные даные по тегу в готовящийся к диспатчу массив
                }

            } catch (e) {
                dispatch(setServerErrorMessage("Произошла http ошибки"))
            }
        }
        dispatch(setGroupOfPictures(picturesButch))  // Диспатчу получившуюся пачку (массив) изображений
    }


    dispatch(setIsFetching(false)) //выключаю индикатор загрузки данных От API
}

export default searchBarReducer