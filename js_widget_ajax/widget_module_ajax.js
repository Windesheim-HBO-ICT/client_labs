var weather_widget = (function ($) {

    let init, _getForecast, _updateDOM;

    _updateDOM = function (data) {
        console.log('updating DOM');
        $('div').append(JSON.stringify(data));
    };

    _getForecast = function () {
        $.get('http://api.openweathermap.org/data/2.5/weather?q=Baarn&APPID=8fcf26b16c912c56bdbb840b5276b6c4'
            , _updateDOM);
    };

    init = function () {
        setInterval(_getForecast, 5000);
    };

    return {init: init};
}(jQuery));


$(function () {
    weather_widget.init();
});
