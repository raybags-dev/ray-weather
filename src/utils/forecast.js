const request = require('request');

const forecast = (latitude, longitude, callback) => {

   const url = 'https://api.darksky.net/forecast/f86d94aaafd8dfb5eb967f0a69fef024/' + latitude + ',' + longitude + '?units=si&exclude=flags';

   request({ url: url, json: true }, async (error, { body }) => {
      try {

         if (error) {
            callback(`_INTERNET_DISCONNECTED: Check network connection! Weather service from (${error.host}) is unavailable! :(`, undefined);

         } else if (body.error) {
            callback(`error_code: [${body.code}] ${body.error}: try again later`, undefined);

         } else {
            callback(undefined, `Current temperature of ${body.currently.temperature}℃  , It's ${body.daily.data[0].summary} There's a ${body.currently.precipProbability}% chance of rain. If you are driving, windspeed is ${body.currently.windSpeed}-km/h.`)

         }
      } catch (error) {
         console.log(error.message)
      }

   });

}
module.exports = forecast;