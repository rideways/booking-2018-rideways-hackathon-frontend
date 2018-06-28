import React, { Component } from 'react';
import AttractionRideListItem from '../AttractionRideListItem/AttractionRideListItem.jsx';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';

class AttractionRidesList extends Component {

    constructor(props) {
        super(props);

        this.renderAttractionListItems = this.renderAttractionListItems.bind(this);

        //explicitly bind hoisted functions to this on lexical scope.
        this.state = {
            attractions: this.props.attractions,
        };
    }

    renderAttractionListItems() {
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
        return <Grid>{this.renderAttractionListItems()}</Grid>
    }
}

AttractionRidesList.propTypes = {
    attractions: PropTypes.arrayOf(PropTypes.object),
};

module.exports = AttractionRidesList;