import { isEmptyOrSpaces } from '.';

const COMMON_COLOR_MAPPINGS = {
  'azorius': 'wu',
  'boros': 'rw',
  'dimir': 'ub',
  'golgari': 'bg',
  'gruul': 'rg',
  'izzet': 'ur',
  'orzhov': 'wb',
  'rakdos': 'rb',
  'selesnya': 'wg',
  'simic': 'ug',
  'abzan': 'wbg',
  'bant': 'wug',
  'esper': 'wub',
  'grixis': 'urb',
  'jeskai': 'wur',
  'jund': 'brg',
  'mardu': 'wbr',
  'naya': 'wgr',
  'sultai': 'ubg',
  'temur': 'urg',
  'glint': 'ubrg',
  'dune': 'wbrg',
  'ink': 'wurg',
  'witch': 'wubg',
  'yore': 'wubr',
  'silverquill': 'bw',
  'prismari': 'ub',
  'witherbloom': 'bg',
  'lorehold': 'rw',
  'quandrix': 'gu'
};

const VALID_TAGS = ['name'];

const IDENTITY_TAG_REGEX = /identity:(\w*)/;

export default function buildQuery(searchText) {
  if (isEmptyOrSpaces(searchText)) return '';

  let queryParts = searchText.split(/\s/);
  console.log(queryParts)
  
  let queryString = '';

  if (!isEmptyOrSpaces(searchText)) {
    queryString = `?search=${encodeURIComponent(searchText)}`
  }

  return queryString;
};
