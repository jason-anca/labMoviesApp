import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularTVShows } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const PopularTVShows = (props) => {

    const { data, error, isLoading, isError } = useQuery('top rated', getPopularTVShows)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const tvshows = data.results;

    const popular = tvshows.filter(m => m.favourite)
    localStorage.setItem('popular', JSON.stringify(popular))

    return (
        <PageTemplate
            title="Popular TY Shows"
            shows={tvshows}
            action={(tvshows) => {
                return <AddToFavouritesIcon shows={tvshows} />
            }}
        />
    );
};
export default PopularTVShows;