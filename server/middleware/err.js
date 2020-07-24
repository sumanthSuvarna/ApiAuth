module.exports = function() {
  return function(err, req, res, next) {
    if (err) {
      console.log("this is the error ", err.message);
      res.status(500).send(err.message);
    }
  };
};
