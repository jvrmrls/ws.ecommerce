const OK = (data, message = "") => {
  return {
    status: 200,
    message,
    data,
  };
};

const CREATED = (data, message = "") => {
  return {
    status: 201,
    message,
    data,
  };
};

const NO_CONTENT = (message = "") => {
  return {
    status: 204,
    message,
  };
};

const BAD_REQUEST = (message = "") => {
  return {
    status: 400,
    message,
  };
};

const UNAUTHORIZED = (message = "") => {
  return {
    status: 401,
    message,
  };
};

const FORBIDDEN = (message = "") => {
  return {
    status: 403,
    message,
  };
};

const NOT_FOUND = (message = "") => {
  return {
    status: 404,
    message,
  };
};

const CONFLICT = (message = "") => {
  return {
    status: 409,
    message,
  };
};

const INTERNAL_SERVER_ERROR = (message = "") => {
  return {
    status: 500,
    message,
  };
};

const NOT_IMPLEMENTED = (message = "") => {
  return {
    status: 501,
    message,
  };
};

export {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED,
};
