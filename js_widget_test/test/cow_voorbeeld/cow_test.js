var chai = require('chai');
var expect = chai.expect;

var Cow = function (name) {
    this.name = name || "Anon cow";
};

Cow.prototype = {
    greets: function (target) {
        if (!target)
            throw new Error("missing target");
        return this.name + " greets " + target;
    }
};

describe("Cow", function () {
    describe("constructor", function () {
        it("should have a default name", function () {
            var cow = new Cow();
            expect(cow.name).to.equal("Anon cow");
        });

        it("should set cow's name if provided", function () {
            var cow = new Cow("Kate");
            expect(cow.name).to.equal("Kate");
        });
    });

    describe("#greets", function () {
        it("should throw if no target is passed in", function () {
            expect(function () {
                (new Cow()).greets();
            }).to.throw(Error);
        });

        it("should greet passed target", function () {
            var greetings = (new Cow("Kate")).greets("Baby");
            expect(greetings).to.equal("Kate greets Baby");
        });
    });

});