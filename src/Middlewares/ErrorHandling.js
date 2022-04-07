

function errorHandler(err, req, res, next) {
    if (err.error == 406) {
      res.status(err.error).send(err);
    } else {
    res.status(500);
    res.render('error.ejs', { "error": err });
    }
  }

  function notFoundHandler(req, res, next) {
    res.status(404);
    res.render('notFound.ejs');
  }

  export { errorHandler, notFoundHandler };