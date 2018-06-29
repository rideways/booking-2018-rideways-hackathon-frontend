const express = require('express')
const app = express()

// Here mock the responses to the 3 types of reqeust that you'll have to make

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// 1. First request is to get a list of attractions
app.get('/attractions/:city', (req, res) => res.send(
    [{
            name: "Anne Frank House",
            location: {
                placeId: "ChIJSRE-IcUJxkcRCltjPmVdmtQ",
                lat: "52.3752182",
                lon: "4.8817878"
            }
        },
        {
            name: "Van Gogh Museum",
            location: {
                placeId: "ChIJX1rTlu8JxkcRGsV8",
                lat: "52.3584159",
                lon: "4.8788869"
            }
        },
        {
            name: "Madame Tussauds",
            location: {
                placeId: "ChIJ19XKKccJxkcRawZK9nzTJz8",
                lat: "52.3725235",
                lon: "4.8904001"
            }
        },
        {
            name: "Body Worlds",
            location: {
                placeId: "ChIJ3XSZnccJxkcR-rNgffJJMGI",
                lat: "52.3747422",
                lon: "4.8927304"
            }
        },
        {
            name: "Heineken Experience",
            location: {
                placeId: "ChIJSxklPO0JxkcRCqxBkavK008",
                lat: "52.3578313",
                lon: "4.8896362"
            }
        }
    ]
));

// 2. Second request is to get a list of rates for a given attraction
// NB : Here we are assuming that the correct query parameters have been sent through. req.query.param
app.get('/rates/', (req, res) => res.json({
    "journeys": [{
        "legs": [{
            "searchReference": "SEARCH-b6a62ed1-35d5-4357-99df-7cde98264ec8",
            "resultReference": 0,
            "pickupLocation": {
                "description": "London, London, GB",
                "latLng": {
                    "latitude": 51.510665560169485,
                    "longitude": -0.16719818115234375
                }
            },
            "dropoffLocation": {
                "description": "London, London, GB",
                "latLng": {
                    "latitude": 51.49591970845512,
                    "longitude": -0.10883331298828125
                }
            },
            "results": [{
                    "resultReference": 0,
                    "predictedPickupDateTime": "2018-06-27T13:48+0100",
                    "bags": 2,
                    "meetAndGreet": true,
                    "publicTransport": false,
                    "imageUrl": "https://ondemand-booking.qa.someonedrive.me/images/matts-taxi.png",
                    "drivingDistance": 17.78,
                    "duration": 24,
                    "maxPassenger": 2,
                    "price": "33.33",
                    "currency": "GBP",
                    "twentyFourHourCancellation": false,
                    "twoHourCancellation": false,
                    "nonRefundable": false,
                    "carDetails": {
                        "model": "Tesla Model S",
                        "modelDescription": "Executive limousine (Tesla Model S)",
                        "description": "Super Special Taxi"
                    },
                    "link": "/bookingDetails/a3b92f6c-2323-4e44-a80c-b66a888880b9/2?affiliateCode=rideways",
                    "supplierCategory": "GOLD",
                    "etaInSeconds": 658
                },
                {
                    "resultReference": 1,
                    "predictedPickupDateTime": "2018-06-27T13:46+0100",
                    "bags": 2,
                    "meetAndGreet": true,
                    "publicTransport": false,
                    "imageUrl": "https://ondemand-booking.qa.someonedrive.me/images/schrodingers-cab.png",
                    "drivingDistance": 17.78,
                    "duration": 24,
                    "maxPassenger": 6,
                    "price": "88.88",
                    "currency": "GBP",
                    "twentyFourHourCancellation": false,
                    "twoHourCancellation": false,
                    "nonRefundable": false,
                    "carDetails": {
                        "model": "Tesla Model S",
                        "modelDescription": "Executive limousine (Tesla Model S)",
                        "description": "Schrodinger's Cab"
                    },
                    "link": "/bookingDetails/a3b92f6c-2323-4e44-a80c-b66a888880b9/2?affiliateCode=rideways",
                    "supplierCategory": "GOLD",
                    "etaInSeconds": 538
                },
                {
                    "resultReference": 2,
                    "predictedPickupDateTime": "2018-06-27T13:40+0100",
                    "bags": 2,
                    "meetAndGreet": true,
                    "publicTransport": false,
                    "imageUrl": "https://ondemand-booking.qa.someonedrive.me/images/gett.png",
                    "drivingDistance": 17.78,
                    "duration": 24,
                    "maxPassenger": 4,
                    "price": "20.71",
                    "currency": "GBP",
                    "twentyFourHourCancellation": false,
                    "twoHourCancellation": false,
                    "nonRefundable": false,
                    "carDetails": {
                        "model": "Tesla Model S",
                        "modelDescription": "Executive limousine (Tesla Model S)",
                        "description": "Business Class"
                    },
                    "link": "/bookingDetails/a3b92f6c-2323-4e44-a80c-b66a888880b9/2?affiliateCode=rideways",
                    "supplierCategory": "GOLD",
                    "etaInSeconds": 179
                },
                {
                    "resultReference": 3,
                    "predictedPickupDateTime": "2018-06-27T13:40+0100",
                    "bags": 2,
                    "meetAndGreet": true,
                    "publicTransport": false,
                    "imageUrl": "https://ondemand-booking.qa.someonedrive.me/images/gett.png",
                    "drivingDistance": 17.78,
                    "duration": 24,
                    "maxPassenger": 4,
                    "price": "20.41",
                    "currency": "GBP",
                    "twentyFourHourCancellation": false,
                    "twoHourCancellation": false,
                    "nonRefundable": false,
                    "carDetails": {
                        "model": "Tesla Model S",
                        "modelDescription": "Executive limousine (Tesla Model S)",
                        "description": "Business Class XL"
                    },
                    "link": "/bookingDetails/a3b92f6c-2323-4e44-a80c-b66a888880b9/2?affiliateCode=rideways",
                    "supplierCategory": "GOLD",
                    "etaInSeconds": 179
                }
            ],
            "passenger": 2,
            "selfLink": "/rideways/rates/SEARCH-b6a62ed1-35d5-4357-99df-7cde98264ec8"
        }]
    }]
}));

// 3. Third request is to try and book a given taxi
app.post('/book/', (req, res) => {

    // TODO: interpret the posted data.

    // TO START: Just fake a resopnse to the post request.
    setTimeout((function () {
        res.json({
            "bookingReference": "10003311",
            "affiliateReference": null
        });
    }), 3000);

});

app.listen(8084, () => console.log('Mock testing server serving up fake responses from port 8084!'))