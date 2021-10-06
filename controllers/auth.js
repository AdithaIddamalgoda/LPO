const jwt = require('jsonwebtoken');
const db = require('../model/db');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const getPhiID = async (userID) => {
  return new Promise((resolve, reject) => {
    try {
      db.start.query('SELECT * FROM users us, phitable pht  WHERE us.id = pht.userID AND us.id=?', [userID], async (phierror, phiresults) => {
        if (phiresults.length === 0) {
          reject()
        }
        else{
          resolve(phiresults[0].phiID);
        }
      })
    }
    catch(err) {
      console.log(err);
      reject("reject phi error");
    }
  });
}


// exports.login = async (req, res, next) => {
exports.login = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  // 1) Check if email and password exist
  if (!email || !password) {
    return res.status(400).render("login", {
      message: 'Please provide email and password'
    });
  }


  // 2) Check if user exists && password is correct
  db.start.query('SELECT * FROM users WHERE Email = ?', [email], async (error, results) => {
    console.log(results);
    console.log(password);
    const isMatch = await bcrypt.compare(password, results[0].Password);
    console.log(isMatch);
    if (!results || !isMatch) {
      return res.status(401).render("login", {
        message: 'Incorrect Email or password'
      });
    } else {
      // 3) If everything ok, send token to client
      const id = results[0].id;
      const tokenBody =  {
        id: results[0].id,  
      };
      if (results[0].roleID == 2) {
        try {
          tokenBody["phiID"] = await getPhiID(results[0].id);
        }
        catch (err) {
          res.status(400).redirect("/login");
          console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",err);
        }
    }
      console.log(id);
      const token = jwt.sign(tokenBody, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,  
      });
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n", tokenBody)
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
      };
      res.cookie('jwt', token, cookieOptions);
      if (results[0].roleID == 1) {
        res.status(200).redirect("/");
      }
      if (results[0].roleID == 2) {
        res.status(200).redirect("/phiHome");
      }
      if (results[0].roleID == 3) {
        res.status(200).redirect("/");
      }
      if (results[0].roleID == 4) {
        res.status(200).redirect("/");
      }
    }
  });
};

exports.register = (req, res) => {
  //console.log(req.body);
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const address1 = req.body.inputAddress1;
  const address2 = req.body.inputAddress2;
  const city = req.body.inputCity;
  const province = req.body.inputProvince;
  const district = req.body.inputDistrict;
  const zip = req.body.inputZip;
  const nic = req.body.inputNic;

  // 2) Check if user exists && password is correct
  db.start.query('SELECT Email FROM users WHERE Email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error)
    }

    if (results.length > 0) {
      return res.render('register', {
        message: 'That Email has been taken'
      });
    } else if (password !== confirmPassword) {
      return res.render('register', {
        message: 'Passwords do not match'
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.start.query('INSERT INTO users SET ?', { FirstName: fname, LastName: lname, Email: email, Password: hashedPassword, Address1: address1, Address2: address2, City: city, District: district, Province: province, Zip: zip, NicNo: nic }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        db.start.query('SELECT id FROM users WHERE Email = ?', [email], (error, result) => {
          const id = result[0].id;
          console.log(id);
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
          });

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
          };
          res.cookie('jwt', token, cookieOptions);

          res.status(201).redirect("/");
        });
      }
    });
  });
};

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
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

      // 2) Check if user still exists
      db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
        console.log(result)
        if (!result) {
          return next();
        }
        // THERE IS A LOGGED IN USER
        req.user = result[0];
        // res.locals.user = result[0];
        console.log("next")
        return next();
      });
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).redirect("/");
};


exports.changestatus = (req, res) => {



  console.log(req.body);
  const decoded = (jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRET
  );

  // const userID = req.body.userID;
  // req.user = req.user;
  const id = decoded.id;
  const covidStatusChange = req.body.covidStatusChange;
  const statusChangeDesc = req.body.statusChangeDesc;

  db.start.query('INSERT INTO phiRequests SET ?', { status: covidStatusChange, description: statusChangeDesc, userID: id }, (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      console.log("hi" + jwt)
      res.send("Form Submitted");
    }
  });

};

exports.isLogged = async (req, res, next) => {
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

      db.start.query('SELECT * FROM phirequests WHERE userID = ?', [decoded.id], (error, result) => {
        // console.log(result)
        if (!result) {
          return next();
        }
        // THERE IS A LOGGED IN USER
        req.phireq = result[result.length - 1];
        // res.locals.user = result[0];
        console.log("next")
        return next();
      });
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};

exports.confirmLocation = async (req, res, next) => {
  if (req.cookies.jwt) {
    console.log("inxxxxx")

    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      console.log("decoded");
      console.log(decoded);


      db.start.query('UPDATE users SET location = POINT(?, ?) WHERE id = ?', [req.body.lng, req.body.lat, decoded.id], (error, result) => {
        // console.log(result)
        if (!result) {
          res.status(200);
          res.json({ working: "error:\n"+error });
          res.end();

        }
      });
    } catch (err) {
      res.status(200);
      res.json({ working: err });
      res.end();
    }
  } else {
    res.status(400);
    res.json({ working: "methana" });
    res.end();
  }
};



//phi home page
exports.phiView = async (req, res, next) => {
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

      // 2) spatial query
      db.start.query('SELECT us.*, phr.*, ab.ADM4_PCODE, pht.phiID FROM users us INNER JOIN phirequests phr ON us.id = phr.userID, admin_boundary ab INNER JOIN phitable pht ON pht.adminBoundaryID = ab.ADM4_PCODE WHERE ST_Intersects(us.location, ab.WKT) AND pht.phiID = ?', [decoded.phiID], (error, result) => {
        console.log(result);
        if (!result) {
          return next();
        }
        // Results of users withi the PHI's admin boundary
        req.phiView = result;
        console.log("next")
        return next();
      });
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};