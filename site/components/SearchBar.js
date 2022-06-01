import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InputBase,
  Paper,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { buildQuery } from '../utils'; 

const SEARCH_BAR_SX = {
  py: 1,
  px: 2,
  display: 'flex',
  alignItems: 'center'
};

const SearchBar = ({ handleSubmit, handleTextChange, ...props}) => {
  let { sx } = props;
  let applied_sx = Object.assign({}, SEARCH_BAR_SX, sx);

  let navigate = useNavigate();
  const [searchText, setSearchText] = useState(null);

  const defaultHandleSubmit = (event) => {
    event.preventDefault();
    navigate(`/results${buildQuery(searchText)}`);
  };

  const defaultHandleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Paper component='form' sx={applied_sx} onSubmit={(!!handleSubmit) ? handleSubmit : defaultHandleSubmit}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Enter Search terms here'
        inputProps={{ 'aria-label': 'search mtg cards' }}
        onChange={(!!handleTextChange) ? handleTextChange : defaultHandleTextChange}
      />
      <IconButton sx={{ p: 1 }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
