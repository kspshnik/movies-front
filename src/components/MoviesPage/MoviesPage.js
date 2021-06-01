import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';
import MoviesList from '../MoviesList/MoviesList';
import { Movie } from '../Movie/Movie';

import './MoviesPages.css';

function MoviesPage({
  allMovies,
  favourities,
  columns,
  onMovieLike,
  onMovieDislike,
}) {
  const [search, setSearch] = useState('');
  const [isShort, setShort] = useState(false);
  // const [isPreparingMovies, setPreparingMoviesState] = useState(false);

  useEffect(() => {
    setSearch(localStorage.getItem('all-search') || '');
    setShort(Boolean(localStorage.getItem('all-short')) || false);
  }, []);

  useEffect(() => {
    localStorage.setItem('all-search', search);
  }, [search]);
  useEffect(() => {
    localStorage.setItem('all-search', String(isShort));
  }, [isShort]);

  function triggerShortFilms() {
    setShort(() => !isShort);
  }

  function handleSearchSubmit(term) {
    setSearch(term);
    console.log(`Новый поиск: '${search}'.`);
  }

  useEffect(() => {
    console.log(`Новые параметры поиска.\nСтрока поиска : '${search}',\nКороткометражки : ${isShort ? 'Да' : 'Нет'}.`);
  }, [search, isShort]);

  return (
    <main className='movies-list'>
      <SearchBar
        term={search}
        isFiltering={isShort}
        onSearchSubmit={handleSearchSubmit}
        onClickRadio={triggerShortFilms} />
      <MoviesList
        component={Movie}
        allMovies={allMovies}
        favourities={favourities}
        columns={columns}
        onMovieLike={onMovieLike}
        onMovieDislike={onMovieDislike} />
    </main>
  );
}

MoviesPage.propTypes = {
  allMovies: PropTypes.arrayOf(PropTypes.shape({
    country: PropTypes.string,
    year: PropTypes.string,
    duration: PropTypes.string.isRequired,
    director: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.object,
    trailer: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    owner: PropTypes.string,
    nameRU: PropTypes.string.isRequired,
    nameEM: PropTypes.string,
  })).isRequired,
  favourities: PropTypes.array.isRequired,
  columns: PropTypes.number.isRequired,
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,

};

export default MoviesPage;
