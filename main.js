 var express = require("express");
 var app = express();
 var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
 var ZAPPER = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output

 /* serves zapper page */
 app.get("/zapper", function(req, res) {
    console.log('i have been zapped');
    ZAPPER.writeSync(1); // Turn ZAPPER on 
    sleep(4000);
    ZAPPER.writeSync(0); // Turn ZAPPER off
    res.sendFile('./index.htm' , { root : __dirname});
 });

 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendfile( __dirname + req.params[0]); 
 });

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
