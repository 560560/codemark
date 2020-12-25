import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import {connect} from "react-redux";
import {getTags} from "../../redux/searchbar-reducer";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    getTags: any,
    isFetching: boolean
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

const mapStateToProps = (state:  AppStateType) => ({
    isFetching: state.searchBarPage.isFetching
})
export default connect(mapStateToProps, {getTags})(SearchBarContainer)