
(function() {
    'use strict';
    
    angular.module('freeants').factory('pushNotificationsDataContext', ['$http', 'helpers', 'path', '$q', function ($http, helpers, path, $q) {

    //End points
    function pushNotificationsRegisterUrl() {
        return path.api + "/pushNotificationsRegister";
    }
    function pushNotificationsPushUrl() {
        return path.api + "/pushNotificationsPush";
    }
    return {

        // deviceInstallationSample = {
        //    installationId: '1',// TODO: Generare una GUID e memorizzare sulla localstorage
        //    platform: 'gcm',    // TODO: Reperire a runtime la piattaforma
        //    handle: data.registrationId,
        //    thingsIds: ['2140c212-0865-4845-8b5e-c5153007dfa5']
        //}
        register: function (deviceInstallation) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: pushNotificationsRegisterUrl(),
                data: deviceInstallation
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        // pushMessageSample = {
        //    pns: 'gcm',// TODO: Generare una GUID e memorizzare sulla localstorage
        //    thingId: '2140c212-0865-4845-8b5e-c5153007dfa5',
        //    message: {...}
        //}
        push: function (pushMessage) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: pushNotificationsPushUrl(),
                data: pushMessage
            }).then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());