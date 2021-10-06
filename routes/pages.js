const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// router.get('/', authController.isLoggedIn, (req, res) => {
//   console.log("inside");
//   res.render('index');
// });

router.get('/', authController.isLoggedIn, (req, res) => {
  console.log("inside");
  console.log(req.user);
  res.render('index', {
    user: req.user
  });
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log("inside");
  console.log(req.user);
  if(req.user) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect("/login");
  }
  
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/map', authController.isLoggedIn, authController.isLogged, (req, res) => {
  console.log("map");
  res.render('map', {
    user: req.user,
    phireq: req.phireq
  });
});

router.get('/changestatus', authController.isLoggedIn, authController.isLogged, (req, res) => {
  res.render('changestatus', {
    user: req.user,
    phireq: req.phireq,
  });
});

router.get('/newmap', (req, res) => {
  res.render('newmap');
});


router.get('/phiHome', authController.isLoggedIn, authController.isLogged, authController.phiView, (req, res) => {
  res.render('./PHI/phi-home', {
    user: req.user,
    phireq: req.phireq,
    phiView: req.phiView,
  });
});


module.exports = router;