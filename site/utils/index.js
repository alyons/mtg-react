import buildQuery from './buildQuery';

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
};

export {
  buildQuery,
  handleErrors,
  isEmptyOrSpaces
};
