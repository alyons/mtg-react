import { handleErrors, isEmptyOrSpaces } from '../utils';

const BASE_URL = (window.location.hostname == 'localhost') ? '/api' : window.location.origin;

export async function getCards(page, filter) {
  let requestUri = `${BASE_URL}/cards?page=${page}`;

  if (!isEmptyOrSpaces(filter)) {
    requestUri += `&filter=${encodeURIComponent(filter)}`
  }

  const response = await fetch(requestUri);
  handleErrors(response);
  return await response.json();
};

export async function getAggregation(filter) {
  let requestUri = `${BASE_URL}/aggregate`;
  let pipeline = [
      { '$match': { 'mana_cost': { '$exists': 1, '$ne': null } } },
      { '$group': {
          '_id': {
            'mana_value': '$mana_value',
            'color': {
              '$let': {
                'vars': { 'color_flag': '$color_flag' },
                'in': {
                  '$switch': {
                    'branches': [
                      { case: { '$eq': [ '$color_flag', 0b00000 ] }, then: 'colorless' },
                      { case: { '$eq': [ '$color_flag', 0b10000 ] }, then: 'white' },
                      { case: { '$eq': [ '$color_flag', 0b01000 ] }, then: 'blue' },
                      { case: { '$eq': [ '$color_flag', 0b00100 ] }, then: 'black' },
                      { case: { '$eq': [ '$color_flag', 0b00010 ] }, then: 'red' },
                      { case: { '$eq': [ '$color_flag', 0b00001 ] }, then: 'green' }
                    ],
                    'default': 'multicolor'
                  }
                }
              }
            }
          },
          'count': { '$sum': 1 }
      } }
    ];

  requestUri += `?pipeline=${encodeURIComponent(JSON.stringify(pipeline))}`;

  const response = await fetch(requestUri);
  handleErrors(response);
  return await response.json();
};