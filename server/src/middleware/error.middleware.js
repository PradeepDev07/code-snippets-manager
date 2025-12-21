const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Server error"
  });
};

export default errorHandler;
