(function() {
    'use strict';

    angular.module('freeants').factory('ThingModel', ['$http', function ($http) {

        //costruttore del modello. Inserire tutte le possibili inizializzazioni
        function ThingModel(thingData) {            
            this.setData(thingData);
        };

        ThingModel.prototype = {
            setData: function (thingData) {
                if (!this.children)
                    angular.extend(this, { children: [] });

                if (thingData) {
                    angular.extend(this, thingData);
                }

                if (this.value == null || this.value == "")
                    this.value = {};

                this.value = angular.fromJson(this.value);
            }
        };

        return ThingModel;
    }]);
}());