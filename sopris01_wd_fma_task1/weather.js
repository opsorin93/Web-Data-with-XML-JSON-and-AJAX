//Sorin Raducu Oprisa - 13302389 - FMA WD Task 1
 
$(document).ready(function displayWeather() {
    setTimeout(function() {
        $.ajax( {
            url:'weather.json',
            type: 'GET',
	       dataType: 'json',
            success: function(response){
                var weatherTxt = '<thead><tr><th>City</th><th>Conditions</th><th>Temperature</th><th>Wind Speed</th><th>Wind Direction</th><th>Wind Chill Factor</th></thead>';
                $.each(response.weather, function(index) {
                    weatherTxt += '<tr><td>' + response.weather[index].cityName + '</td><td id = conditions>'  + response.weather[index].currentConditions + 
                    displayWeatherIcon(response.weather[index].currentConditions) + '</td><td>' +
                    response.weather[index].temperature + '&deg;c</td><td>' + response.weather[index].windSpeed + ' km/h</td><td>' + response.weather[index].windDirection + '</td><td>' + response.weather[index].windChillFactor + '</td></tr>';        
                });
                $('.citiesTable').append(weatherTxt);
                $('.error').innerHTML = ''; 
            },
            error: function() {
                $('.error').html('<p>Error fetching the data !</p>'); 
                $('.citiesTable').innerHTML = ''; 
            }     
        }); 
    }, 200);
});

function displayWeatherIcon(icon) {
    switch (icon) {
        case "Clouds":
            icon = '<img src="./weather_icons/cloud.png" style =" width: 7%; margin-left: 1em;">';
            break;
         case "Hail":
            icon = '<img src="./weather_icons/hail.png" style =" width: 7%; margin-left: 1em;">';
            break;
         case "Heavy Cloud":
            icon = '<img src="./weather_icons/heavy cloud.png" style =" width: 7%; margin-left: 1em;">';
            break;
         case "Heavy Rain":
            icon = '<img src="./weather_icons/heavy rain.png" style =" width: 7%; margin-left: 1em;">';
            break;
         case "Rain":
            icon = '<img src="./weather_icons/rain.png" style =" width: 7%; margin-left: 1em;">';
            break;
         case "Sleet":
            icon = '<img src="./weather_icons/sleet.png" style =" width: 7%; margin-left: 1em;">';
            break;
         case "Snow":
            icon = '<img src="./weather_icons/snow.png" style =" width: 7%; margin-left: 1em;">';
            break;
         case "Sun and Clouds":
            icon = '<img src="./weather_icons/sun and cloud.png" style =" width: 7%; margin-left: 1em;">';
            break
         case "Sun":
            icon = '<img src="./weather_icons/sun.png" alt="sun" style =" width: 7%; margin-left: 1em;">';
            break;
         case "Thunderstorm":
            icon = '<img src="./weather_icons/thunderstorm.png" style =" width: 7%; margin-left: 1em;">';
            break;
        default:
            icon = '';
            break;
    }
    return icon;
}