import React, {useEffect, useState} from 'react'
import Modal from '../Common/Modal'
import {PropsType} from "./SearchBarContainer"


const SearchBar = ({getTags, isFetching, setIsGrouped, grouped, serverErrorMessage, setServerErrorMessage, clearPictures, searchFieldValue, setTagToSearchField}: PropsType) => {

    // если есть ошибка с сервера, показываю модальное окно
    useEffect(() => {
        serverErrorMessage && showModalMessage(serverErrorMessage)
    }, [serverErrorMessage])

    //тег, полученны от клика по картинке прописваю в поисковую строку
    useEffect(() => {
        searchFieldValue && setValue(searchFieldValue)
    }, [searchFieldValue])


    const [showModal, setShowModal] = useState(false)  //стейт состояния отображения модального окна
    const [modalMessage, setModalMessage] = useState("") //стейт сообщения модального окна
    const [value, setValue] = useState("") //стейт значения поисковой строки
    const [delayInterval, setDelayInterval] = useState(false) //стейт состояния интервала  при режиме delay


    //функция  обрабатывает отображения модального окна
    const showModalMessage = (message: string) => {
        setModalMessage(message)
        setShowModal(true)
        setTimeout(() => setShowModal(false), 3000)
        setServerErrorMessage("")
    }

    //обработчик ввода в строку. Разрешены только латинские буквы и символ ","
    const onEnterKeyHandler = (key: string) => {
        setValue(key.replace(/[^a-z,]+/ig, ""))
    }

    //очистка интервала режима delay
    const clearDelayInterval = () => {
        if (delayInterval) {
            clearInterval(localStorage.intervalId)
            setDelayInterval(false)
        }
    }

    //обработчик нажатия на кнопку Загрузка
    const onLoadHandler = () => {
        clearDelayInterval()

        if (value.length === 0) { //введенное значение пустое - получаем сообщение
            showModalMessage("заполните поле 'тег'")
        } else {
            let preparedTags: string[] = value.toLowerCase().split(",").filter(tag => tag !== "") // создаю массив картинок, внижнем регистре, без пустых элементов
            if (!preparedTags.length) { //тот случай, когда введена как минимум одна запятая и ни одного тега.
                showModalMessage("Вы не ввели ни одного тега. Повторите ввод.")
            }
            if (preparedTags.length === 1 && preparedTags[0] === "delay") {//обработка режима delay
                getTags(preparedTags)
                localStorage.intervalId = setInterval(() => {
                    getTags(preparedTags)
                }, 5000)
                setDelayInterval(true)

            } else {// обработка основного случая
                getTags(preparedTags)//диспатчу в санку полученный массив тегов
                setTagToSearchField("")//обнуляю стейт поисковой строки в редаксе
                setValue("")//обнуляю локальный стейт поисковой строки
            }

        }
    }

    //обработчик очистки полученных картинок
    const onClearHandler = () => {
        clearDelayInterval()
        clearPictures()
    }

    //обработчик установки режима группировки картинок
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