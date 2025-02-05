import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Trailer from './trailer';
import { Button, Card, CardContent, Typography, Box, Stack } from '@mui/material';
import NotAvailable from '../assets/images/Poster_not_available.jpg';
import _ from 'lodash';
import numeral from 'numeral';
import '../assets/css/app.css';

const MovieCard = () => {
  const movieidnum = useSelector((state) => state.movieidnum); // Access movieidnum from Redux store

  const [moviedata, setMovieData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch movie data by ID
  const fetchMovieID = (idnum) => {
    const url = `https://api.themoviedb.org/3/movie/${idnum}?&api_key=94ceb56d1cec3cfde6b78c4787659689&append_to_response=videos`;
    fetchApi(url);
  };

  const fetchApi = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data);
      });
  };

  // Toggle modal
  const handleOpen = () => {
    setModalOpen(!modalOpen);
  };

  // Update background image when movie data changes
  useEffect(() => {
    if (moviedata.backdrop_path) {
      const backdropIMG = `https://image.tmdb.org/t/p/original${moviedata.backdrop_path}`;
      document.body.style.backgroundImage = `url(${backdropIMG})`;
    }
  }, [moviedata]);

  // Fetch movie data when component mounts or movieidnum changes
  useEffect(() => {
    if (movieidnum) {
      fetchMovieID(movieidnum);
    }
  }, [movieidnum]);

  const generesArr = _.map(moviedata.genres, 'name') || [];
  const productionArr = _.map(moviedata.production_companies, 'name') || [];

  const posterPath = moviedata.poster_path
    ? `https://image.tmdb.org/t/p/w500/${moviedata.poster_path}`
    : NotAvailable;

  return (
    <>
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch">
        <Box flex={2} className="moviecontent col">
          <Card className="MuiPaper-root" style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h4" component="h1">
                {moviedata.original_title || 'NA'}
              </Typography>
              <Typography variant="h6" component="h4" className="headertext">
                {moviedata.tagline || 'NA'}
              </Typography>
              <Typography variant="body1" component="p">
                {moviedata.overview || 'NA'}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant="h6" component="h4" className="headertext">
                Genre: {!_.isEmpty(generesArr) ? generesArr.join(' , ') : 'NA'}
              </Typography>
              <Typography variant="body1" component="p" className="headertext">
                Production Companies: {!_.isEmpty(productionArr) ? productionArr.join(' , ') : 'NA'}
              </Typography>
            </CardContent>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Box flex={1}>
                <CardContent>
                  <Typography variant="body2" component="h6">
                    Released Date:
                  </Typography>
                  <Typography variant="h6" component="h4" className="headertext">
                    {moviedata.release_date || 'NA'}
                  </Typography>
                </CardContent>

                <CardContent>
                  <Typography variant="body2" component="h6">
                    Box Office Collections:
                  </Typography>
                  <Typography variant="h6" component="h4" className="headertext">
                    {moviedata.revenue
                      ? numeral(moviedata.revenue).format('($0,0)')
                      : 'NA'}
                  </Typography>
                </CardContent>
              </Box>

              <Box flex={1}>
                <CardContent>
                  <Typography variant="body2" component="h6">
                    Duration:
                  </Typography>
                  <Typography variant="h6" component="h4" className="headertext">
                    {moviedata.runtime || 'NA'} mins
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="body2" component="h6">
                    Review Ratings:
                  </Typography>
                  <Typography variant="h6" component="h4" className="headertext">
                    {moviedata.vote_average || 'NA'} / 10
                  </Typography>
                </CardContent>
              </Box>

              <Box flex={1}>
                <CardContent>
                  <Typography variant="body2" component="h6">
                    Trailer:
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleOpen}>
                    Play Trailer
                  </Button>
                </CardContent>
              </Box>
            </Stack>
          </Card>
        </Box>

        <Box flex={1} className="imagecontent col">
          <img
            className="posterimage"
            src={posterPath}
            alt="poster image"
          />
        </Box>
      </Stack>
    </Box>

      {modalOpen && (
        <Trailer
          movietrailer={moviedata.videos}
          modalOpen={modalOpen}
          handleOpen={handleOpen}
        />
      )}
      </>
  );
};

export default MovieCard;
