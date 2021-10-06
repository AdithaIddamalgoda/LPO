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

            console.log("decoded");
            console.log(decoded);


            db.start.query('UPDATE users SET location = POINT(?, ?) WHERE id = ?', [req.body.lng, req.body.lat, decoded.id], (error, result) => {
                // console.log(result)
                if (!result) {
                    res.status(200);
                    res.json({ working: "error:\n" + error });
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

exports.confirmCovidRequestStatus = async (req, res, next) => {
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

            console.log("phiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", req.body)
            db.start.query('UPDATE phirequests SET covidRequestStatus = ? WHERE phiReqID = ?', [req.body.status, req.body.id], (error, result) => {
                // console.log(result)
                if (!result) {
                    res.status(400);
                    res.json({ working: error });
                    res.end();

                }
                else{
                    res.status(200);
                    res.json({ working: true });
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