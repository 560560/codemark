import React from 'react';
import GaleryItem from './GalleryItem';
import {PropsType} from "./GalleryContainer"
import GalleryGroups from "./GalleryGroups";


const Gallery = ({pictures, setTagToSearchField, groups, grouped}: PropsType) => {
    return (
        <div className="gallery-wrapper">
            {grouped
                ? <GalleryGroups pictures={pictures} groups={groups} setTagToSearchField={setTagToSearchField}/>
                : pictures.map((picture, index) => <GaleryItem pictureUrl={picture.url}
                                                               pictureTag={picture.tag}
                                                               key={index}
                                                               setTagToSearchField={setTagToSearchField}/>)}
        </div>
    )
        ;
}

export default Gallery;