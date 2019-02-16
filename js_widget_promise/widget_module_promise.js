var weather_widget = (function ($) {

    var _privateVar, _toggle, init, forecastId, _getForecast, _updateDOM;

    _privateVar = 'Dit is private!',


    _toggle = function () {
        if ($(forecastId).is(":visible")) {
            $(forecastId).hide();

        } else {
            $(forecastId).fadeIn();
        }

    };

    _updateDOM = function (data) {

        return new Promise(function(resolve, reject){
            console.log(data);
            console.log('updating DOM');
            resolve('ready');
        });
    };

    _getForecast = function () {
        return $.get('http://api.openweathermap.org/data/2.5/weather?q=Baarn&APPID=8fcf26b16c912c56bdbb840b5276b6c4');
    };

    init = function (id, wrapperid) {
        forecastId = wrapperid;
        $(id).append($('<img>',
            {
                id: 'weather_icon',
                src: 'weather_icon.png',
                width: '60px'
            }));

        $(id).on('click', function (e) {
            e.stopPropagation();
            _toggle();
        });

        setInterval(function(){
            _getForecast()
                .then(_updateDOM(data));
        }, 5000);
    };

    return {init: init};
}(jQuery));


$(function () {
    weather_widget.init('#weather', '#weather-forecast');
});
