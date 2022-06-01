import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Container,
  Typography
} from '@mui/material';

import CardTable from '../components/CardTable';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';

import { isEmptyOrSpaces } from '../utils';

const RESULTS_PAGE_SX = {
  pb: 2
};

const ResultsPage = ({...props}) => {
  let { sx } = props;
  let applied_sx = Object.assign({}, RESULTS_PAGE_SX, sx);

  const [page, setPage] = useState(0);
  const [cards, setCards] = useState(null);
  const [fetching, setFetching] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  const fetchResults = async() => {
    setFetching(true);
    let requestUri = `/cards?page=${page}`;
    const searchString = searchParams.toString();
    if (!isEmptyOrSpaces) requestUri += `&${searchString}`
    const response = await fetch(requestUri);
    const json = await response.json();
    setCards(json);
    setFetching(false);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  useEffect(() => {
    fetchResults();
  }, [page]);

  return (
    <Container sx={applied_sx}>
      <Typography variant='h4' align='center' sx={{ my: 2 }}>MtG: CS Results</Typography>
      {(!cards) ? <Typography>Loading...</Typography> : <CardTable cards={cards} sx={{ mb: 2 }} />}
      <ButtonGroup>
        <IconButton disabled={fetching} onClick={previousPage} children={<ArrowBack />} />
        <Button disabled>{page}</Button>
        <IconButton disabled={fetching} onClick={nextPage} children={<ArrowForward />} />
      </ButtonGroup>
    </Container>
  );
};

export default ResultsPage;
