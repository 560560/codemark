import React, {useState} from 'react'




const SearchBar = ({getTags, isFetching}: any) => {

    const [value, setValue] = useState("")

    const onEnterKeyHandler = (key: string) => {
            setValue(key.replace(/[^a-z,]+/ig, ""))
    }

    const onLoadHandler = () => {
        if (value.trim().length === 0) {
            alert("заполните поле 'тег'")
        } else {
            let preparedTags = value.split(",")
            console.log(preparedTags)
            getTags(preparedTags)
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

                <button className="button load" disabled={isFetching} onClick={onLoadHandler}>{isFetching ? "Загрузка..." : "Загрузить"}</button>
                <button className="button clear" disabled={isFetching}>Очистить</button>
                <button className="button group" disabled={isFetching}>Группировать</button>
            </div>
        </div>
    );
}

export default SearchBar;