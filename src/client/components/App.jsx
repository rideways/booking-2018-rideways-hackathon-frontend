import React, { Component } from 'react';
import AttractionRidesList from './AttractionRidesList/AttractionRidesList.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    //explicitly bind hoisted functions to this on lexical scope.

    this.attractions = [];
  }
  
  //   //Get car info
  //   axios.get('/api/cars')
  //     .then((response) => {
  //       let carsFromApi = [];

  //       //Apply discounts to car prices, if a discount is provided.
  //       if (response.data.discount_percentage) {
  //         const discountPercentage = response.data.discount_percentage;

  //         carsFromApi = response.data.results.map((car) => {
  //           const discountToSubtract = car.price * (discountPercentage * 0.01);
  //           const newCarPrice = car.price - discountToSubtract;
  //           const roundedNewCarPrice = Math.round(newCarPrice * 100) / 100; //Round the new car price to 2 d.p
  //           car.discount = discountPercentage;
  //           car.price = roundedNewCarPrice.toFixed(0);
  //           return car;
  //         })
  //       } else {
  //         carsFromApi = response.data.results;
  //       }

  //       //Ensure we are not showing the same car as previous click
  //       let nextCarToShow;
  //       let carHasBeenShown = true;
  //       let attempt = 0;

  //       //Check over the list of new 5 cars recieved, against existing cars. Show 1 new car.
  //       for (let i = 0; i < carsFromApi.length; i++) {
  //         nextCarToShow = carsFromApi[i];

  //         //If car make and model are same, check the next, otherwise shown this car
  //         if (!this.carHasBeenShown(nextCarToShow)) {
  //           //Now add this car to the list of shown cars
  //           this.shownCars.push(nextCarToShow);

  //           //Update the UI with the new, randomly chosen car
  //           this.setState({
  //             carsToShow: this.shownCars
  //           })

  //           //Only show 1 new car
  //           return;
  //         }
  //         //No new cars on this call to the API
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  render() {
    // const carsToShow = this.state.carsToShow;

    return <div>
      <AttractionRidesList />
    </div>;
  }
}

module.exports = App;