const express = require('express');
const authController = require('../controllers/auth');
const phiAuthController = require('../controllers/phiAuth');
const adminController = require('../controllers/adminController');


const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/logout', authController.logout);

router.post('/changestatus', authController.changeStatus)
router.post('/confirm-location', phiAuthController.confirmLocation)
router.post('/confirm-covidStatus', phiAuthController.confirmCovidRequestStatus)

router.post('/admin-update', adminController.adminUpdate)


// router.post('/confirm-location', (req, res) => {
//         console.log(req.body)
// 	res.status(200);
// 	res.json({ working: true });
// 	res.end();
// });

module.exports = router;