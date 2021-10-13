const jwt = require('jsonwebtoken');
const db = require('../model/db');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');



exports.confirmLocation = async (req, res, next) => {
    if (req.cookies.jwt) {
        console.log("inxxxxx")

        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            db.start.query('UPDATE users SET location = POINT(?, ?) WHERE id = ?', [req.body.lng, req.body.lat, decoded.id], (error, result) => {
                // console.log(result)
                if (!result) {
                    res.status(400);
                    res.json({
                        working: "error:\n" + error
                    });
                    res.end();

                }
            });
        } catch (err) {
            res.status(200);
            res.json({
                working: err
            });
            res.end();
        }
    } else {
        res.status(400);
        res.json({ working: "methana" });
        res.end();
    }
};

exports.confirmCovidRequestStatus = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            db.start.query('UPDATE phirequests SET covidRequestStatus = ? WHERE phiReqID = ?', [req.body.status, req.body.reqID]);
                        
            if (req.body.status == 1) {
                db.start.query('UPDATE users SET currentCovidStatus = ? WHERE id = ?', [req.body.currentCovidStatus, req.body.userID]);
            }
            if (req.body.status == 0) {
                db.start.query('UPDATE users SET currentCovidStatus = 0 WHERE id = ?', [req.body.userID]);
            }
            res.status(200);
            res.json({ working: true });
            res.end();
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
