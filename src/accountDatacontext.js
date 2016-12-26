(function() {
    'use strict';
    
    angular.module('freeants').factory('accountDataContext', ['$http', 'helpers', 'path', function ($http, helpers, path) {

    // routes
    var loginUrl = "Token";
    var logoutUrl = "api/Account/Logout";

    function accountUrl() { return path.api + "/Account"; }
    function getUserInfoUrl() { return accountUrl() + "/UserInfo"; }
    function forgotPasswordUrl(email,culture) { return accountUrl() + "/ForgotPassword/" + email + "/" +culture }
    function resetPasswordUrl() { return accountUrl() + "/ResetPassword"; }
    function changePasswordUrl() { return accountUrl() + "/ChangePassword"; }
    function registerByOnlyEmailUrl(email, culture) { return accountUrl() + "/RegisterByOnlyEmail/" + email +"/" + culture }
    function confirmAccountByOnlyEmailUrl() { return accountUrl() + "/ConfirmAccountByOnlyEmail/" }

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
        },
        forgotPassword: function (email, culture) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: forgotPasswordUrl(email, culture)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        changePassword: function (passModel) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: changePasswordUrl(),
                data: passModel
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        resetPassword: function (passModel) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: resetPasswordUrl(),
                data: passModel
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        registerByOnlyEmail: function (email, culture) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: registerByOnlyEmailUrl(email, culture)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        confirmAccountByOnlyEmail: function (confirmModel) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: confirmAccountByOnlyEmailUrl(),
                data: confirmModel
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        getUserInfo: function () {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: getUserInfoUrl()
            }).then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());