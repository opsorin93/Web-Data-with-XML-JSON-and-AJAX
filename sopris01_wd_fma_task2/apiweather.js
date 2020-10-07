$(document).ready(function() {
    $('#countries').change(function() {
        $('#cities').load($(this).val() + '-cities.html');
        $('#cities').change(function() {
            var city = $("#cities").val();
            getInfoApi(city);
         });
    });
});

function getInfoApi(city){
    var apiKey = '01371e4a0bb4415601c7c8b191ca5ab2';
    $.ajax({
        url:'http://api.openweathermap.org/data/2.5/weather?q='+city+',uk&APPID='+apiKey ,
        type: 'GET' ,
        dataType: 'json' ,
        success: function(response) {
            var cityName;
            var condition;
            var temperature;
            var windSpeed;
            var windDegree;
            $.each(response, function(index) {
				date = response.dt ;
				cityName = response.name;
				return false;
            });
            $.each(response.weather, function(index, value) { 
                condition = response.weather[index].main;
            });
            $.each(response.main, function(index, value) {
				temperature = response.main.temp;
				return false;
            });
            $.each(response.wind, function(index, value) {
				windSpeed = response.wind.speed;
				windDegree = response.wind.deg;
				return false;
            });
            $('.InfoSection').empty();
            var date = response.dt;
            $('.weatherInfo').empty().append(
                '<section class="apiInfo"><p>'+displayWeatherIcon(condition)+'</p><p>City Name: ' + cityName + '</p><p>Date: '+formatDate(date)+'</p><p>Condition: '+condition+'</p><p>Temperature: '+temperatureConverter(temperature)+' °C</p><p>Wind Speed: '+toMph(windSpeed)+' Mph '+'('+toKmph(windSpeed)+' km/h)'+'</p><p>Wind Degree: '+degreeValue(windDegree)+'</p><p></section>');
            if ((temperatureConverter(temperature) > 35) ||(temperatureConverter(temperature)< -5)) {
                $('.InfoSection').html('<p>Severe Weather ! Only travel if necesarry !</p>');  
            }
            if ((toMph(windSpeed) > 50) ||(toKmph(windSpeed))> 80) {
                $('.InfoSection').html('<p>Severe Wind ! Only travel if necesarry !</p>');  
            }
        },
        error: function() {
            $('.InfoSection').html('<p>Error fetching the data !</p>'); 
            $('.weatherInfo').empty();
           
        } 
    });
}

function temperatureConverter(kelvin) {
    var tempCelsius = Math.round(kelvin - 273.15);
    return tempCelsius
}

function formatDate(apiDate){
    apiDate = new Date();
    var dd = String(apiDate.getDate()).padStart(2, '0'); 
    var mm = String(apiDate.getMonth() + 1).padStart(2, '0');
    var yyyy = apiDate.getFullYear();
    return dd + "/" + mm+"/" + yyyy;
}

function toMph(metersPerSec){ 
    var speedtoMph = Math.round(metersPerSec * 3600 / 1610.3*1000)/1000;
    return Math.round(speedtoMph);
}
     
function toKmph(speedToMph) {
    var speedToMph = toMph(speedToMph);
    var KmH = Math.round(speedToMph * 1.609);
    return KmH;
}

function degreeValue(degree) {
    var windDir = degree % 360 
    windDir = Math.round(windDir/45)
    var arr = ['Northerly','North Easterly','Easterly','South Easterly','Southerly','South Westerly','Westerly','North Westerly'];
    return windDir+'° '+arr[(windDir % 8)];
}

function displayWeatherIcon(icon) {
    switch (icon) {
        case "Clouds":
            icon = '<img src="./weather_icons/cloud.png" style =" width: 8%;">';
            break;
         case "Hail":
            icon = '<img src="./weather_icons/hail.png" style =" width: 8%;">';
            break;
         case "Heavy Cloud":
            icon = '<img src="./weather_icons/heavy cloud.png" style =" width: 8%;">';
            break;
         case "Heavy Rain":
            icon = '<img src="./weather_icons/heavy rain.png" style =" width: 8%;">';
            break;
         case "Rain":
            icon = '<img src="./weather_icons/rain.png" style =" width: 8%;">';
            break;
         case "Sleet":
            icon = '<img src="./weather_icons/sleet.png" style =" width: 8%;">';
            break;
         case "Snow":
            icon = '<img src="./weather_icons/snow.png" style =" width: 8%;">';
            break;
         case "Sun and Clouds":
            icon = '<img src="./weather_icons/sun and cloud.png" style =" width: 8%;">';
            break
         case "Sun":
            icon = '<img src="./weather_icons/sun.png" alt="sun" style =" width: 8%;">';
            break;
         case "Thunderstorm":
            icon = '<img src="./weather_icons/thunderstorm.png" style =" width: 8%;">';
            break;
        default:
            icon = '';
            break;
    }
    return icon;
}










