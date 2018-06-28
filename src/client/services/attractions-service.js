export default class AttractionsService {
    find(options) {
        options = deeplinkToSearchApi(options);
        options = removeInvalidKeys(options);
        options = setDefaultValues(options);
        let queryParams = [`apikey=${apiKey}`];
        const errors = notValidParameters(options);

        if (errors.length) {
            return Promise.reject(errors);
        }

        options = applyTransforms(options);

        queryParams = queryParams.concat(queryParamsFor(orderDetails, this));
        queryParams = queryParams.concat(queryParamsFor(tripParams, options));
        queryParams = queryParams.concat(
            queryParamsFor(['pickupestablishment', 'dropoffestablishment'], options),
        );

        if (options.hasOwnProperty('return') && options.return) {
            queryParams = queryParams.concat(queryParamsFor(['return', 'returndatetime'], options));
        }
        winston.info(`INFO: ${ratesEndpoint}?${queryParams.join('&')}`);
        return request
            .get(`${ratesEndpoint}?${queryParams.join('&')}`)
            .then(response => {
                const parsedResponse = JSON.parse(response);
                storeResponse(parsedResponse, response);
                return parsedResponse;
            })
            .then(this.transformResponse);
    }
}