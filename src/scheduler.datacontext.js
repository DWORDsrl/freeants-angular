
(function() {
    'use strict';
    
    angular.module('freeants').factory('schedulerDataContext', ['$http', 'helpers', 'path', function ($http, helpers, path) {

      //End points
    function SchedulerRegisterUrl() {
        return path.api + "/SchedulerRegister";
    }
    return {
        schedule: function (schedulerObject) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: SchedulerRegisterUrl(),
                data: schedulerObject
            }).then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());