$(function () {

    var weatherWidgetVisible = false;

    $('#weather').append($('<img>',
        {
            id: 'weather_icon',
            src: 'weather_icon.png',
            width: '60px'
        }));

    $('#weather').on('click', function (e) {
        e.stopPropagation();

        if (weatherWidgetVisible) {
            console.log('showing widget...');
            $('#weather-forecast').fadeOut();
            weatherWidgetVisible = false;
        } else {
            console.log('hiding widget...');
            $('#weather-forecast').fadeIn();
            weatherWidgetVisible = true;
        }

    });
});