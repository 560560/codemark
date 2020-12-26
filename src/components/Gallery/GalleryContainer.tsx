import React, {Component} from 'react';
import { connect } from 'react-redux';
import Gallery from "./Gallery";
import {AppStateType} from "../../redux/redux-store";
import { PicturesType } from '../../redux/gallery-reducer';
import { setTagToSearchField } from '../../redux/searchbar-reducer';


export type PropsType = {
    pictures: PicturesType[],
    groups: string[]
    setTagToSearchField: (pictureTag: string) => void,
    grouped: boolean
}

class GalleryContainer extends Component<PropsType> {
    componentDidMount() {

    }

    render() {
        return (
            <Gallery {...this.props}/>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    pictures: state.galleryPage.pictures,
    groups: state.galleryPage.groups,
    grouped: state.searchBarPage.grouped
})

export default connect (mapStateToProps, {setTagToSearchField})(GalleryContainer)