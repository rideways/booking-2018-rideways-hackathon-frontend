import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './AttractionRideListItem.scss';
import { Col, Row, Collapse, Button, Well, Glyphicon, Alert } from 'react-bootstrap';
import axios from 'axios';
import { ClipLoader, PulseLoader } from 'react-spinners';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import moment from 'moment';

export default class AttractionRideListItem extends Component {

    constructor(props) {
        super(props);
        console.log('received pickup time: ' + this.props.prebookPickupTime.toString());
        this.state = {
            // availableRides: [],
            availableRide: null,
            loadingRates: false,
            loadingBooking: false,
            showConfirmation: false,
            isOnDemandChosen: this.props.isOnDemand,
            preBookedPickupTime: this.props.prebookPickupTime
        };
        //explicitly bind hoisted functions to this on lexical scope.
        this.searchForRates = this.searchForRates.bind(this);
        this.bookRide = this.bookRide.bind(this);
        this.confirmBookingChoice = this.confirmBookingChoice.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(date) {
        this.setState({ preBookedPickupTime: date });
    }

    confirmBookingChoice() {
        confirmAlert({
            title: 'Book this ride?',
            message: `Are you sure you want to book this ride? ${this.props.isOnDemand ? ` arriving ASAP in ${this.state.availableRide.etaInSeconds} seconds` : `at ${this.state.preBookedPickupTime.toString()}`} from your current location to ${this.props.name} for ${this.state.availableRide.price} ${this.state.availableRide.currency}?.`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.bookRide()
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        })
    };

    //todo: setup function to perform a search for rides.
    searchForRates(dropoffAttractionLat, dropoffAttractionLong) {

        //pickup will always be the same - pass this in from props.
        // let isOnDemand = isOnDemandChosen; //TODO: uncomment when actually implementi
        let isOnDemand = this.props.isOnDemand;
        // let isOnDemand = true;
        let currency = 'GBP'; // Leave for demo
        let language = 'en-gb'; // Leave for demo
        let passengers = 1; // Hardcode to 1
        debugger;
        let pickupDateTime = moment().add(5, 'hours').format().slice(0, -6);


        //TODO: IMPLEMENT MINIMUM PICKUP LEAD TIME.

        if (this.props.isOnDemand === false) {

            debugger;

            var minPreBookedPickupTime = this.props.prebookPickupTime;

            //todo: use moment to check if time is min 2 hours ahead if pre-booked.

            var minPreBookedPickupTimeString = minPreBookedPickupTime.format().slice(0, -6);

            console.log('New pickup date time with a 2 hour lead time: ' + minPreBookedPickupTimeString);

            pickupDateTime = minPreBookedPickupTimeString;
        } //otherwise leave null

        this.setState({
            loadingRates: true,
        });

        axios.get(`http://localhost:8080/rates?pickup=${this.props.pickupLocation.lat},${this.props.pickupLocation.long}&dropoff=${this.props.dropoffLocation.lat},${this.props.dropoffLocation.long}&language=${language}&currency=${currency}&passengers=${passengers}&isOnDemand=${isOnDemand}&pickupdatetime=${pickupDateTime}`
        )
            .then((response) => {
                console.log('Rates retrieved: ' + JSON.stringify(response.data));

                // Parse the response into state.
                this.setState({
                    // availableRides: response.data.journeys[0].legs[0].results,
                    availableRide: response.data.journeys[0].legs[0].results[0],
                    searchReference: response.data.journeys[0].legs[0].searchReference,
                    resultsLoaded: true,
                    loadingRates: false,
                    rideBooked: false,
                });
            }).catch((error) => {

                console.log('error in loading rates');

                this.setState({
                    loadingRates: false,
                });
            });
    }

    bookRide(resultReference, isOnDemand = true, attempt = 1) {

        debugger;
        let resultReferenceAttempt = null;
        if (this.props.isOnDemand === true) {
            resultReferenceAttempt = 0;
        } else {
            resultReferenceAttempt = 1;
        }

        this.setState({
            loadingBooking: true,
        });

        const httpClient = axios.create();
        httpClient.defaults.timeout = 400000000;

        let urlToQuery = '';

        if (this.props.onDemand === true) {
            urlToQuery = 'http://localhost:8080/book';
        } else {
            urlToQuery = 'http://localhost:8084/book';
        }

        //build up POST request to book that specific journey           
        httpClient.post(urlToQuery, {
            paymentNonce: "fake-valid-nonce",
            isOnDemand: this.props.isOnDemand,
            affiliateCallbackURL: "https://affiliate.com/callback",
            journeys: [
                {
                    legs: [
                        {
                            searchReference: this.state.searchReference,
                            resultReference: resultReferenceAttempt,
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
                    loadingBooking: false,
                })
            }.bind(this))
            .catch(function (error) {
                // debugger;
                console.log('RETRYING;');
                console.log(error);

                this.setState({
                    loadingBooking: false,
                })

                //retry
                if (this.props.isOnDemand) {
                    this.bookRide();
                }
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
                            {/* <div>{this.state.isOnDemandChosen === true ? 'On Demand: ' : 'Pre-booked: '}</div> */}
                            <div className='rw-booking-hack__car-details'>
                                <Col>Car: {this.state.availableRide.carDetails.model}</Col>
                                <Col>Price: {this.state.availableRide.price} {this.state.availableRide.currency} </Col>
                            </div>
                            <div className='rw-booking-hack__trip-details'>
                                <Col>{this.state.availableRide.etaInSeconds ? `ETA: ${this.state.availableRide.etaInSeconds}` : null}</Col>
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
                                            onClick={this.confirmBookingChoice}
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
    prebookPickupTime: PropTypes.object,
    isOnDemand: PropTypes.bool,
};