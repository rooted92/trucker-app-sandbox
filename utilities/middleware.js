module.exports.isLoggedIn = (req, res, next) => {
  // If the user is not signed in, redirect them to the login page
  // isAuthenticated is a method that comes from passport, it checks if the user is signed in
  console.log('Is Logged In user: ', req.user);
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in!');
    return res.redirect('/users/login');
  }
  next();
};