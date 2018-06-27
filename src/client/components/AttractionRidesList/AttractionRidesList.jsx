import React, { Component } from 'react';
import AttractionRideListItem from '../AttractionRideListItem/AttractionRideListItem.jsx';

class AttractionRidesList extends Component {

    constructor(props) {
        super(props);

        //explicitly bind hoisted functions to this on lexical scope.
        // this.state = {
        //     slider: this.props.sliderItems,
        //     activeIndex: this.props.defaultActiveIndex,
        //     left: 0,
        // };

        this.attractions = [];
    }

    // renderAttractionListItems() {
    //     return
    // }

    render() {
        return <div><AttractionRideListItem /></div>
    }
}

module.exports = AttractionRidesList;