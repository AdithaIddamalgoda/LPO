const express = require('express');
const authController = require('../controllers/auth');
const phiController = require('../controllers/phiController');
const adminController = require('../controllers/adminController')
const dotenv = require('dotenv');


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
  if (req.user) {
    res.render('profile', {
      user: req.user,
      api_key: process.env.API_KEY,
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

router.get('/admin-home', authController.isLoggedIn, adminController.adminView, (req, res) => {
  res.render('./Admin/admin-home', {
    user:req.user,
    adminView: req.adminView,
  });
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


router.get('/phiHome', authController.isLoggedIn, authController.isLogged, phiController.phiView, (req, res) => {
  res.render('./PHI/phi-home', {
    user: req.user,
    phireq: req.phireq,
    phiView: req.phiView,
  });
});

router.get('/phiHome/:userID', authController.isLoggedIn, authController.isLogged, phiController.phiUserHistory, (req, res) => {
  res.render('./PHI/userRequestHistory', {
    user: req.user,
    phireq: req.phireq,
    phiUserHistory: req.phiUserHistory,
  });
});

router.get('/phi-request/:id', phiController.getPhiReqById) //modal
router.get('/user-edit/:id', adminController.getUserDetails) //modal
router.get('/user-delete/:id', adminController.deleteUser) //modal

module.exports = router;