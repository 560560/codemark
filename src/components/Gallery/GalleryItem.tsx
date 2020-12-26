import React from 'react'


type PictureType = {
    tag: string,
    url: string
}

type PropsType = {
    picture: PictureType[],
    setTagToSearchField: (pictureTag: string) => void
}

const GalleryItem = ({picture, setTagToSearchField}: PropsType) => {


    //функция настройки размера сетки для "сдвоенных" картинок
    const calculateStructure = () => {

        let columnsValue
        let rowsValue

        let pictureElements = picture.length

        if (pictureElements === 1) {
            columnsValue = "1fr"
            rowsValue = "100%"
        } else if (pictureElements === 2) {
            columnsValue = "1fr"
            rowsValue = "50% 50%"
        } else if (pictureElements < 5) {
            columnsValue = "repeat(2, 50%)"
            rowsValue = "repeat(2, 50%)"
        } else if (pictureElements < 10) {
            columnsValue = "repeat(3, 33%)"
            rowsValue = "repeat(3, 33%)"
        } else {
            columnsValue = "repeat(4, 25%)"
            rowsValue = "repeat(4, 25%)"
        }

        return {
            gridTemplateColumns: columnsValue,
            gridTemplateRows: rowsValue
        }
    }

    return (
        <div className="gallery-item-wrapper" style={calculateStructure()}>
            {picture.map((pictureItem, index) => <div className="gallery-item" key={index} onClick={() => setTagToSearchField(pictureItem.tag)}>
                <img src={pictureItem.url} alt={pictureItem.tag}/></div>)}
        </div>
    )
}

export default GalleryItem