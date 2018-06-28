import React, { Component } from 'react';
import AttractionRideListItem from '../AttractionRideListItem/AttractionRideListItem.jsx';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import axios from 'axios';

class AttractionRidesList extends Component {

    constructor(props) {
        super(props);

        this.renderAttractionListItems = this.renderAttractionListItems.bind(this);

        //explicitly bind hoisted functions to this on lexical scope.
        this.state = {
            attractions: [],
        };
    }

    componentDidMount() {

        // TODO: GET CITY USING MOBILE LOCATION.
        var userCity = 'amsterdam'; //todo: STOP HARD CODING.

        //Make the inital request to get the list of attractions here
        axios.get(`http://localhost:8080/attractions/${userCity}`)
            .then((response) => {

                // Parse the resopnse into an array and update the state.
                this.setState({
                    attractions: response.data
                });
            });
    }

    renderAttractionListItems() {
        debugger;
        return this.state.attractions.map((currentAttraction, index) => {
            return (
                <AttractionRideListItem
                    key={`rw-booking-hack__attraction-${index}`}
                    {...currentAttraction}
                />
            )
        });
    }

    render() {
        debugger;
        return <Grid>{this.renderAttractionListItems()}</Grid>
    }
}

module.exports = AttractionRidesList;