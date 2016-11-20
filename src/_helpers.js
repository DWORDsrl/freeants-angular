(function () {
    'use strict';
    
    angular.module('freeants').factory('helpers', ['accountManager', function (accountManager) {

        return {

            getSecurityHeaders: function () {
                var accessToken = accountManager.access_token;
                if (accessToken) {
                    return { "Authorization": "Bearer " + accessToken };
                }

                var apiKey = accountManager.apiKey;
                if (apiKey) {
                    return { "DWApiKey": apiKey };
                }

                return {};
            },

            collect: function () {
                var ret = {};
                var len = arguments.length;
                for (var i = 0; i < len; i++) {
                    for (var p in arguments[i]) {
                        if (arguments[i].hasOwnProperty(p)) {
                            ret[p] = arguments[i][p];
                        }
                    }
                }
                return ret;
            },

            getTotalItemsFromResponse: function (response) {
                var str = response.headers("Content-Range");
                if (str != undefined && str != null) {
                    var arr = str.split('/');
                    if (arr.length == 2)
                        return parseInt(arr[1]);
                }
                return null;
            },
            getRangeItemsFromResponse: function(response) {
                var contentRange = response.headers("Content-Range");

                var top = 0;
                var skip = 0;
                var totalItems = 0;
                if (contentRange) {
                    var arr1 = contentRange.split('/');
                    if (arr1.length != 0) {
                        var arr2 = arr1[0].split(" ");
                        if (arr2.length == 2) {
                            var arr3 = arr2[1].split("-");
                            if (arr3.length == 2) {
                                top = parseInt(arr3[0]);
                                skip = parseInt(arr3[1]);
                            }
                        }

                        if (arr1.length == 2)
                            totalItems = parseInt(arr1[1]);
                    }
                }
                return {
                    top: top,
                    skip: skip,
                    totalItems: totalItems
                }
            },

            generateUUID: function () {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            },

            getQueryStrParamByName: function getQueryStrParamByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
                var results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            },
           validateEmail: function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
        }
    }]);
}());