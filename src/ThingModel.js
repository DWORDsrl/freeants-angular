(function() {
    'use strict';

    angular.module('freeants').factory('ThingModel', ['$http', function ($http) {

        //costruttore del modello. Inserire tutte le possibili inizializzazioni
        function ThingModel(thingData) {
            
            if (!this.children)
                angular.extend(this, { children: [] });

            if (thingData) {
                this.setData(thingData);
            }

            if (this.value == null || this.value == "")
                this.value = {};

            this.value = angular.fromJson(this.value);
        };

        ThingModel.prototype = {
            setData: function (thingData) {                
                angular.extend(this, thingData);
            }
        };

        return ThingModel;
    }]);
}());