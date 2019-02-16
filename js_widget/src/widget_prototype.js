function WeatherWidget(id) {
    this.id = '#' + id;
}

WeatherWidget.prototype.init = function (forecastId) {
    this.forecastId = '#' + forecastId;
    var self = this;
    $(this.id).append($('<img>',
        {
            id: 'weather_icon',
            src: 'weather_icon.png',
            width: '60px'
        }));
    $(this.id).on('click', function (e) {
        e.stopPropagation();
        self.toggle();
    });
};

WeatherWidget.prototype.toggle = function () {
    if ($(this.forecastId).is(":visible")) {
        $(this.forecastId).hide();

    } else {
        $(this.forecastId).fadeIn();
    }

};

$(function () {
    var weatherWidget = new WeatherWidget('weather');
    weatherWidget.init('weather-forecast');
});
