var express = require('express');
var router = express.Router();
const computer = require("../models/computer")
const kaoyan = require("../models/kaoyan")
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.send("connect")
});


router.get("/getWords", async(req, res, next) => {
    let count, Voca;
    let { currentPage, range, which } = req.query;
    currentPage = parseInt(currentPage)
    range = parseInt(range)
    let skip = (currentPage - 1) * range;
    if (which === 'computer') {
        Voca = computer;
    } else if (which === 'kaoyan') {
        Voca = kaoyan;
    };

    if (typeof currentPage !== 'number' || typeof range !== 'number') {
        throw new TypeError("参数不是数值类型")
    }

    await Voca.countDocuments(null, (err, num) => {
        if (err) throw err;
        count = num;
    });

    await Voca.find({}, { _id: false, __v: false }).limit(range).skip(skip).exec((err, doc) => {
        if (err) throw err;

        let backVal = {
            count,
            docs: doc
        }
        res.json(backVal);

    })


})
module.exports = router;