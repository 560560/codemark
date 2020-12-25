import React, {Component} from 'react';
import { connect } from 'react-redux';
import Gallery from "./Gallery";
import {AppStateType} from "../../redux/redux-store";
import { PicturesType } from '../../redux/gallery-reducer';
import { setTagToSearchField } from '../../redux/searchbar-reducer';


type PropsType = {
    pictures: PicturesType[],
    setTagToSearchField: (pictureTag: string) => void
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
    pictures: state.galleryPage.pictures
})

export default connect (mapStateToProps, {setTagToSearchField})(GalleryContainer)