(function () {
    'use strict';
    
    angular.module('freeants').factory('loginDataContext', ['$http', 'helpers', function ($http, helpers) {

    var loginUrl = "Token",
        logoutUrl = "api/Account/Logout";

    return {
        login : function (url, data) {
            var req = $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                url: url + loginUrl,
                data: $.param(data)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        logout: function (url) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: url + logoutUrl
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        refresh: function (url, data) {
            var req = $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                url: url + loginUrl,
                data: $.param(data)
            }).then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());