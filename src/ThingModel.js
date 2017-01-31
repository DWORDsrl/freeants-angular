(function() {
    'use strict';

    angular.module('freeants').factory('ThingModel', [function () {
		
        function ThingModel(thingRaw) {
            
            this.childrenSkip = 0;
            this.childrenTotalItems = Number.MAX_SAFE_INTEGER;
            this.children = [];
            this.usersInfos = [];
            
            this.setData(thingRaw);
        }

        ThingModel.prototype.setData = function (thingRaw) {
                // Viene fatto tutto questo lavoro per non perdere i riferimenti agli array di usersInfos originali
                // nel concetto di shallowCopy                
                var usersInfos = this.usersInfos;
                if (thingRaw) {
                    angular.extend(this, thingRaw);
                }                
                this.usersInfos = usersInfos;
                while(this.usersInfos.length > 0) {
                    this.usersInfos.pop();
                }
                if (thingRaw && thingRaw.usersInfos) {
                    for(var i = 0; i < thingRaw.usersInfos.length; i++)
                        this.usersInfos.push(thingRaw.usersInfos[i]);
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
            var copyThing = JSON.parse(JSON.stringify(this));
            if (this.children)
                copyThing.children = this.children;
            if (this.usersInfos)
                copyThing.usersInfos = this.usersInfos;
            return copyThing;
        }            

        return ThingModel;
    }]);
}());