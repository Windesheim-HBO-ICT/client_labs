function WeatherWidget(wrapper_id) {
    this.wrapper_id = '#' + wrapper_id;
    this.isInit = false;
    this.show = show;
    this.hide = hide;
    this.init = init;

    function init(id) {
        this.isInit = true;
        var forecast_id = '#' + id;
        var visible = false;

        $(this.wrapper_id).append($('<img>',
            {
                id: 'weather_icon',
                src: 'weather_icon.png',
                width: '60px'
            }));

        $(this.wrapper_id).on('click', function (e) {
            e.stopPropagation();
            if(visible){
                $(forecast_id).hide();
                visible = false;
            }else{
                $(forecast_id).show();
                visible = true;
            }

        });
    };

    function show() {
        $(this.forecast_id).fadeIn();
    }

    function hide() {
        $(this.forecast_id).hide();
    }
}

$(function () {
    var weatherWidget = new WeatherWidget('weather');
    weatherWidget.init('weather-forecast');
});
