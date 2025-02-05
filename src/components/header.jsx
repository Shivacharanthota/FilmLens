import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tmdblogo from '../assets/images/tmdb.svg';
import {TextField, Autocomplete, Button, AppBar, Toolbar, Box, Alert } from '@mui/material';
import debounce from 'lodash/debounce';
import { movieDetails } from '../actions';

const Header = () => {
  const dispatch = useDispatch();
  const movieid = useSelector((state) => state.movieidnum); // Access movieidnum from state

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  // Debounced search function
  const searchMovies = useCallback(
    debounce(() => {
      if (query) {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=94ceb56d1cec3cfde6b78c4787659689`)
          .then((res) => res.json())
          .then((data) => {
            setResults(
              data.results.map((item) => ({
                datares: item,
              }))
            );
            setIsLoading(false);
            setError(null);
          })
          .catch((err) => {
            setIsLoading(false);
            setError('Failed to fetch movie data. Please try again.');
          });
      }
    }, 500),
    [query]
  );

  const handleResultSelect = (event, value) => {
    try {
      if (!value || !value.datares || !value.datares.title) {
        throw new Error('Failed to fetch movie data');
      }
      setError(null); // Clear any previous errors
      setQuery(value.datares.title);
      dispatch(movieDetails(value.datares.id)); // Dispatch action to update movie ID in Redux state
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearchChange = (event, value) => {
    setIsLoading(true);
    setResults([]);
    setQuery(value);
    searchMovies();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button style={{ textDecoration: 'none', padding: 0, border: 'none', background: 'none' }}>
          <img alt="TMDB Logo" src={tmdblogo} width="60%"/>
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', width: '50%' }}>
          <Autocomplete
            freeSolo
            options={results}
            getOptionLabel={(option) => option.datares?.title}
            renderInput={(params) => (
              <TextField {...params} placeholder="Search..." variant="outlined" />
            )}
            loading={isLoading}
            onChange={handleResultSelect}
            onInputChange={(event, value) => {
              handleSearchChange(event, value);
              searchMovies();
            }}
            sx={{ width: '100%' }}
          />
        </Box>
      </Toolbar>
      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
