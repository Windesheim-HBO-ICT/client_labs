var expect = chai.expect;

describe("Weatherwidget tests", function () {

    describe("requesting new weatherdata", function () {

        var sandbox;

        beforeEach(function () {
            // Sinon sandbox maken
            sandbox = sinon.sandbox.create();

            //////////////////////////////////////////////////////////
            // De methode weather_data.getForecast stubben in sandbox
            //////////////////////////////////////////////////////////

            //De methode die als stub gebruikt moet worden, in plaats van
            // de 'echte' methode
            var fakeGetForecast = function () {
                return new Promise(function (resolve, reject) {
                    var weather_data = {
                        temp: 21.5
                    };
                    resolve(weather_data);
                });
            };

            //Aan de sandbox laten weten welke methode gebruikt moeten worden
            // bij een aanroep op het object.
            sandbox.stub(weather_data, 'getForecast').callsFake(fakeGetForecast);

        });

        afterEach(function () {
            //De sandbox terugzetten naar de initiele instelling
            sandbox.restore();
        });

        // De daadwerkelijke test
        it("should return mockdata, containing a temp of 21.5.", function () {
            return weather_data.getForecast()
                .then(function (result) {
                    sinon.assert.calledOnce(weather_data.getForecast);
                    expect(result.temp).to.be.equal(21.5);
                });
        });
    });

    describe("after weatherwidget init", function () {
        it("should have added an image with id weather_icon", function () {
          var img = $('img#weather_icon');
            expect(img.length).to.be.equal(1);
        });
    });

});