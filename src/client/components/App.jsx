import React, { Component } from 'react';

// import ReactDOM from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AttractionRidesList from './AttractionRidesList/AttractionRidesList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <header className='rw-booking-hack__header' >
        <img src={'/dist/images/booking-logo-b.png'} />
        <h4 className="rw-booking-hack__header-text">BookingGo Rides - Nearby Attractions:</h4>
      </header >

      <AttractionRidesList />
    </div >;
  }
}

module.exports = App;