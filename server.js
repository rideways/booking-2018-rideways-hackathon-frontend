var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(__dirname));

//configure port variable to run on both azure and locally
var port = process.env.PORT || 9000;

app.listen(port, function () {
  console.log('Booking.com Hack 2018 - Rideways Attractions!');
});