const MSG_VALIDATION_ERROR = 'Validation error';
const MSG_NOT_FOUND = 'Not found';
const MSG_INTERNAL_SERVER_ERROR = 'Internal server error';
const MSG_NOT_IMPLEMENTED = 'Not implemented';
const MSG_UNAUTHORIZED = 'Unauthorized';
const MSG_FORBIDDEN = 'Forbidden';
const MSG_CONFLICT = 'Conflict';
const MSG_BAD_REQUEST = 'Bad request';
const MSG_NO_CONTENT = 'No content';
const MSG_CREATED = 'Created';
const MSG_OK = 'Ok';

const OK = (data, message = '') => {
  return {
    status: 200,
    message,
    data
  };
};

const CREATED = (data, message = '') => {
  return {
    status: 201,
    message,
    data
  };
};

const NO_CONTENT = (message = '') => {
  return {
    status: 204,
    message
  };
};

const BAD_REQUEST = (message = '', errors = []) => {
  return {
    status: 400,
    message,
    errors
  };
};

const UNAUTHORIZED = (message = '') => {
  return {
    status: 401,
    message
  };
};

const FORBIDDEN = (message = '') => {
  return {
    status: 403,
    message
  };
};

const NOT_FOUND = (message = '') => {
  return {
    status: 404,
    message
  };
};

const CONFLICT = (message = '') => {
  return {
    status: 409,
    message
  };
};

const INTERNAL_SERVER_ERROR = (message = '') => {
  return {
    status: 500,
    message
  };
};

const NOT_IMPLEMENTED = (message = '') => {
  return {
    status: 501,
    message
  };
};

export {
  MSG_VALIDATION_ERROR,
  MSG_NOT_FOUND,
  MSG_INTERNAL_SERVER_ERROR,
  MSG_NOT_IMPLEMENTED,
  MSG_UNAUTHORIZED,
  MSG_FORBIDDEN,
  MSG_CONFLICT,
  MSG_BAD_REQUEST,
  MSG_NO_CONTENT,
  MSG_CREATED,
  MSG_OK,
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED
};
