const request = require('request');

const geocode = (address, callback) => {
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmF5LWJhZ3MiLCJhIjoiY2s0Zm5yd2ZtMG9nZzNmcm1nZnA3b2JjayJ9.UQk0NPhB2UpjvATeW5SlWw&limit=1';

   request({ url: url, json: true }, async (error, { body } = {}) => {
      try {
         if (error) {
            callback(`_INTERNET_DISCONNECTED: Check network connection and try again:(`, undefined);

         } else if (body.message) {
            callback(`error_${body.message}: Oops..try again :(`, undefined);

         } else if (body.features[0] === undefined) {
            callback('Location not found :( try another location search.', undefined);

         } else {

            callback(undefined, {
               location: body.features[0].place_name,
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0]
            });

         }

      } catch (err) {
         console.error(err.message);
      }

   });

}
module.exports = geocode;
