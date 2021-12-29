const jwt = require('jsonwebtoken');
const db = require('../model/db');
const { promisify } = require('util');

//Admin home page
exports.adminView = async (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      console.log("decoded");
      console.log(decoded);

      // 2) query to view all users in the users table
      db.start.query('SELECT us.*,cs.covid_status_key,rl.roleName FROM users us INNER JOIN role rl ON us.roleID=rl.roleID INNER JOIN covid_status cs ON us.currentCovidStatus=cs.covid_status_key', (error, result) => {
        console.log(result);
        if (!result) {
          console.log(error)
          return next();
        } else {
          console.log("*************************************************************\n", result)
          // Results of users 
          req.adminView = result;
          console.log("next")
          return next();
        }
      });
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};

exports.getUserDetails = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      db.start.query('SELECT * FROM users WHERE id = ?', [req.params.id], (error, result) => {
        // console.log(result)
        if (!result) {
          res.status(400);
          res.json({ working: error });
          res.end();
        }
        else {
          res.status(200);
          res.json(result[0]);
          res.end();
        }
      });
    } catch (err) {
      res.status(400);
      res.json({ working: err });
      res.end();
    }
  } else {
    res.status(400);
    res.json({ working: "set covid request status methana" });
    res.end();
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      db.start.query('DELETE FROM users WHERE id = ?', [req.params.id], (error, result) => {
        // console.log(result)
        if (!result) {
          res.status(400);
          res.json({ working: error });
          res.end();
        }
        else {
          res.status(200);
          res.json({ deleted: true });
          res.end();
        }
      });
    } catch (err) {
      res.status(400);
      res.json({ working: err });
      res.end();
    }
  } else {
    res.status(400);
    res.json({ working: "set covid request status methana" });
  }
};

exports.adminEditView = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      db.start.query('SELECT * FROM users WHERE id = ?', [req.params.id], (error, result) => {
        console.log("results is here",result);
        if (!result) {
          console.log(error)
          return next();
        } else {
          console.log("*************************************************************\n", result)
          req.admin = result[0];
          console.log("next")
          return next();
        }
      });
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};


exports.adminUpdate = async (req, res, next) => {
  //console.log(req.body);
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;
  const address1 = req.body.inputAddress1;
  const address2 = req.body.inputAddress2;
  const city = req.body.inputCity;
  // const province = req.body.inputProvince;
  // const district = req.body.inputDistrict;
  const zip = req.body.inputZip;
  const nic = req.body.inputNic;
  const userId = req.body.userId;


  // "UPDATE table_name  SET column1 = value1, column2 = value2, ...  WHERE condition;"
    db.start.query('UPDATE users SET ? WHERE id=?', [{ FirstName: fname, LastName: lname, Email: email, Address1: address1, Address2: address2, City: city, Zip: zip, NicNo: nic }, userId], (error, result) => {
      if (error) {
        console.log(error)
        res.status(400);
        res.json({ working: "error" });
        res.end();
      } else {
        res.status(200);
        res.redirect("back");
      }
    });
};
