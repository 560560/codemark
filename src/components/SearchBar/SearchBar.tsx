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

    const showModalMessage = (message: string) => {
        setModalMessage(message)
        setShowModal(true)
        setTimeout(() => setShowModal(false), 3000)
        setServerErrorMessage("")
    }

    const onEnterKeyHandler = (key: string) => {
        setValue(key.replace(/[^a-z,]+/ig, ""))
    }

    const onLoadHandler = () => {
        if (value.length === 0) {
            showModalMessage("заполните поле 'тег'")
        } else {
            let preparedTags: string[] = value.split(",").filter(tag => tag !== "")
            if (!preparedTags.length) {
                showModalMessage("Вы не ввели ни одного тега. Повторите ввод.")
            }
            getTags(preparedTags)
            setTagToSearchField("")
            setValue("")
        }
    }


    return (
        <div className="search-bar-wrapper">
            <div className="container">
                <input className="input-field" type="text" placeholder="Введите тег"
                       onChange={(e) => onEnterKeyHandler(e.target.value)}
                       value={value}
                />

                <button className="button load" disabled={isFetching || showModal} onClick={onLoadHandler}>{isFetching ? "Загрузка..." : "Загрузить"}</button>
                <button className="button clear" disabled={isFetching} onClick={clearPictures}>Очистить</button>
                <button className="button group" disabled={isFetching} onClick={() => setIsGrouped(!grouped)}>{grouped ? "Разгруппировать" : "Группировать"}</button>
                <Modal message={modalMessage} show={showModal}/>
            </div>

        </div>
    );
}

export default SearchBar;