import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './AttractionRideListItem.scss';
import { Col, Row, Collapse, Button, Well } from 'react-bootstrap';
import axios from 'axios';

export default class AttractionRideListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            availableRides: [],
            resultsLoaded: false,
        };
        //explicitly bind hoisted functions to this on lexical scope.
        this.searchForRates = this.searchForRates.bind(this);
    }

    //todo: setup function to perform a search for rides.
    searchForRates(dropoffAttractionLat, dropoffAttractionLong) {

        debugger;

        //pickup will always be the same - pass this in from props.
        let isOnDemand = true; //TODO: Add support for pre-booked
        let currency = 'GBP'; // Leave for demo
        let language = 'en-gb'; // Leave for demo
        let passengers = 1; // Hardcode to 1
        let pickupDateTime = null; // TODO: For pre-booking get the pickup time right now using moment

        axios.get(`http://localhost:8080/rates?pickup=${this.props.pickupLocation.lat},${this.props.pickupLocation.long}&dropoff=${this.props.dropoffLocation.lat},${this.props.dropoffLocation.long}&language=${language}&currency=${currency}&passengers=${passengers}&apikey=abcde-12345&isOnDemand=${isOnDemand}&pickupdatetime=${pickupDateTime}`
        )
            .then((response) => {
                debugger;

                // Parse the response into state.
                this.setState({
                    availableRides: response.data.journeys[0].legs[0].results,
                    resultsLoaded: true,
                });
            });
    }

    render() {
        return (
            <div className='show-grid rw-booking-hack__attraction-list-item-container'>
                <Row className='rw-booking-hack__attraction-list-item'>
                    <Col className='rw-booking-hack__attraction-name'>{this.props.name}</Col>
                    <Col>
                        <Button
                            className='rw-booking-hack__attraction-list-search-btn'
                            bsStyle="primary"
                            onClick={this.searchForRates}
                        >
                            Search Rides
                    </Button>
                    </Col>
                </Row>
                <Collapse in={this.state.resultsLoaded === true}>
                    <div>
                        <Well>
                            {JSON.stringify(this.state.availableRides)}
                        </Well>
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