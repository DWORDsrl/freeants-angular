(function () {
    'use strict';

    // Deprecate
    angular.module('freeants').factory('SignalRConnector', function () {

        var authTypeT = "";
        var accessTokenOrApiKeyCallBack = null
        var connection = $.hubConnection();
        var myHub = connection.createHubProxy('signalrnotifier');
        var isStarted = false;
        var tryReconnection = true;

        function SignalRConnector(stateChangedHook, reconnectedHook) {

            connection.logging = true;
            connection.received(function (data) { });
            connection.error(function (error) { });
            connection.stateChanged(function (change) {
                if (change.newState === $.signalR.connectionState.connected) {
                    isStarted = true;
                    tryReconnection = true;
                }
                else if (change.newState === $.signalR.connectionState.disconnected) {
                    isStarted = false;
                }
                else if (change.newState === $.signalR.connectionState.connecting) {
                }
                else if (change.newState === $.signalR.connectionState.reconnecting) {
                }

                if (stateChangedHook != null)
                    stateChangedHook(change);
            });
            connection.reconnected(function () {
                if (reconnectedHook != null)
                    reconnectedHook();
            });
            connection.starting(function () {
            });
            connection.connectionSlow(function () {
            });
            connection.reconnecting(function () {
            });
            connection.disconnected(function () {
                if (tryReconnection == false)
                    return;

                setTimeout(function () {
                    connection.qs = angular.fromJson("{\"" + authTypeT + "\":\"" + accessTokenOrApiKeyCallBack() + "\"}");
                    connection.start();// TODO: bisogna gestire il successo o il fallimento dello start come in subscribe
                }, 5000); // Restart connection after 5 seconds.
            });
        }

        SignalRConnector.prototype = {

            connected: $.signalR.connectionState.connected,

            disconnected: $.signalR.connectionState.disconnected,

            connecting: $.signalR.connectionState.connecting,

            reconnecting: $.signalR.connectionState.reconnecting,

            subscribe: function (url, authType, accessTknOrApiKeyCallBack, subscribeSuccess, subscribeFail) {

                if (isStarted == true)
                    return;

                accessTokenOrApiKeyCallBack = accessTknOrApiKeyCallBack;

                authTypeT = authType;

                var accessTokenOrApiKeyJson = "{\"" + authType + "\":\"" + accessTokenOrApiKeyCallBack() + "\"}";

                if (url && url !== "")
                    connection.url = url;

                connection.qs = angular.fromJson(accessTokenOrApiKeyJson);
                connection.start()
                .done(function () {
                    if (subscribeSuccess != null)
                        subscribeSuccess();
                })
                .fail(function () {
                    if (subscribeFail != null)
                        subscribeFail();
                });
            },

            unsubscribe: function () {

                if (isStarted == false)
                    return;

                tryReconnection = false;
                connection.stop();
            },

            setHook: function (eventName, hook) {
                myHub.on(eventName, hook);
            }

        };

        return SignalRConnector;
    });

    angular.module('freeants').factory('notifierConnector', function () {

        var authTypeT = "";
        var accessTokenOrApiKeyCallBack = null
        var connection = $.hubConnection();
        var myHub = connection.createHubProxy('signalrnotifier');
        var isStarted = false;
        var tryReconnection = true;

        return {

            connected: $.signalR.connectionState.connected,

            disconnected: $.signalR.connectionState.disconnected,

            connecting: $.signalR.connectionState.connecting,

            reconnecting: $.signalR.connectionState.reconnecting,

            init: function(stateChangedHook, reconnectedHook) {
                connection.logging = true;
                connection.received(function (data) { });
                connection.error(function (error) { });
                connection.stateChanged(function (change) {
                    if (change.newState === $.signalR.connectionState.connected) {
                        isStarted = true;
                        tryReconnection = true;
                    }
                    else if (change.newState === $.signalR.connectionState.disconnected) {
                        isStarted = false;
                    }
                    else if (change.newState === $.signalR.connectionState.connecting) {
                    }
                    else if (change.newState === $.signalR.connectionState.reconnecting) {
                    }

                    if (stateChangedHook != null)
                        stateChangedHook(change);
                });
                connection.reconnected(function () {
                    if (reconnectedHook != null)
                        reconnectedHook();
                });
                connection.starting(function () {
                });
                connection.connectionSlow(function () {
                });
                connection.reconnecting(function () {
                });
                connection.disconnected(function () {
                    if (tryReconnection == false)
                        return;

                    setTimeout(function () {
                        connection.qs = angular.fromJson("{\"" + authTypeT + "\":\"" + accessTokenOrApiKeyCallBack() + "\"}");
                        connection.start();// TODO: bisogna gestire il successo o il fallimento dello start come in subscribe
                    }, 5000); // Restart connection after 5 seconds.
                });
            },

            subscribe: function (url, authType, accessTknOrApiKeyCallBack, subscribeSuccess, subscribeFail) {

                if (isStarted == true)
                    return;

                accessTokenOrApiKeyCallBack = accessTknOrApiKeyCallBack;

                authTypeT = authType;

                var accessTokenOrApiKeyJson = "{\"" + authType + "\":\"" + accessTokenOrApiKeyCallBack() + "\"}";

                if (url && url !== "")
                    connection.url = url;

                connection.qs = angular.fromJson(accessTokenOrApiKeyJson);
                connection.start()
                .done(function () {
                    if (subscribeSuccess != null)
                        subscribeSuccess();
                })
                .fail(function () {
                    if (subscribeFail != null)
                        subscribeFail();
                });
            },

            unsubscribe: function () {

                if (isStarted == false)
                    return;

                tryReconnection = false;
                connection.stop();
            },

            setHook: function (eventName, hook) {
                myHub.on(eventName, hook);
            },
            remHook: function(eventName, hook) {
                myHub.off(eventName, hook);
            }
        };

    });

}());