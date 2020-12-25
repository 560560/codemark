import React from 'react';
import {PicturesType} from "../../redux/gallery-reducer";
import GaleryItem from './GalleryItem';

type PropsType = {
    pictures: PicturesType[],
    setTagToSearchField: (pictureTag: string) => void
}

const Gallery = ({pictures, setTagToSearchField}: PropsType) => {
    return (
        <div className="gallery-wrapper">
            {pictures.map((picture, index) => <GaleryItem pictureUrl={picture.url}
                                                          pictureTag={picture.tag}
                                                          key={index}
                                                          setTagToSearchField={setTagToSearchField}/>)}
        </div>
    )
        ;
}

export default Gallery;