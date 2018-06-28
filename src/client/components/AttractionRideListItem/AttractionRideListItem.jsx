import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './AttractionRideListItem.scss';
import { Col, Row, Collapse, Button, Well } from 'react-bootstrap';

export default class AttractionRideListItem extends Component {

    constructor(props) {
        super(props);

        //explicitly bind hoisted functions to this on lexical scope.

        this.attractions = [];
    }

    //todo: setup function to perform a search for rides.

    render() {
        return (
            <Row className='show-grid rw-booking-hack__attraction-list-item'>
                <Col className='rw-booking-hack__attraction-name'>{this.props.name}</Col>
                <Col>
                    <Button className='rw-booking-hack__attraction-list-search-btn' bsStyle="primary">Search Rates</Button>
                </Col>
                <Collapse>
                    <div>
                        <Well>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred nesciunt sapiente
                            ea proident.
                        </Well>
                    </div>
                </Collapse>
            </Row>
        )
    }
}

AttractionRideListItem.propTypes = {
    name: PropTypes.string,
    location: PropTypes.object,
};