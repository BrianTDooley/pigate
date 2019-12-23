 var express = require("express");
 var app = express();
 var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
 var zapper = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
 var Gpio2 = require('onoff').Gpio; //include onoff to interact with the GPIO
 var ping = new Gpio2(26, 'out'); //use GPIO pin 26, and specify that it is outp$

 /* serves zapper page */
 app.get("/zapper", function(req, res) {
    console.log(new Date(), 'i have been zapped');
    zapper.writeSync(1); // Turn ZAPPER on 
    sleep(4000);
    zapper.writeSync(0); // Turn ZAPPER off
    res.sendFile('./index.htm' , { root : __dirname});
 });

 /* serves zapper page */
 app.get("/ping", function(req, res) {
    console.log(new Date(), 'i have been pinged');
    ping.writeSync(1); // Turn ping on 
    sleep(1000);
    ping.writeSync(0); // Turn ping off
    res.json({msg: 'ok'});
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
