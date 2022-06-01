import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography
} from '@mui/material';

import {
  Chart,
  BarSeries,
  LineSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState, ValueScale, Stack } from '@devexpress/dx-react-chart';

import { getAggregation } from '../services/MagicService';
import WebResponseDisplay from '../components/WebResponseDisplay';

const AGGREGATION_PAGE = {
  pb: 2
};

let domainMax = Number.MIN_SAFE_INTEGER;

const modifyCountDomain = (domain) => {
  domainMax = Math.max(domain[1], domainMax);
  return [0, domainMax];
};

const manaValueIndex = (manaValue) => (manaValue > 11) ? '12+' : `${manaValue}`; 

const compareManaValues = (a, b) => {
  let a_mv = parseInt(a.manaValue.replace('+', ''))
  let b_mv = parseInt(b.manaValue.replace('+', ''))

  return a_mv - b_mv;
}

const parseData = (data) => {
  let output = [];

  data.forEach((d) => {
    let index = output.findIndex(o => o.manaValue == manaValueIndex(d._id.mana_value));
    if (index == -1) {
      index = output.length;
      output.push({ manaValue: manaValueIndex(d._id.mana_value), 'colorless': 0, 'white': 0, 'blue': 0, 'black': 0, 'red': 0, 'green': 0, 'multicolor': 0 });
    }
    output[index][d._id.color] = d.count;
  });

  output.sort(compareManaValues);

  return output;
};

const COLORS = [
  'Colorless',
  'White',
  'Blue',
  'Black',
  'Red',
  'Green',
  'MultiColor'
];

const barColorMap = (cardColor) => {
  switch (cardColor) {
    case 'White': return 'white';
    case 'Blue': return 'blue';
    case 'Black': return 'black';
    case 'Red': return 'red';
    case 'Green': return 'green';
    case 'MultiColor': return 'gold';
    default: return 'gray';
  }
};

const AggregationGraph = ({ data, ...props }) => {

  let [hover, setHover] = useState(null);

  const onHoverChange = (value) => { setHover(value); };

  if (data) {
    return (
      <Paper>
        <Chart data={parseData(data)}>
          <ValueScale name='count' modifyDomain={modifyCountDomain} />
          <ArgumentAxis />
          <ValueAxis scaleName='count' />
          <Title text='Cards by Mana Value' />
          {COLORS.map((c) => (
            <BarSeries
              key={`bar-series-${c}`}
              name={c}
              valueField={c.toLowerCase()}
              argumentField='manaValue'
              scaleName='count'
              color={barColorMap(c)} />
          ))}
          <Stack stacks={[{ series: COLORS }]} />
          <Legend />
          <EventTracker />
          <HoverState hover={hover} onHoverChange={onHoverChange} />
        </Chart>
      </Paper>
    );
  }

  return null;
}

const AggregationPage = ({...props}) => {
  let { sx } = props;
  let applied_sx = Object.assign({}, AGGREGATION_PAGE, sx);

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async() => {
    setFetching(true);
    setError(null);
    try {
      let body = await getAggregation(null);
      setData(body.data);
    } catch (err) {
      setError(err)
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={applied_sx}>
      <Typography variant='h3' align='center' sx={{ my: 2 }}>MtG Search: Aggregation</Typography>
      <WebResponseDisplay display={<AggregationGraph data={data} />} error={error} fetching={fetching} />
    </Container>
  );
};

export default AggregationPage;
