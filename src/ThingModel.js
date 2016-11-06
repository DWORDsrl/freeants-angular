(function() {
    'use strict';

    angular.module('freeants').factory('ThingModel', ['$http', function ($http) {

        //costruttore del modello. Inserire tutte le possibili inizializzazioni
        function ThingModel(thingData) {
            if (thingData) {
                this.setData(thingData);
            }
        };

        ThingModel.prototype = {
            setData: function (thingData) {
                angular.extend(this, thingData);
            }
        };

        return ThingModel;
    }]);
}());