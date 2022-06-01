import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

const CARD_TABLE_SX = { };

const TABLE_ROW_SX = { '&:last-child td, &:last-child th': { border: 0 } };

const DEFAULT_COLUMNS = {
  // artist: false,
  // colorIdentity: false,
  // colors: false,
  // flavor: false,
  // foreign_data: false, // Should not show in the table
  // hand: false, // Not sure what this data point is
  // id: false,
  // imageUrl: false,
  // layout: false,
  // legalities: false,
  // life: false,
  // loyalty: false,
  mana_cost: true,
  mana_value: true,
  // multiverseId: false,
  name: true,
  // names: false,
  // number: false,
  // originalText: false,
  // originalType: false,
  // power: false,
  // printings: FlareSharp,
  // rarity: false,
  // releaseDate: false,
  // reserved: false,
  // rulings: false,
  // set: false,
  // setName: false,
  // source: false,
  // starter: false,
  // text: false,
  // timeshifted: false,
  types: true,
  // toughness: false,
  // variations: false,
  // watermark: false
};

const CardTableRow = ({ activeColumns, card, ...props }) => {
  let columns = [];

  if (activeColumns.name) columns.push(<TableCell key='name'>{card.name}</TableCell>);
  if (activeColumns.mana_cost) columns.push(<TableCell key='mana_cost'>{card.mana_cost}</TableCell>);
  if (activeColumns.types) {
    columns.push(<TableCell key='types'>{`${card.supertypes.join(' ')} ${card.types.join(' ')} - ${card.subtypes.join(' ')}`}</TableCell>);
  }
  if (activeColumns.mana_value) columns.push(<TableCell key='mana_value'>{card.mana_value}</TableCell>);

  return (
    <TableRow key={card.id} sx={TABLE_ROW_SX}>
      {columns}
    </TableRow>
  );
};

const CardTableHeader = ({ activeColumns, ...props }) => {
  let columns = [];

  if (activeColumns.name) columns.push(<TableCell>Name</TableCell>);
  if (activeColumns.mana_cost) columns.push(<TableCell>Mana Cost</TableCell>);
  if (activeColumns.types) columns.push(<TableCell>Type</TableCell>);
  if (activeColumns.mana_value) columns.push(<TableCell>Mana Value</TableCell>);

  return (
    <TableHead>
      <TableRow>
        {columns}
      </TableRow>
    </TableHead>
  );
};

const CardTable = ({ cards, activeColumns=DEFAULT_COLUMNS, ...props }) => {
  let { sx } = props;
  let applied_sx = Object.assign({}, CARD_TABLE_SX, sx);

  return (
    <TableContainer component={Paper} sx={applied_sx}>
      <Table aria-label='results-table'>
        <CardTableHeader activeColumns={activeColumns} />
        <TableBody>
          {cards.map((card) => (
            <CardTableRow activeColumns={activeColumns} card={card} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardTable;
