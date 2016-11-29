(function () {
    "use strict";
    angular.module("freeants", [])
})();
(function() {
    'use strict';
    
    angular.module('freeants').factory('accountDataContext', ['$http', 'helpers', 'path', function ($http, helpers, path) {

    // routes
    function accountUrl() { return path.api + "/Account"; }
    function getUserInfoUrl() { return accountUrl() + "/UserInfo"; }
    function forgotPasswordUrl(email,culture) { return accountUrl() + "/ForgotPassword/" + email + "/" +culture }
    function resetPasswordUrl() { return accountUrl() + "/ResetPassword"; }
    function changePasswordUrl() { return accountUrl() + "/ChangePassword"; }
    function registerByOnlyEmailUrl(email, culture) { return accountUrl() + "/RegisterByOnlyEmail/" + email +"/" + culture }
    function confirmAccountByOnlyEmailUrl() { return accountUrl() + "/ConfirmAccountByOnlyEmail/" }

    return {

      forgotPassword: function (email,culture) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: forgotPasswordUrl(email,culture)
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
(function () {
    'use strict';
    angular.module('freeants')
    .provider('accountManager', function () {

        this.userId = "";
        this.userName = "";
        this.access_token = "";
        this.access_token_time = "";
        this.access_token_date = "";
        this.refresh_token = "";
        this.persistent = "";
        this.apiKey = "";
        this.gp_access_token = "";
        this.fb_access_token = "";

        //LocalFunction
        this.setAppName = function (appName) {
            this.appName = appName;
        };
        this.setStorage = function (storage, key) {
            this.storage = storage;
            this.key = key;
        };
        this.stored = function () {
            if (
                (this.storage.getItem(this.appName + '_' + this.key) != null) &&
                (this.storage.getItem(this.appName + '_userName') != null) &&
                (this.storage.getItem(this.appName + '_userId') != null) &&
                (this.storage.getItem(this.appName + '_remember') == "true") && 
                (this.storage.getItem(this.appName + '_access_token_time') != null) &&
                 (this.storage.getItem(this.appName + '_access_token_date') != null))
            {

                console.log("pass");

                this.userId = this.storage.getItem(this.appName + '_userId');
                this.userName = this.storage.getItem(this.appName + '_userName');
                this.access_token = this.storage.getItem(this.appName + '_' + this.key);
                this.persistent = this.storage.getItem(this.appName + '_remember');
                this.access_token_time = this.storage.getItem(this.appName + '_access_token_time');
                this.access_token_date = this.storage.getItem(this.appName + '_access_token_date');

                return true;
            }
            else
                console.log("no-pass");
                return false;

        };
        this.setAccessToken = function (value) {
            this.apiKey = "";
            this.storage.setItem(this.appName + '_' + this.key, value);
            this.access_token = value;
        };
        this.setRefreshToken = function (value) {
            this.storage.setItem(this.appName + '_refresh_token', value);
            this.refresh_token = value;
        };
        this.setGoogleAccessToken = function (value) {
            this.storage.setItem(this.appName + '_gp_access_token', value);
            this.gp_access_token = value;
        };
        this.setFacebookAccessToken = function (value) {
            this.storage.setItem(this.appName + '_fb_access_token', value);
            this.fb_access_token = value;
        };
        this.setApiKey = function (value) {
            this.access_token = "";
            this.storage.setItem(this.appName + '_' + this.key, value);
            this.apiKey = value;
        };
        this.setPersistent = function (value) {
            this.storage.setItem(this.appName + '_remember', value);
            this.persistent = value;
        }
        this.removeAccessToken = function () {
            this.storage.removeItem(this.appName + '_' + this.key);
            this.access_token = "";
        };
        this.removePersistent = function () {
            this.storage.removeItem(this.appName + '_remember');
            this.persistent = "";
        };
        this.removeUserName = function () {
            this.storage.removeItem(this.appName + '_userName');
            this.userName = "";
        };
        this.removeUserId = function () {
            this.storage.removeItem(this.appName + '_userId');
            this.userId = "";
        };

        //Export Function  
        this.$get = function () {

            var storage = this.storage;
            var appName = this.appName;
            var key = this.key;
            var userId = this.userId;
            var userName = this.userName;
            var persistent = this.persistent;

            return {
                storage: storage,
                userId: userId,
                userName: userName,
                persistent: persistent,
                access_token: this.access_token,
                refresh_token: this.refresh_token,
                access_token_time: this.access_token_time,
                access_token_date: this.access_token_date,
                apiKey: this.apiKey,
                gp_access_token: this.gp_access_token,
                fb_access_token: this.fb_access_token,
                setAccessToken: function (value) {
                    storage.setItem(appName + '_' + key, value);
                    this.access_token = value;
                },
                setRefreshToken: function(value){
                    storage.setItem(appName + '_refresh_token', value);
                    this.refresh_token = value;
                },
                setAccessTokenTime: function(value){
                    storage.setItem(appName+ '_access_token_time',value);
                    this.access_token_time = value*1000;
                },
                setAccessTokenDate: function (value) {
                    storage.setItem(appName + '_access_token_date', value);
                    this.access_token_date = value;
                },
                setGoogleAccessToken: function (value) {
                    storage.setItem(appName + '_gp_access_token', value);
                    this.gp_access_token = value;
                },
                setFacebookAccessToken: function (value) {
                    storage.setItem(appName + '_fb_access_token', value);
                    this.fb_access_token = value;
                },
                setApiKey: function (value) {
                    storage.setItem(appName + '_' + key, value);
                    this.apiKey = value;
                },
                setUserId: function (value) {
                    storage.setItem(appName + '_userId', value);
                    this.userId = value;
                },
                setUserName: function (value) {
                    storage.setItem(appName + '_userName', value);
                    this.userName = value;
                },
                setPersistent: function (value) {
                    storage.setItem(appName + '_remember', value);
                    this.persistent = value;
                },
                removeAccessToken: function () {
                    storage.removeItem(appName + '_' + key);
                    this.access_token = "";
                },
                removeRefreshToken: function(){
                    storage.removeItem(appName + '_refresh_token');
                    this.refresh_token = "";
                },
                removeGoogleAccessToken: function () {
                    storage.removeItem(appName + '_gp_access_token');
                    this.gp_access_token = "";
                },
                removeFacebookAccessToken: function () {
                    storage.removeItem(appName + '_fb_access_token');
                    this.fb_access_token = "";
                },
                removePersistent: function () {
                    storage.removeItem(appName + '_remember');
                    this.persistent = "";
                },
                removeUserName: function () {
                    storage.removeItem(appName + '_userName');
                    this.userName = "";
                },
                removeUserId: function () {
                    storage.removeItem(appName + '_userId');
                    this.userId = "";
                }
            }
        };
    })
    .service('accountManagerService', ['loginDataContext','accountDataContext', 'path', 'accountManager', '$http', 
        function (loginDataContext,accountDataContext, path, accountManager, $http) {
        var refreshModel = {
                grant_type: "refresh_token",
                refresh_token: ""
        }
        var timeoutRefresh = null;
        var login = function (model, persistent) {
            return loginDataContext.login(path.server, model)
            .then(function (data) {
                accountManager.setUserId(data.userId);
                accountManager.setUserName(data.userName);
                accountManager.setAccessToken(data.access_token);
                accountManager.setRefreshToken(data.refresh_token);
                accountManager.setAccessTokenTime(data.expires_in);
                accountManager.setAccessTokenDate(data['.expires']);
                accountManager.setPersistent(persistent);
                timeoutRefresh = setTimeout(function () {
                    refreshModel.refresh_token = accountManager.refresh_token;
                    refresh(refreshModel);
                }, accountManager.access_token_time);

                return {
                    status: true,
                    data: data
                };

            }, function () {
                return { status: false }
            })
        };
        var refresh = function (model) {
            return loginDataContext.refresh(path.server, model)
            .then(function (data) {
                //accountManager.setUserId(data.userId);
                //accountManager.setUserName(data.userName);
                accountManager.setAccessToken(data.access_token);
                accountManager.setRefreshToken(data.refresh_token);
                accountManager.setAccessTokenTime(data.expires_in);

                timeoutRefresh = setTimeout(function () {
                    refreshModel.refresh_token = accountManager.refresh_token;
                    refresh(refreshModel);
                }, accountManager.access_token_time);
                return {
                    status: true,
                    data: data
                };
            }, function () {

                timeoutRefresh = setTimeout(function () {
                    refreshModel.refresh_token = accountManager.refresh_token;
                    refresh(refreshModel);
                }, 30000);

                return { status: false }
            })
        };
        var checkAccessToken = function(){
            var now = new Date();
            var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            if (accountManager.access_token) {
                if (Date.parse(accountManager.access_token_date) <= (Date.parse(now_utc))) {
                    return false;
                }
                else
                    return true;
            }
            else
                return false;
        };
        var loginFB = function (token) {
            var req = {
                method: 'POST',
                url: path.api + '/Account/FacebookLogin',
                data: JSON.stringify(token),
                contentType: 'application/json; charset=utf-8',
                headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': '*/*' },
            }

            return $http(req)
            .then(function (data) {

                var responseData = data.data;
                var access_token = responseData.access_token;

                if (responseData.has_registered) {
                    var req = {
                        method: 'GET',
                        url: path.api + '/Account/UserInfo',
                        contentType: 'application/json; charset=utf-8',
                        headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': '*/*', "Authorization": "Bearer " + access_token },
                    };
                    $http(req).then(function (data) {
                        accountManager.setUserId(responseData.userId);
                        accountManager.setUserName(responseData.userName);
                    }, function (data) {
                        return { status: false }
                    })
                }

                accountManager.setAccessToken(access_token);
                accountManager.setFacebookAccessToken(token);
                accountManager.setPersistent(true);

                return {
                    status: true,
                    data: data
                };

            }, function () {
                return { status: false }
            })

        }
        var loginGP = function (token) {
            var req = {
                method: 'POST',
                url: path.api + '/Account/GoogleLogin',
                data: JSON.stringify(token),
                contentType: 'application/json; charset=utf-8',
                headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': '*/*' },
            };
            return $http(req).then(function (data) {

                var responseData = data.data;
                var access_token = responseData.access_token;

                if (responseData.has_registered) {
                    var req = {
                        method: 'GET',
                        url: path.api + '/Account/UserInfo',
                        contentType: 'application/json; charset=utf-8',
                        headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': '*/*', "Authorization": "Bearer " + access_token },
                    }
                    $http(req).then(function (data) {

                        accountManager.setUserId(responseData.userId);
                        accountManager.setUserName(responseData.userName);

                    }, function (data) {
                        return { status: false }
                    })
                }

                accountManager.setAccessToken(access_token);
                accountManager.setFacebookAccessToken(token);
                accountManager.setPersistent(true);

                return {
                    status: true,
                    data: data
                };

            }, function () {
                return { status: false }
            })


        };
        var logout = function () {
            return loginDataContext.logout(path.server)
            .then(function () {
                accountManager.removeUserName();
                accountManager.removeUserId();
                accountManager.removePersistent();
                accountManager.removeAccessToken();
                accountManager.removeRefreshToken();
                if (timeoutRefresh) {
                    clearTimeout(timeoutRefresh);
                }


                if (accountManager.gp_access_token)
                    accountManager.removeGoogleAccessToken();

                if (accountManager.fb_access_token)
                    accountManager.removeFacebookAccessToken();

                return {
                    status: true
                };

            }, function () {
                return { status: false }
            })
        };
        var forgotPassword = function (email, culture) {
            return accountDataContext.forgotPassword(email, culture);
        }
        return {
            getAccessToken: function () {
                return accountManager.access_token;
            },
            getRefreshToken: function() {
                return accountManager.refresh_token;
            },
            getAccessTokenTime: function(){
                return accountManager.access_token_time;
            },
            getAccessTokeDate: function(){
                return accountManager.access_token_date;
            },
            getApiKey: function(){
                return accountManager.apiKey;
            },
            getUserInfo: function(){
                return {
                    userName: accountManager.userName,
                    userId: accountManager.userId
                };
            },
            getExtraTokens: function(){
                return {
                    fb_access_token: accountManager.fb_access_token,
                    gp_access_token: accountManager.gp_access_token,
                };
            },
            getExtraInfo: function(){
                return {
                    persistent: accountManager.persistent,
                    storage: accountManager.storage
                };
            },
            login: login,
            refresh: refresh,
            checkAccessToken: checkAccessToken,
            loginFB: loginFB,
            loginGP: loginGP,
            logout: logout,
            forgotPassword: forgotPassword
        }
    }]);
}());
(function () {
    'use strict';
    angular.module('freeants').factory('asyncLoader', ['$q', '$timeout', 'translationService', function ($q, $timeout, translationService) {
            var loader = function (options) {
                var deferred = $q.defer();
                var languages = translationService.getLanguages();
                var language = {};
                if (languages && languages[options.key])
                    language = languages[options.key];

                $timeout(function () {
                    deferred.resolve(language);
                }, 2000);
                return deferred.promise;
            };
            return loader;
    }]);
}());
(function () {
    'use strict';

    angular.module('freeants').constant("thingClaims", {
    
        "ThingUserRoleAdministrator": 1,
        "ThingUserRoleUser": 2,
        "ThingUserRoleSuperAdministrator": 4,

        "ThingUserStatusOk": 1,
        "ThingUserStatusWaitForAuth": 2,

        "ThingUserVisibilityVisible": 1,
        "ThingUserVisibilityHidden": 2,

        "ThingDeletedStatusOk": 1,
        "ThingDeletedStatusDeleted": 2,

        "ThingUserReadClaimsCanReadThingUserChangeClaims": 1,
        "ThingUserReadClaimsCanReadCreationDate": 2,
        "ThingUserReadClaimsCanReadName": 4,
        "ThingUserReadClaimsCanReadDescription": 8,
        "ThingUserReadClaimsCanReadKind": 16,
        "ThingUserReadClaimsCanReadValue": 32,
        "ThingUserReadCanReadDeletedStatus": 64,
        "ThingUserReadClaimsCanReadThingUserRights": 128,
        "ThingUserReadClaimsCanReadThingUserRole": 256,
        "ThingUserReadClaimsCanReadThingUserStatus": 512,
        "ThingUserReadClaimsCanReadThingUserReadClaims": 1024,
        "ThingUserReadClaimsCanReadPublicReadClaims": 2048,
        "ThingUserReadClaimsCanReadPublicChangeClaims": 4096,
        "ThingUserReadClaimsCanReadEveryoneReadClaims": 8192,
        "ThingUserReadClaimsCanReadEveryoneChangeClaims": 16384,

        "ThingUserChangeClaimsCanDeleteThing": 1,
        "ThingUserChangeClaimsCanChangeName": 2,
        "ThingUserChangeClaimsCanChangeDescription": 4,
        "ThingUserChangeClaimsCanChangeKind": 8,
        "ThingUserChangeClaimsCanChangeValue": 16,
        "ThingUserChangeClaimsCanChangeDeletedStatus": 32,
        "ThingUserChangeClaimsCanAddThingUserRights": 64,
        "ThingUserChangeClaimsCanDeleteThingUserRights": 128,
        "ThingUserChangeClaimsCanChangeThingUserRole": 256,
        "ThingUserChangeClaimsCanChangeThingUserStatus": 512,
        "ThingUserChangeClaimsCanChangeThingUserReadClaims": 1024,
        "ThingUserChangeClaimsCanChangeThingUserChangeClaims": 2048,
        "ThingUserChangeClaimsCanChangePublicReadClaims": 4096,
        "ThingUserChangeClaimsCanChangePublicChangeClaims": 8192,
        "ThingUserChangeClaimsCanChangeEveryoneReadClaims": 16384,
        "ThingUserChangeClaimsCanChangeEveryoneChangeClaims": 32768,
        "ThingUserChangeClaimsCanAddChildrenThing": 65536,
        "ThingUserChangeClaimsCanRemoveChildrenThing": 131072,

        "ThingUserReadClaimsNoClaims": 0x0,
        "ThingUserChangeClaimsNoClaims": 0x0,

        "ThingUserReadClaimsAllClaims": 0x7FFFFFFF,
        "ThingUserChangeClaimsAllClaims": 0x7FFFFFFF
});
}());
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
(function () {
    'use strict';

    angular.module('freeants').factory('localizator', ['$translate',  function ($translate) {
        var localStorageLabel = "Language";
        var supportedLanguages = [
            {
                name: "English",
                code: "en-GB"
            },
            {
                name: "Italian",
                code: "it-IT"
            }
        ];

        return {
            setLocalStorageLabel : function(label){
                localStorageLabel = label;
            },
            setSupportedLanguages:function(supportedLangs){
                supportedLanguages = supportedLangs;
            },
            getSupportedLanguages: function(){
                return supportedLanguages;
            },
            changeLanguage: function (language) {
                var lang = supportedLanguages[0].code;;
                for (var i = 0; i < supportedLanguages.length; i++) {
                    if (language == supportedLanguages[i].code) {
                        localStorage.setItem(localStorageLabel, language);
                        lang = language;
                        break;
                    }
                }
                $translate.use(lang);
            },

            initLanguage: function (language) {
                var lang = localStorage.getItem(localStorageLabel);
                if (!lang) {
                    lang = supportedLanguages[0].code;
                    for (var i = 0; i < supportedLanguages.length; i++) {
                        if (language == supportedLanguages[i].code) {
                            lang = language;
                            break;
                        }
                    }
                }
                $translate.use(lang);
            }
        }
    }]);
}());
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
            }

        };

    });

}());
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
        //    pns: ['gcm', 'apns'],
        //    thingId: '2140c212-0865-4845-8b5e-c5153007dfa5',
        //    localMessages: [{title:"", message:"", culture: "EN"}]
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
(function() {
    'use strict';
    
    angular.module('freeants').factory('thingsDataContext', ['$http', 'helpers', 'path', '$q', function ($http, helpers, path, $q) {

    //End points
    function thingChildrenUrl(parentThingId, childrenId) {
        return path.api + "/things/" + (parentThingId) + "/childrenIds/" + (childrenId || "");
    }
    function thingsUrl(id) { return path.api + "/things/" + (id || ""); }
    function thingsValueUrl(id) { return path.api + "/things/" + id + "/value" }
    function thingsPositionUrl() { return path.api + "/things/position" }
    function thingDeleteChild(parentThingId, childThingId) { return path.api + "/things/" + parentThingId + "/childrenIds/" + childThingId }

    //TODO: Ma funziona? E' stata mai provata?
    var getThingsWithAbort = function () {
        var canceller = $q.defer();

        var cancel = function (reason) {
            canceller.resolve(reason);
        };

        var promise =
            $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                timeout: canceller.promise,
                url: thingsUrl() + "?" +
                    (!!parameter.parentThingId ? ("&$parentId=" + parameter.parentThingId) : "") +
                    (!!parameter.filter ? ("&$filter=" + parameter.filter) : "") +
                    (!!parameter.top ? ("&$top=" + parameter.top) : "") +
                    (!!parameter.skip ? ("&$skip=" + parameter.skip) : "") +
                    (parameter.deleteStatus == null || parameter.deleteStatus == undefined ? "" : "&$deletedStatus=" + parameter.deleteStatus) +
                    (!!parameter.orderBy ? ("&$orderby=" + parameter.orderBy) : "") +
                    (!!parameter.valueFilter ? ("&$valueFilter=" + parameter.valueFilter) : "")
            })
            .then(function (response) {
                return response.data;
            });

        return {
            promise: promise,
            cancel: cancel
        };
    };

    return {

        // Deprecate
        getThings: function (parameter, defer) {
            var urlRaw = thingsUrl() + "?" +
                    (!!parameter.parentThingId ? ("&$parentId=" + parameter.parentThingId) : "") +
                    (!!parameter.filter ? ("&$filter=" + parameter.filter) : "") +
                    (!!parameter.top ? ("&$top=" + parameter.top) : "") +
                    (!!parameter.skip ? ("&$skip=" + parameter.skip) : "") +
                    (parameter.deleteStatus == null || parameter.deleteStatus == undefined ? "" : "&$deletedStatus=" + parameter.deleteStatus) +
                    (!!parameter.orderBy ? ("&$orderby=" + parameter.orderBy) : "") +
                    (!!parameter.valueFilter ? ("&$valueFilter=" + parameter.valueFilter) : "");
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                timeout: (defer) ? (defer.promise) : null,
                url: urlRaw
            }).then(function (response) {                
                return response.data;
            });
            return req;
        },
        getThings1: function (parameter, timeout) {
            var urlRaw = thingsUrl() + "?" +
                    (!!parameter.parentThingId ? ("&$parentId=" + parameter.parentThingId) : "") +
                    (!!parameter.filter ? ("&$filter=" + parameter.filter) : "") +
                    (!!parameter.top ? ("&$top=" + parameter.top) : "") +
                    (!!parameter.skip ? ("&$skip=" + parameter.skip) : "") +
                    (parameter.deleteStatus == null || parameter.deleteStatus == undefined ? "" : "&$deletedStatus=" + parameter.deleteStatus) +
                    (!!parameter.orderBy ? ("&$orderby=" + parameter.orderBy) : "") +
                    (!!parameter.valueFilter ? ("&$valueFilter=" + parameter.valueFilter) : "");
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                timeout: (timeout) ? (timeout.promise) : null,
                url: urlRaw
            }).then(function (response) {                                            
                return {
                    things: response.data,
                    itemsRange: helpers.getRangeItemsFromResponse(response)
                };
            });
            return req;
        },
        getThing: function (thingId) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: thingsUrl(thingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        getThingsWithAbort: getThingsWithAbort,
        
        createThing: function (thing) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: thingsUrl(),
                data: thing
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        updateThing: function (thingId, thing) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: thingsUrl(thingId),
                data: thing
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        deleteThing: function (thingId) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: thingsUrl(thingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        getChildrenIds: function (parentThingId){
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: thingChildrenUrl(parentThingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        addChildToParent: function (parentThingId, childThingId) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: thingChildrenUrl(parentThingId),
                data: angular.toJson(childThingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        deleteThingChild: function (parentThingId, childThingId) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: thingDeleteChild(parentThingId, childThingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        getThingValue: function (thingId, value) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: thingsValueUrl(thingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        putThingValue: function (thingId, value) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: thingsValueUrl(thingId),
                data: value
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        putThingPosition: function (parentThingId, childThingId, position) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: thingsPositionUrl(),
                data: JSON.stringify({ "parentId": parentThingId, "childId": childThingId, "pos": position })
            }).then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());
(function() {
    'use strict';

    angular.module('freeants').factory('ThingModel', [function () {
		
        function ThingModel(thingData) {
            
            this.childrenSkip = 0;
            this.childrenTotalItems = Number.MAX_SAFE_INTEGER;
            this.children = [];
            
            this.setData(thingData);
        };

        ThingModel.prototype = {
            setData: function (thingData) {

                if (thingData) {
                    angular.extend(this, thingData);
                }

                if (this.value == null || this.value == "") {
                    this.value = {};
                }
                this.value = angular.fromJson(this.value);
            }
        };

        return ThingModel;
    }]);
}());
(function () {
    'use strict';

    // Deprecate
    angular.module('freeants').factory('ThingsManager', [ '$q', 'ThingModel', function ($q, ThingModel) {

        var objDataContexts;

        function ThingsManager(dataContexts) {
            objDataContexts = dataContexts;
        };
        ThingsManager.prototype = {
            getThings: function (parameter, defer) {
                function getSucceeded(data) {
                    var pool = [];

                    for (var i = 0; i < data.length; i++) {
                        var thing = new ThingModel(data[i]);
                        pool.push(thing);
                    }

                    return pool;
                }
                return objDataContexts.thingsDataContext.getThings(parameter, defer)
                    .then(getSucceeded);
            },

            //TODO: A cosa serve?
            toThingModel: function (array, thingsModel, thingKind) {
                for (var i = 0; i < array.length; i++) {
                    var t = new ThingModel();
                    t.kind = thingKind;
                    t.value = array[i];
                    thingsModel.push(t);
                }
            },
            getThingsTree: function (parameter, timeout) {

                function getThingsSuccess(deferred, pool) {

                    var things = pool || [];

                    objDataContexts.thingsDataContext.getThings(parameter, timeout)
					.then(function (data) {

					    if (data.length == 0) {
					        deferred.resolve(things);
					    }

					    var promises = [];

					    for (var i = 0; i < data.length; i++) {

					        var thing = new ThingModel(data[i]);

					        things.push(thing);

					        var def = $q.defer();
					        promises.push(def.promise);

					        parameter.parentThingId = thing.id;
					        getThingsSuccess(def, thing.children);
					    }

					    $q.all(promises).then(function (data) {
					        deferred.resolve(things);
					    }, function (data) {
					        deferred.reject(data);
					    });

					}
					, function (data) {
					    deferred.reject(data);
					});

                    return deferred.promise;

                }

                var deferred = $q.defer();
                return getThingsSuccess(deferred);
            }
        };

        return ThingsManager
    }]);

	angular.module('freeants').factory('thingsManager', ['$q', 'thingsDataContext', 'ThingModel', function ($q, thingsDataContext, ThingModel) {

        function createThing(thing) {
            return thingsDataContext.createThing(thing)
            .then(function (data) {
                return new ThingModel(data);
            });
        }

        function getThings(parameter, timeout) {
            function getSucceded(data) {
                var things = [];

                for (var i = 0; i < data.things.length; i++) {
                    var thing = new ThingModel(data.things[i]);
                    things.push(thing);
                }

                return {
                    things: things,
                    itemsRange: data.itemsRange
                }
            }
            return thingsDataContext.getThings1(parameter, timeout)
                .then(getSucceded);
        }        
          
        function elapseThing(thing, parameter, cancel) {

            parameter.skip = thing.childrenSkip;
            parameter.parentThingId = thing.id;

            thing.childrenSkip = thing.childrenSkip + parameter.top;
            //  Fix range
            if (thing.childrenSkip > thing.childrenTotalItems) {
                thing.childrenSkip = thing.childrenTotalItems;
            }                        
            
            return getThings(parameter, cancel)
            .then(function (data) {

                thing.childrenTotalItems = data.itemsRange.totalItems;
                //  Fix range
                if (thing.childrenSkip > thing.childrenTotalItems) {
                    thing.childrenSkip = thing.childrenTotalItems;
                }

                for (var i = 0; i < data.things.length;i++)
                    thing.children.push(data.things[i]);

                return data;
            });
        }

        function collapseThing(thing, cancel) {
            if (cancel)
                cancel.resolve();
            thing.children = [];
            thing.childrenSkip = 0;
        }

        function deleteChildrenThings(parentThingId) {

            return thingsDataContext.getChildrenIds(parentThingId)
            .then(function (childrenIds) {

                var def = $q.defer();

                var childrenPromises = [];

                for (var i = 0; i < childrenIds.length; i++) {
                    childrenPromises.push(thingsDataContext.deleteThing(childrenIds[i]));
                }

                return $q.all(childrenPromises)
                    .then(function (data) {
                        def.resolve(data);
                        return data;
                    }, function (data) {
                        def.reject(data);
                        return data;
                    });
            });
        }

        return {
            createThing: createThing,
            getThings: getThings,            
            elapseThing: elapseThing,
            collapseThing: collapseThing,
            deleteChildrenThings: deleteChildrenThings 
        }
    }]);
	
}());
(function () {
    'use strict';
    angular.module('freeants').factory('thingUserRightsDataContext', ['$q', '$http', 'helpers', 'path', function ($q, $http, helpers, path) {

    // routes
    function thingsUserRoleStatusUrl(thingId, userId) {
        return path.api + "/things/" + thingId + "/usersrights" + (userId != undefined ? ("/" + userId) : "");
    }

    return {

        getThingUsersRights: function (parameter) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: thingsUserRoleStatusUrl(parameter.thingId) + "?&parentId=" +
                    (parameter.id == null || parameter.id == undefined ? "" : parameter.id) +
                    ((parameter.filter != null || parameter.filter != undefined) ? ("&$filter=" + parameter.filter) : "") +
                    ((parameter.top != null || parameter.top != undefined) ? ("&$top=" + parameter.top) : "") +
                    ((parameter.skip != null || parameter.skip != undefined) ? ("&$skip=" + parameter.skip) : "") +
                    ((parameter.orderBy != null || parameter.orderBy != undefined) ? ("&$orderby=" + parameter.orderBy) : "")
            }).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject(response);
            });
            return req;
        },

        createThingUserRights: function (thingId, thingUserRights) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: thingsUserRoleStatusUrl(thingId),
                data: thingUserRights
            }).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject(response);
            });
            return req;
        },

        updateThingUserRights: function (thingId, userId, thingUserRights) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: thingsUserRoleStatusUrl(thingId, userId),
                data: thingUserRights
            }).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject(response);
            });
            return req;
        },

        deleteThingUserRights: function (thingId, userId) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: thingsUserRoleStatusUrl(thingId, userId)
            }).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject(response);
            });
            return req;
        }
    }
}]);
}());
(function () {
    'use strict';

    angular.module('freeants').factory('translationService', ['$translate', function ($translate) {

        var languages = {};
        var supportedLanguages = [];

    return {
        getSupportedLanguages: function(){
            return supportedLanguages;
        },
        changeLanguage: function (language) {
            var lang = supportedLanguages[0].code;;
            for (var i = 0; i < supportedLanguages.length; i++) {
                if (language == supportedLanguages[i].code) {
                    localStorage.setItem("Language", language);
                    lang = language;
                    break;
                }
            }
            $translate.refresh(lang);
            $translate.use(lang);
        },

        initLanguage: function (language) {
            var lang = localStorage.getItem("Language");
            if (!lang) {
                lang = supportedLanguages[0].code;
                for (var i = 0; i < supportedLanguages.length; i++) {
                    if (language == supportedLanguages[i].code) {
                        lang = language;
                        break;
                    }
                }
            }
            $translate.refresh(lang);
            $translate.use(lang);
        },
        setLanguages: function (data) {
            languages = angular.extend(languages, data);
        },
        initialize: function (obj) {
            languages = angular.extend(languages, obj);
        },
        getLanguages: function (data) {
            return languages;
        },
        setSupportedLanguages: function (supportedLang) {
            supportedLanguages = supportedLang;
        },
        getSupportedLanguages: function () {
            return supportedLanguages;
        },
        setGlobalization: function (culture) {
            var deviceLanguage = "English";
            var deviceCulture = "en";

            var language = culture;
            if (!language)
                language = $translate.use();
            for (var i = 0; i < supportedLanguages.length; i++) {
                if (language == supportedLanguages[i].language) {
                    deviceLanguage = supportedLanguages[i].deviceLanguage;
                    deviceCulture = supportedLanguages[i].deviceCulture;
                }
            }

            $translate.refresh(deviceCulture);
            $translate.use(deviceCulture);
        }
    }
    }]);
}());
(function () {
    'use strict';
    angular.module('freeants').factory('userDataContext', ['$http', 'helpers', function ($http, helpers) {

    function usersUrl(id) { return GlobalPathApiUri + "/users/" + (id || ""); }

    return {

        getUsers : function (filter, orderBy, top, skip) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: usersUrl() + "?&parentId=" +
                    (parameter.id == null || parameter.id == undefined ? "" : parameter.id) +
                    ((parameter.filter != null || parameter.filter != undefined) ? ("&$filter=" + parameter.filter) : "") +
                    ((parameter.top != null || parameter.top != undefined) ? ("&$top=" + parameter.top) : "") +
                    ((parameter.skip != null || parameter.skip != undefined) ? ("&$skip=" + parameter.skip) : "") +
                    ((parameter.orderBy != null || parameter.orderBy != undefined) ? ("&$orderby=" + parameter.orderBy) : "")
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        getUser : function (userId) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: usersUrl(userId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        createUser : function (userModel) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: usersUrl(),
                data: userModel
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        updateUser : function (userId, userModel) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: usersUrl(userId),
                data: userModel
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        deleteUser: function (userId) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: usersUrl(userId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());