var http = require('http');

function printWeather(city, weather) {
  
}
function printError(error) { console.error(error.message); }

var api = {
    getTemp: function get(city) {
        var request = http.get('http://api.openweathermap.org/data/2.5/weather?q=' +
            city + '&units=metric&apikey=c184205bc1fcbcdc42c4b37ccf710de3', responseFunction);

        function responseFunction(response) {
            var body = '';
            response.on('data', function (chunk) { body += chunk; }); //On getting data, do this
            response.on('end', function () {  // on completion, do this
                if (response.statusCode === 200) {
                    try {
                        var weatherAPI = JSON.parse(body);
                          console.log('In ' + weatherAPI.name + ', it is now ' + weatherAPI.main.temp + ' degrees C.');
                    } catch (error) { printError(error); }
                } else {
                    printError({
                        message: 'Error getting weather from ' + city + '. (' +
                        http.STATUS_CODES[response.statusCode] + ')'
                    });
                }
            });
        }
        request.on('error', printError);  // // on getting an error, do this
    },
     getHumidity: function get(city) {
        var request = http.get('http://api.openweathermap.org/data/2.5/weather?q=' +
            city + '&units=metric&apikey=c184205bc1fcbcdc42c4b37ccf710de3', responseFunction);

        function responseFunction(response) {
            var body = '';
            response.on('data', function (chunk) { body += chunk; }); //On getting data, do this
            response.on('end', function () {  // on completion, do this
                if (response.statusCode === 200) {
                    try {
                        var weatherAPI = JSON.parse(body);
                       console.log('In ' + weatherAPI.name + ', it is ' + weatherAPI.main.humidity + ' percent');
                    } catch (error) { printError(error); }
                } else {
                    printError({
                        message: 'Error getting weather from ' + city + '. (' +
                        http.STATUS_CODES[response.statusCode] + ')'
                    });
                }
            });
        }
        request.on('error', printError);  // // on getting an error, do this
    }
}

module.exports = api;
