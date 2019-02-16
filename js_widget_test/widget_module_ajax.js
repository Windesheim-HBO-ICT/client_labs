var weather_data = (function ($) {
    var _getForecast;

    _getForecast = function () {
        return $.get('http://api.openweathermap.org/data/2.5/weather?q=Baarn&APPID=8fcf26b16c912c56bdbb840b5276b6c4');
    };

    return {getForecast: _getForecast}
}(jQuery));

var weather_widget = (function ($) {

    var _privateVar, _toggle, init, forecastId, _getForecast, _updateDOM;

    _toggle = function () {
        if ($(forecastId).is(":visible")) {
            $(forecastId).hide();

        } else {
            $(forecastId).fadeIn();
        }
    };

    _updateDOM = function (data) {
        console.log(data);
      console.log('updating DOM');
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

        setInterval(function(){weather_data.getForecast().then(function (result) {
            _updateDOM(result);
        });}, 60000);
    };

    return {init: init};
}(jQuery));

$(function () {
    weather_widget.init('#weather', '#weather-forecast');
});
