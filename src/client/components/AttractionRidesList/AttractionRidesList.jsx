import React, { Component } from 'react';
import AttractionRideListItem from '../AttractionRideListItem/AttractionRideListItem.jsx';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import styles from './AttractionRidesList.scss';

class AttractionRidesList extends Component {

    constructor(props) {
        super(props);

        this.renderAttractionListItems = this.renderAttractionListItems.bind(this);
        this.getUserLocation = this.getUserLocation.bind(this);

        //explicitly bind hoisted functions to this on lexical scope.
        this.state = {
            attractions: [],
            loading: true,
        };
    }

    getUserLocation() {
        var userCity = ''; //todo: STOP HARD CODING.

        var options = {
            enableHighAccuracy: true,
            fallbackToIP: true, // fallback to IP if Geolocation fails or rejected
            addressLookup: true
        };

        geolocator.config({
            language: "en",
            google: {
                version: "3",
                key: "AIzaSyC48NfaeD0nF8CmKFJ2aFCa1ZN-I6ZeQKI"
            }
        });

        geolocator.locate(options, function (err, location) {
            userCity = location.address.city;

            //Make the inital request to get the list of attractions here
            axios.get(`http://localhost:8080/attractions/${userCity}`)
                .then((response) => {
                    // Parse the resopnse into an array and update the state.
                    this.setState({
                        userLocation: location,
                        attractions: response.data,
                        loading: false,
                    });
                });
        }.bind(this));
    }

    componentDidMount() {
        // this.getUserLocation();

        navigator.geolocation.getCurrentPosition((position) => {
            //Make the inital request to get the list of attractions here
            axios.get(`http://localhost:8080/attractions?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
                .then((response) => {
                    // Parse the resopnse into an array and update the state.
                    this.setState({
                        userLocation: position,
                        attractions: response.data,
                        loading: false,
                    });
                });
        });
    }

    renderAttractionListItems() {
        return this.state.attractions.map((currentAttraction, index) => {
            console.log(`current attraction: ${currentAttraction.name} dropoff lat: ${currentAttraction.geometry.location.lat}, dropoff long: ${currentAttraction.geometry.location.lng}`);
            return (
                <AttractionRideListItem
                    key={`rw-booking-hack__attraction-${index}`}
                    {...currentAttraction}
                    pickupLocation={
                        {
                            lat: this.state.userLocation.coords.latitude,
                            long: this.state.userLocation.coords.longitude,
                        }
                    }
                    dropoffLocation={
                        {
                            lat: currentAttraction.geometry.location.lat,
                            long: currentAttraction.geometry.location.lng,
                        }
                    }
                />
            )
        });
    }

    render() {
        return this.state.loading === false ?
            <Grid>{this.renderAttractionListItems()}</Grid> :
            <div className='rw-booking-hack__loader'>
                <PulseLoader
                    color={'#003580'}
                    loading={this.state.loading}
                />
            </div>
    }
}

module.exports = AttractionRidesList;