// middleware to handle 404 error
const noRouteFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export default noRouteFound;
