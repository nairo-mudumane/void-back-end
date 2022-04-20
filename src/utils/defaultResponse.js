function defaultResponse(error, status, message) {
  const res = {
    error,
    status,
    message,
  };
  return res;
}

module.exports = { defaultResponse };
