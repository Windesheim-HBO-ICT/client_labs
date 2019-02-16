var weather_widget = (function ($) {

    var _privateVar, _toggle, init, forecastId;

    _privateVar = 'Dit is private!',


    _toggle = function () {
        if ($(forecastId).is(":visible")) {
            $(forecastId).hide();

        } else {
            $(forecastId).fadeIn();
        }

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

    };

    return {init: init};
}(jQuery));


$(function () {
    setTimeout(function(){weather_widget.init('#weather', '#weather-forecast');}, 2000);
});
