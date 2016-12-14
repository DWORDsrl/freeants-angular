(function() {
    'use strict';

    angular.module('freeants').factory('ThingModel', [function () {
		
        function ThingModel(thingRaw, children, skip, totalItems) {
            
            this.childrenSkip = !!skip ? skip : 0;
            this.childrenTotalItems = !!totalItems ? totalItems : Number.MAX_SAFE_INTEGER;
            this.children = !!children ? children : [];
            
            this.setData(thingRaw);
        }

        ThingModel.prototype.setData = function (thingData) {

                if (thingData) {
                    angular.extend(this, thingData);
                }

                if (this.value == null || this.value == "") {
                    this.value = {};
                }
                this.value = angular.fromJson(this.value);
        }
        ThingModel.prototype.collapse = function () {

                this.childrenSkip = 0;
                // INFO: Non lo azzero per tenere traccia di quanti potenziali Children potrebbero esserci
                // this.childrenTotalItems = Number.MAX_SAFE_INTEGER;
                this.children = [];
        }
        ThingModel.prototype.shallowCopy = function () {
            var currentThing = JSON.parse(JSON.stringify(this));
            if (this.children)
                currentThing.children = this.children;
            if (this.usersInfos)
                currentThing.usersInfos = this.usersInfos;
            return currentThing;
        }            

        return ThingModel;
    }]);
}());