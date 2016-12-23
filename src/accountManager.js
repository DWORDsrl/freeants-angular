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
        }
        this.setStorage = function (storage, key) {
            this.storage = storage;
            this.key = key;
        }
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

        }
        this.setAccessToken = function (value) {
            this.apiKey = "";
            this.storage.setItem(this.appName + '_' + this.key, value);
            this.access_token = value;
        }
        this.setRefreshToken = function (value) {
            this.storage.setItem(this.appName + '_refresh_token', value);
            this.refresh_token = value;
        }
        this.setGoogleAccessToken = function (value) {
            this.storage.setItem(this.appName + '_gp_access_token', value);
            this.gp_access_token = value;
        }
        this.setFacebookAccessToken = function (value) {
            this.storage.setItem(this.appName + '_fb_access_token', value);
            this.fb_access_token = value;
        }
        this.setApiKey = function (value) {
            this.access_token = "";
            this.storage.setItem(this.appName + '_' + this.key, value);
            this.apiKey = value;
        }
        this.setPersistent = function (value) {
            this.storage.setItem(this.appName + '_remember', value);
            this.persistent = value;
        }
        this.removeAccessToken = function () {
            this.storage.removeItem(this.appName + '_' + this.key);
            this.access_token = "";
        }
        this.removePersistent = function () {
            this.storage.removeItem(this.appName + '_remember');
            this.persistent = "";
        }
        this.removeUserName = function () {
            this.storage.removeItem(this.appName + '_userName');
            this.userName = "";
        }
        this.removeUserId = function () {
            this.storage.removeItem(this.appName + '_userId');
            this.userId = "";
        }
        this.removeAccessTokenTime = function () {
            this.storage.removeItem(this.appName + '_access_token_time');
            this.access_token_time = "";
        }
        this.removeAccessTokenDate = function () {
            this.storage.removeItem(this.appName + '_access_token_date');
            this.access_token_date = "";
        }
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
                },
                removeAccessTokenTime: function () {
                    storage.removeItem(appName + '_access_token_time');
                    this.access_token_time = "";
                },
                removeAccessTokenDate: function () {
                    storage.removeItem(appName + '_access_token_date');
                    this.access_token_date = "";
                }
            }
        }
    })
    .service('accountManagerService', ['loginDataContext','accountDataContext', 'path', 'accountManager', '$http', '$q', 
        function (loginDataContext,accountDataContext, path, accountManager, $http, $q) {
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

            }, function (data) {
                return { 
                    status: false,
                    data: data
                 }
            })
        }
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
        }
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
        }
        var loginFB = function (token) {
            
            var def = $q.defer();
            var req = {
                method: 'POST',
                url: path.api + '/Account/FacebookLogin',
                data: JSON.stringify(token),
                contentType: 'application/json; charset=utf-8',
                headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': '*/*' }
            }

            $http(req)
            .then(function(data){

                var responseData = data.data;
                var access_token = responseData.access_token;

                if (responseData.has_registered) {

                    var reqUserInfo = {
                        method: 'GET',
                        url: path.api + '/Account/UserInfo',
                        contentType: 'application/json; charset=utf-8',
                        headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': '*/*', "Authorization": "Bearer " + access_token }
                    };

                    $http(reqUserInfo)
                    .then(function (data) {
                        accountManager.setUserId(responseData.userId);
                        accountManager.setUserName(responseData.userName);
                        def.resolve(data);
                    }, function (data) {
                        def.reject(data);
                    })
                }

                accountManager.setAccessToken(access_token);
                accountManager.setFacebookAccessToken(token);
                accountManager.setPersistent(true);
                
            }, function (data){
               def.reject(data);
            })
            return def.promise;
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


        }
        function clearLocalData() {

            accountManager.removeUserName();
            accountManager.removeUserId();
            accountManager.removePersistent();
            accountManager.removeAccessToken();
            accountManager.removeRefreshToken();
            accountManager.removeAccessTokenTime();
            accountManager.removeAccessTokenDate();

            if (timeoutRefresh) {
                clearTimeout(timeoutRefresh);
            }

            if (accountManager.gp_access_token)
                accountManager.removeGoogleAccessToken();

            if (accountManager.fb_access_token)
                accountManager.removeFacebookAccessToken();
        }
        var logout = function () {
            return loginDataContext.logout(path.server)
            .then(function () {
                return {
                    status: true
                };

            }, function (data) {
                return { 
                    status: false,
                    data: data
                }
            })
            .finally(clearLocalData);
        }
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
            forgotPassword: forgotPassword,
            setExtraTokenFB : function(token) {
                accountManager.setFacebookAccessToken(token);
            },
            setExtraTokenGP : function(token) {
                accountManager.setGoogleAccessToken(token);
            }
        }
    }]);
}());