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
            {groups.sort().map((group, index) => <div className="gallery-group" key={index}>
                <div className="group-header"><span>{group}</span></div>
                <div className="group-pictures">
                    {pictures.filter(picture => picture.tag === group).map((picture, index) => <GaleryItem pictureUrl={picture.url}
                                                                                                           pictureTag={picture.tag}
                                                                                                           key={index}
                                                                                                           setTagToSearchField={setTagToSearchField}/>)}
                </div>
            </div>)}

        </div>
    );
}

export default GalleryGroups;