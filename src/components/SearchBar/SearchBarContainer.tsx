import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import {connect} from "react-redux";
import {getTags, setIsGrouped, setServerErrorMessage, setTagToSearchField} from "../../redux/searchbar-reducer";
import {clearPictures} from "../../redux/gallery-reducer";
import {AppStateType} from "../../redux/redux-store";

export type PropsType = {
    getTags: (preparedTags: string[]) => void,
    isFetching: boolean,
    setIsGrouped: (groupedStatus: boolean) => void,
    grouped: boolean,
    serverErrorMessage: string,
    setServerErrorMessage: (serverErrorMessage: string) => void,
    clearPictures: () => void,
    searchFieldValue: string,
    setTagToSearchField: (pictureTag: string) => void
}


class SearchBarContainer extends Component<PropsType> {
    componentDidMount() {

    }

    render() {
        return (
            <SearchBar {...this.props}/>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isFetching: state.searchBarPage.isFetching,
    grouped: state.searchBarPage.grouped,
    serverErrorMessage: state.searchBarPage.serverErrorMessage,
    searchFieldValue: state.searchBarPage.searchFieldValue
})
export default connect(mapStateToProps, {getTags, setIsGrouped, setServerErrorMessage, clearPictures, setTagToSearchField})(SearchBarContainer)