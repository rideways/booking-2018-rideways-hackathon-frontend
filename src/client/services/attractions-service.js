import axios from 'axios';

export default class AttractionsService {
    getAttractions() {        
        return axios.get(`http://localhost:8080/attractions/${userCity}`)
            .then((response) => {

                // Parse the resopnse into an array and update the state.
                return response.data;
            });
    }
}