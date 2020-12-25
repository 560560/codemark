import React from 'react'

type PropsType = {
    pictureUrl: string,
    pictureTag: string,
    setTagToSearchField: (pictureTag: string) => void

}

const GalleryItem = ({pictureUrl, pictureTag, setTagToSearchField}: PropsType) => {
    return (
        <div className="gallery-item-wrapper" onClick={() => setTagToSearchField(pictureTag)}>
            <img src={pictureUrl} alt={pictureTag}/>
        </div>
    )
}

export default GalleryItem