import React from 'react';
import GaleryItem from './GalleryItem';
import {PropsType} from "./GalleryContainer"
import GalleryGroups from "./GalleryGroups";


const Gallery = ({pictures, setTagToSearchField, groups, grouped}: PropsType) => {
    return (
        <div className="gallery-wrapper">
            {grouped
                ? <GalleryGroups pictures={pictures} groups={groups} setTagToSearchField={setTagToSearchField}/> //если включена группировка - рендерится этот компонент
                : pictures.map((picture, index) => <GaleryItem picture={picture}//если группировка выключена - рендерится этот компонент
                                                               key={index}
                                                               setTagToSearchField={setTagToSearchField}/>)}
        </div>
    )
        ;
}

export default Gallery;