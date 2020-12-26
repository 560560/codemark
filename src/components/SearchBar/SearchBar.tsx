import React, {useEffect, useState} from 'react'
import Modal from '../Common/Modal'
import {PropsType} from "./SearchBarContainer"


const SearchBar = ({getTags, isFetching, setIsGrouped, grouped, serverErrorMessage, setServerErrorMessage, clearPictures, searchFieldValue, setTagToSearchField}: PropsType) => {

    useEffect(() => {
        serverErrorMessage && showModalMessage(serverErrorMessage)
    }, [serverErrorMessage])

    useEffect(() => {
        searchFieldValue && setValue(searchFieldValue)
    }, [searchFieldValue])


    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [value, setValue] = useState("")
    const [delayInterval, setDelayInterval] = useState(false)

    const showModalMessage = (message: string) => {
        setModalMessage(message)
        setShowModal(true)
        setTimeout(() => setShowModal(false), 3000)
        setServerErrorMessage("")
    }

    const onEnterKeyHandler = (key: string) => {
        setValue(key.replace(/[^a-z,]+/ig, ""))
    }

    const clearDelayInterval = () => {
        if (delayInterval) {
            clearInterval(localStorage.intervalId)
            setDelayInterval(false)
        }
    }

    const onLoadHandler = () => {
        clearDelayInterval()

        if (value.length === 0) {
            showModalMessage("заполните поле 'тег'")
        } else {
            let preparedTags: string[] = value.toLowerCase().split(",").filter(tag => tag !== "")
            if (!preparedTags.length) {
                showModalMessage("Вы не ввели ни одного тега. Повторите ввод.")
            }
            if (preparedTags.length === 1 && preparedTags[0] === "delay") {
                getTags(preparedTags)
                localStorage.intervalId = setInterval(() => {
                    getTags(preparedTags)
                }, 5000)
                setDelayInterval(true)

            } else {
                getTags(preparedTags)
                setTagToSearchField("")
                setValue("")
            }

        }
    }


    const onClearHandler = () => {
        clearDelayInterval()
        clearPictures()
    }

    const onGroupedHandler = () => {
        clearDelayInterval()
        setIsGrouped(!grouped)

    }

    return (
        <div className="search-bar-wrapper">
            <div className="container">
                <input className="input-field" type="text" placeholder="Введите тег"
                       onChange={(e) => onEnterKeyHandler(e.target.value)}
                       value={value}
                />

                <button className="button load" disabled={isFetching || showModal} onClick={onLoadHandler}>{isFetching ? "Загрузка..." : "Загрузить"}</button>
                <button className="button clear" disabled={isFetching} onClick={onClearHandler}>Очистить</button>
                <button className="button group" disabled={isFetching} onClick={onGroupedHandler}>{grouped ? "Разгруппировать" : "Группировать"}</button>
                <Modal message={modalMessage} show={showModal}/>
            </div>

        </div>
    );
}

export default SearchBar;