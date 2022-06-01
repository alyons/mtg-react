import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Pagination,
  Typography
} from '@mui/material';

import CardTable from '../components/CardTable';
import SearchBar from '../components/SearchBar';
import { getCards } from '../services/MagicService';

const LANDING_PAGE_SX = {
  pb: 2
};

const ResultsArea = ({ cards, error, fetching, page, pageLimit, handlePaginationChange, ...props}) => {
  if (error) {
    return (
      <Typography color='error'>{error.message}</Typography>
    )
  }

  if (fetching) {
    return (<CircularProgress />);
  }

  if (cards) {
    return (
      <Box>
        <CardTable cards={cards} sx={{ mb: 2 }} />
        <Pagination page={page} count={pageLimit} disabled={fetching} onChange={handlePaginationChange} />
      </Box>
    );
  }

  return (
    <Typography>No Results to show...</Typography>
  )
};

const LandingPage = ({...props}) => {
  let { sx } = props;
  let applied_sx = Object.assign({}, LANDING_PAGE_SX, sx);

  const [page, setPage] = useState(1);
  const [cards, setCards] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [pageLimit, setPageLimit] = useState(-1);
  const [searchText, setSearchText] = useState(null);

  const fetchCards = async() => {
    setFetching(true);
    setError(null);
    try {
      let body = await getCards(page, searchText);
      setPageLimit(body.totalPages);
      setCards(body.cards);
    } catch (err) {
      setError(err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = (event, value) => {
    event.preventDefault();
    console.log(`Seach bar engaged: ${value}`)
    fetchCards();
  };

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchCards();
  }, [page]);

  return (
    <Container sx={applied_sx}>
      <Typography variant='h3' align='center' sx={{ my: 2 }}>Magic the Gathering: Card Search</Typography>
      <SearchBar handleSubmit={handleSubmit} handleTextChange={handleTextChange} sx={{ mb: 2 }} />
      <ResultsArea cards={cards} error={error} fetching={fetching} page={page} pageLimit={pageLimit} handlePaginationChange={handlePaginationChange} />
    </Container>
  );
};

export default LandingPage;
