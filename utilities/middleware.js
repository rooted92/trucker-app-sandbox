module.exports.isLoggedIn = (req, res, next) => {
  // If the user is not signed in, redirect them to the login page
  // isAuthenticated is a method that comes from passport, it checks if the user is signed in
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be logged in!');
    return res.redirect('/users/login');
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if(req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};