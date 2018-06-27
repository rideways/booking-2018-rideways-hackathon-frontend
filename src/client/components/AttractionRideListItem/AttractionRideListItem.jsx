import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './AttractionRideListItem.scss';

export default class AttractionRideListItem extends Component {

    constructor(props) {
        super(props);

        //explicitly bind hoisted functions to this on lexical scope.

        this.attractions = [];
    }

    //todo: setup function to perform a search for rides.

    render() {
        return (
            <div>
                <div className='rw-booking-hack__attraction-list-item-container'>
                    <div className='rw-booking-hack__attraction-list-item-row'>
                        <span className='rw-booking-hack__ride-type'>{this.props.name}</span>
                        <button className='rw-booking-hack__search-rides'>Search Rides</button>
                    </div>
                </div>
                {/* todo: use state flag to render a list of retrieved ride rates. */}
            </div>
        )
    }
}

AttractionRideListItem.propTypes = {
    name: PropTypes.string,
    location: PropTypes.object,
};