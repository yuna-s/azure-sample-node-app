var express = require('express');
var router = express.Router();
var axios = require('axios');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const refreshTokens= () => {
  const xhr= new XMLHttpRequest();
  xhr.open('GET', '/.auth/me');
  xhr.onreadystatechange=function() {
    if (xhr.readyState === 4){   //if complete
        if(xhr.status === 200){  //check if "OK" (200)
          console.log("Token refresh completed successfully.");
        } else {
          console.log("Token refresh failed. See application logs for details.");
        }
    } 
  }
  xhr.send();
}


/* GET users listing. */
router.get('/', function(req, res, next) {
    const headers = JSON.stringify(req.headers);
    refreshTokens();
    res.send(headers);
});

/* GET users listing. */
router.get('/refresh', function(req, res, next) {
  let refreshUrl = "https://"+req.headers.host+"/.auth/refresh";

  refreshTokens(refreshUrl);
  res.render('index',{
    title: 'token refreshed. EP:'+refreshUrl
  });
});


module.exports = router;
