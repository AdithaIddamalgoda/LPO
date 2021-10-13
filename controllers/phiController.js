const jwt = require('jsonwebtoken');
const db = require('../model/db');
const { promisify } = require('util');

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
        db.start.query('SELECT us.*, phr.*, ab.ADM4_PCODE, pht.phiID FROM users us INNER JOIN phirequests phr ON us.id = phr.userID, admin_boundary ab INNER JOIN phitable pht ON pht.adminBoundaryID = ab.ADM4_PCODE WHERE ST_Intersects(us.location, ab.WKT) AND pht.phiID = ? AND phr.phiReqID IN (SELECT MAX(PHR.phiReqID) FROM users us INNER JOIN phirequests phr ON us.id = phr.userID, admin_boundary ab INNER JOIN phitable pht ON pht.adminBoundaryID = ab.ADM4_PCODE WHERE ST_Intersects(us.location, ab.WKT)GROUP by PHR.userID);', [decoded.phiID], (error, result) => {
          console.log(result);
          if (!result) {
            return next();
          } else {
            console.log("*************************************************************\n", result)
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

exports.phiUserHistory = async (req, res, next) => {
    console.log("id ekaaa ", req.params.userID)

    if (req.cookies.jwt && req.params.userID) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            db.start.query('SELECT phr.*, us.*, ab.ADM4_PCODE, pht.phiID FROM users us INNER JOIN phirequests phr ON us.id = phr.userID, admin_boundary ab INNER JOIN phitable pht ON pht.adminBoundaryID = ab.ADM4_PCODE WHERE ST_Intersects(us.location, ab.WKT) AND pht.phiID = ? AND us.id = ? ORDER BY phr.phiReqID DESC ', [decoded.phiID, req.params.userID], (error, result) => {
                if (!result) {
                    res.status(400);
                    res.json({ working: error });
                    res.end();
                }
                else {
                    for(let i = 0; i < result.length; i++) {
                        if (i == 0){
                            result[i]["latest"] = false;
                        } else {
                            result[i]["latest"] = true;
                        }
                    }
                    req.phiUserHistory = result
                    console.log(result)
                    return next();
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

exports.getPhiReqById = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            db.start.query('SELECT DISTINCT * FROM phirequests WHERE phiReqID = ?', [req.params.id], (error, result) => {
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
