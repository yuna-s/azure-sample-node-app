var express = require('express');
var router = express.Router();

const sleep = (millisec) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, millisec);
    });
};

/* GET users listing. */
router.get("/", (req, res, next) => {
    (async () => {
        console.log("start sleeping");
         // 240秒
        await sleep(240*1000);
        res.send('Timeout!!');
    })().catch(next);;
});


/* GET users listing. */
router.get("/250", (req, res, next) => {
    (async () => {
        console.log("start sleeping");
         // 250秒
        await sleep(250*1000);
        res.send('Timeout!!');
    })().catch(next);;
});

/* GET users listing. */
router.get("/402", (req, res, next) => {
    (async () => {
        res.status(402).send('http status test');
    })().catch(next);;
});



module.exports = router;
