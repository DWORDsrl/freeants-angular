
(function() {
    'use strict';
    
    angular.module('freeants').factory('schedulerDataContext', ['$http', 'helpers', 'path', function ($http, helpers, path) {

      //End points
    function SchedulerUrl() {
        return path.api + "/Scheduler";
    }
    return {
        schedule: function (schedulerObject) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: SchedulerUrl(),
                data: schedulerObject
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        update: function (schedulerObject, schedulerId) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: SchedulerUrl() + "/" + schedulerId,
                data: schedulerObject
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
         delete: function (thingId, schedulerId) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: SchedulerUrl() + "/" + schedulerId,
                data: {"thingId": thingId}
            }).then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());