import React, { Component } from 'react';

class AttractionRideListItem extends Component {

    constructor(props) {
        super(props);

        //explicitly bind hoisted functions to this on lexical scope.

        this.attractions = [];
    }

    render() {
        return (
            <div>
                <div className='rw-booking-hack__attraction-list-item-container'>
                    <div className='rw-booking-hack__attraction-list-item-row'>
                        <span className='rw-booking-hack__attraction-name'>A TEST ATTRACTION</span>
                        <span className='rw-booking-hack__attraction-eta'>A TEST ETA</span>
                        <span className='rw-booking-hack__attraction-price'>A TEST ATTRACTION PRICE</span>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = AttractionRideListItem;