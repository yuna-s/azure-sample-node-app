//var { pki, md, asn1 } = require('node-forge');
var express = require('express');
var router = express.Router();
const { executeSQLquery } = require('../sqltest');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource!!');
});


/* GET home page. */
router.get('/sqltest', function(req, res, next) {
  console.info("Start");
  try {
    executeSQLquery("SELECT * FROM dbo.Customers;").then(ok => {
      return res.render('index', { title: ok});
    }).catch(err => {console.log(err)});

  } catch (error) {
      if (error instanceof Error && error.message === 'UNAUTHORIZED') {
        res.status(401).send();
    } else {
        next(error);
    }
  }

});

module.exports = router;



    // Create connection to database
    


   
    // console.info("Header Validation");
    // const header = req.get('X-ARR-ClientCert');

    // if (!header) throw new Error('UNAUTHORIZED');

    // console.info("Convert PEM to PKI.cert")
    // const pem = `-----BEGIN CERTIFICATE-----${header}-----END CERTIFICATE-----`;
    // const incomingCert = pki.certificateFromPem(pem);

    // const allowedThumbPrint = "4128f41c0bbd97b3df81aba7bf7bc3bbf28dbe78";

    // console.info("Validate Certificate Thumbprint")
    // const ThumbPrint = md.sha1.create().update(asn1.toDer(pki.certificateToAsn1(incomingCert)).getBytes()).digest().toHex();
    // console.info(ThumbPrint)

    // if (ThumbPrint.toLowerCase() !== allowedThumbPrint) throw new Error('UNAUTHORIZED');

    //res.render('index', { title: JSON.stringify(req.headers) });