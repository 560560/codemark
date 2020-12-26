import React from 'react';
import {PicturesType} from "../../redux/gallery-reducer";
import GaleryItem from "./GalleryItem";

type PoropsType = {
    pictures: PicturesType[],
    groups: string[],
    setTagToSearchField: (pictureTag: string) => void
}

const GalleryGroups = ({groups, pictures, setTagToSearchField}: PoropsType) => {


    return (

        <div className="gallery-groups-wrapper">
            {/*Рендерю одиночный картинки, в группах*/}
            {groups.sort().map((group, index) => <div className="gallery-group" key={index}>
                <div className="group-header"><span>{group}</span></div>
                <div className="group-pictures">
                    {pictures.filter(picture => picture.length === 1 && picture[0].tag === group)
                        .map((picture, index) => <GaleryItem picture={picture} key={index} setTagToSearchField={setTagToSearchField}/>)}
                </div>
            </div>)}

            {/*Рендерю сдвоенные картинки, если они есть*/}
            {pictures.filter(picture => picture.length > 1).length > 0
            && <div className="gallery-group">
                <div className="group-header"><span>Комбинированные картинки</span></div>
                <div className="group-pictures">
                    {pictures.filter(picturesArr => picturesArr.length > 1)
                        .map((picture, index) => <GaleryItem picture={picture} key={index} setTagToSearchField={setTagToSearchField}/>)}
                </div>
            </div>
            }

        </div>
    );
}

export default GalleryGroups;