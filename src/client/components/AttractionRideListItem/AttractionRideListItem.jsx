import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './AttractionRideListItem.scss';
import { Col, Row, Collapse, Button, Well, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import { ClipLoader, PulseLoader } from 'react-spinners';

export default class AttractionRideListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // availableRides: [],
            availableRide: null,
            loadingRates: false,
            loadingBooking: false,
        };
        //explicitly bind hoisted functions to this on lexical scope.
        this.searchForRates = this.searchForRates.bind(this);
        this.bookRide = this.bookRide.bind(this);
        // this.renderSearchResults = this.renderSearchResults.bind(this);
    }

    //todo: setup function to perform a search for rides.
    searchForRates(dropoffAttractionLat, dropoffAttractionLong) {

        //pickup will always be the same - pass this in from props.
        let isOnDemand = true; //TODO: Add support for pre-booked
        let currency = 'GBP'; // Leave for demo
        let language = 'en-gb'; // Leave for demo
        let passengers = 1; // Hardcode to 1
        let pickupDateTime = null; // TODO: For pre-booking get the pickup time right now using moment

        this.setState({
            loadingRates: true,
        });

        axios.get(`http://localhost:8080/rates?pickup=${this.props.pickupLocation.lat},${this.props.pickupLocation.long}&dropoff=${this.props.dropoffLocation.lat},${this.props.dropoffLocation.long}&language=${language}&currency=${currency}&passengers=${passengers}&apikey=abcde-12345&isOnDemand=${isOnDemand}&pickupdatetime=${pickupDateTime}`
        )
            .then((response) => {
                console.log(JSON.stringify(response.data.journeys[0].legs[0].results));

                // Parse the response into state.
                this.setState({
                    // availableRides: response.data.journeys[0].legs[0].results,
                    availableRide: response.data.journeys[0].legs[0].results[0],
                    searchReference: response.data.journeys[0].legs[0].searchReference,
                    resultsLoaded: true,
                    loadingRates: false,
                    rideBooked: false,
                });
            });
    }

    bookRide(resultReference = 0, isOnDemand = true, attempt = 1) {

        //build up POST request to book that specific journey           
        axios.post('http://localhost:8080/book', {
            paymentNonce: "fake-valid-nonce",
            isOnDemand: "true",
            affiliateCallbackURL: "https://affiliate.com/callback",
            journeys: [
                {
                    legs: [
                        {
                            searchReference: this.state.searchReference,
                            resultReference: 0
                        }
                    ]
                }
            ],
            // TODO: pass this down from initial page load, as if coming out of booking.com
            request: {
                passenger: {
                    title: "Mr",
                    firstName: "Ivan",
                    lastName: "Hill",
                    email: "james.hill@email.com",
                    cellphone: "07856955865",
                    language: "en-gb",
                    consentToMarketing: "false"
                }
            }
        }
        )
            .then(function (response) {
                debugger;

                console.log(response);

                this.setState({
                    rideBooked: true,
                })
            }.bind(this))
            .catch(function (error) {
                debugger;

                console.log(error);

                //retry
                this.bookRide();
            }.bind(this));
    }

    // renderSearchResults() {
    //     return this.state.availableRides.map((currentRide, index) => {
    //         return (
    //             <div key={`rw-booking-hack__attraction-${index}`}>
    //                 <div>Car: {currentRide.carDetails.model}</div>
    //                 <div>Trip Time (minutes): {currentRide.duration}</div>
    //                 <div>Cost (GBP): {currentRide.price}</div>
    //                 <div>Pickup ETA (seconds): {currentRide.etaInSeconds}</div>
    //             </div>
    //         )
    //     })
    // }

    render() {
        const availableRide = this.state.availableRide;
        debugger;
        return (
            <div className='show-grid rw-booking-hack__attraction-list-item-container' >
                <Row className='rw-booking-hack__attraction-list-item'>
                    <Col className='rw-booking-hack__attraction-name'>{this.props.name}</Col>
                    <Col>
                        {this.state.loadingRates === true
                            ?
                            <ClipLoader color={'#003580'} loading={this.state.loadingRates} />
                            :
                            <Button
                                className='rw-booking-hack__attraction-list-search-btn'
                                bsStyle="primary"
                                onClick={this.searchForRates}
                            >
                                Search Rides
                                    </Button>
                        }
                    </Col>
                </Row>
                <Collapse in={this.state.resultsLoaded === true}>
                    <div>{this.state.availableRide
                        ? <Row className='rw-booking-hack__available-ride-result'>
                            <div className='rw-booking-hack__car-details'>
                                <Col>Car: {this.state.availableRide.carDetails.model}</Col>
                                <Col>Price: {this.state.availableRide.price}</Col>
                            </div>
                            <div className='rw-booking-hack__trip-details'>
                                <Col>ETA: {this.state.availableRide.etaInSeconds}</Col>
                                <Col>Trip time: {this.state.availableRide.duration}</Col>
                            </div>
                            {
                                this.state.rideBooked ?
                                    <Button bsStyle="success">
                                        <Glyphicon glyph="ok" /> Booked!
                                    </Button>
                                    : 
                                    this.state.loadingBooking 
                                        ?
                                            <ClipLoader color={'#003580'} loading={this.state.loadingBooking} />
                                        : 
                                            <Button
                                                className='rw-booking-hack__attraction-list-search-btn'
                                                bsStyle="primary"
                                                onClick={this.bookRide}
                                            >
                                                Book Ride
                                            </Button>
                            }
                        </Row>
                        : <PulseLoader color={'#003580'} loading={this.state.loadingRates} />
                    }
                    </div>
                </Collapse>
            </div>
        )
    }
}

AttractionRideListItem.propTypes = {
    name: PropTypes.string,
    location: PropTypes.object,
    pickupLocation: PropTypes.object,
    dropoffLocation: PropTypes.object,
};