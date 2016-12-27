(function () {
    'use strict';
    angular.module('freeants')
    .provider('accountManager', function accountManager() {

        var appName = "";

        var persistent = "";

        var key = "";

        var apiKey = "";
        
        var access_token = "";
        var access_token_time = "";
        var access_token_date = "";
        var refresh_token = "";

        var userId = "";
        var userName = "";

        var gp_access_token = "";
        var fb_access_token = "";

        var resetStorages = function() {

            apiKey = "";

            access_token = "";
            access_token_time = "";
            access_token_date = "";
            refresh_token = "";

            userId = "";
            userName = "";

            gp_access_token = "";
            fb_access_token = "";

            // INFO: _remember risiede solo sulla localStorage
            localStorage.removeItem(appName + '_' + '_remember');

            // INFO: Può essere ApiKey o access_token
            localStorage.removeItem(appName + '_' + key);
            sessionStorage.removeItem(appName + '_' + key);

            localStorage.removeItem(appName + '_remember');
            sessionStorage.removeItem(appName + '_remember');

            localStorage.removeItem(appName + '_userId');
            sessionStorage.removeItem(appName + '_userId');
            localStorage.removeItem(appName + '_userName');
            sessionStorage.removeItem(appName + '_userName');
            
            localStorage.removeItem(appName + '_access_token_time');
            sessionStorage.removeItem(appName + '_access_token_time');
            localStorage.removeItem(appName + '_access_token_date');
            sessionStorage.removeItem(appName + '_access_token_date');

            localStorage.removeItem(appName + '_refresh_token');
            sessionStorage.removeItem(appName + '_refresh_token');

            localStorage.removeItem(appName + '_gp_access_token');
            sessionStorage.removeItem(appName  + '_gp_access_token');
            localStorage.removeItem(appName + '_fb_access_token');
            sessionStorage.removeItem(appName + '_fb_access_token');            
        }
        
        this.setAppName = function (applicationName, accessKey) {
            appName = applicationName;
            key = accessKey;
        }
        // INFO: Non è mai persistente
        this.setApiKey = function (value) {
            
            resetStorages();

            apiKey = value;
        }
        this.readLoginData = function () {

            apiKey = "";

            access_token = sessionStorage.getItem(appName + '_' + key);

            access_token_time = sessionStorage.getItem(appName + '_access_token_time');
            access_token_date = sessionStorage.getItem(appName + '_access_token_date');
            refresh_token = sessionStorage.getItem(appName + '_refresh_token');

            userId = sessionStorage.getItem(appName + '_userId');
            userName = sessionStorage.getItem(appName + '_userName');
            
            gp_access_token = sessionStorage.getItem(appName + '_gp_access_token');
            fb_access_token = sessionStorage.getItem(appName + '_fb_access_token');
            
            if (localStorage.getItem(appName + '_remember') == "false")
                return;

            access_token = localStorage.getItem(appName + '_' + key);

            access_token_time = localStorage.getItem(appName + '_access_token_time');
            access_token_date = localStorage.getItem(appName + '_access_token_date');
            refresh_token = localStorage.getItem(appName + '_refresh_token');
            
            userId = localStorage.getItem(appName + '_userId');
            userName = localStorage.getItem(appName + '_userName');

            gp_access_token = localStorage.getItem(appName + '_gp_access_token');
            fb_access_token = localStorage.getItem(appName + '_fb_access_token');                
        }
        
        //Export Function  
        this.$get = [function() {

            return {
                resetStorages : resetStorages,
                // E' obbligo chiamare per prima
                setPersistent: function (value) {
                    localStorage.setItem(appName + '_remember', value);
                    persistent = value;
                },
                setAccessToken: function (value) {
                    sessionStorage.setItem(appName + '_' + key, value);
                    if (persistent)
                        localStorage.setItem(appName + '_' + key, value);
                    access_token = value;
                },
                setRefreshToken: function(value) {
                    sessionStorage.setItem(appName + '_refresh_token', value);
                    if (persistent)
                        localStorage.setItem(appName + '_refresh_token', value);
                    refresh_token = value;
                },
                setAccessTokenTime: function(value) {
                    sessionStorage.setItem(appName+ '_access_token_time',value);
                    if (persistent)
                        localStorage.setItem(appName+ '_access_token_time',value);
                    access_token_time = value*1000;
                },
                setAccessTokenDate: function(value) {
                    sessionStorage.setItem(appName + '_access_token_date', value);
                    if (persistent)
                        localStorage.setItem(appName + '_access_token_date', value);
                    access_token_date = value;
                },
                setUserId: function(value) {
                    sessionStorage.setItem(appName + '_userId', value);
                    if (persistent)
                        localStorage.setItem(appName + '_userId', value);
                    userId = value;
                },
                setUserName: function (value) {
                    sessionStorage.setItem(appName + '_userName', value);
                    if (persistent)
                        localStorage.setItem(appName + '_userName', value);
                    userName = value;
                },
                setGoogleAccessToken: function(value) {
                    sessionStorage.setItem(appName + '_gp_access_token', value);
                    if (persistent)
                        localStorage.setItem(appName + '_gp_access_token', value);
                    gp_access_token = value;
                },
                setFacebookAccessToken: function(value) {
                    sessionStorage.setItem(appName + '_fb_access_token', value);
                    if (persistent)
                        localStorage.setItem(appName + '_fb_access_token', value);
                    fb_access_token = value;
                },                
                getAccessToken: function() {
                    return access_token;
                },
                getAccessTokenTime: function(){
                    return access_token_time;
                },
                getFBAccessToken: function() {
                    return fb_access_token;
                },
                getGPAccessToken: function(){
                    return gp_access_token;
                },
                getApiKey: function() {
                    return apiKey;
                },
                getUserInfo: function() {
                    return {
                        userName: accountManager.userName,
                        userId: accountManager.userId
                    };
                },
                checkAccessToken: function() {
                    var now = new Date();
                    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                    if (access_token) {
                        if (Date.parse(access_token_date) <= (Date.parse(now_utc))) {
                            return false;
                        }
                        return true;
                    }
                    return false;
                }
            }
        }];
    })
    .factory('accountManagerService', ['accountDataContext', 'path', 'accountManager', '$http', '$q', 
        function (accountDataContext, path, accountManager, $http, $q) {

            var timeoutRefresh = null;

            var reset = function() {
                if (timeoutRefresh) {
                    clearTimeout(timeoutRefresh);
                    timeoutRefresh = null;
                }
                accountManager.resetStorages();
            }
            var refresh = function(model) {
                return accountDataContext.refresh(path.server, model)
                .then(function (data) {
                    accountManager.setAccessToken(data.access_token);
                    accountManager.setRefreshToken(data.refresh_token);
                    accountManager.setAccessTokenTime(data.expires_in);
                    timeoutRefresh = setTimeout(function () {
                        var refreshModel = {
                            grant_type: "refresh_token",
                            refresh_token: refresh_token
                        } 
                        refresh(refreshModel);
                    }, accountManager.access_token_time);
                    return {
                        status: true,
                        data: data
                    };
                }, function (data) {
                    timeoutRefresh = setTimeout(function () {
                        var refreshModel = {
                            grant_type: "refresh_token",
                            refresh_token: refresh_token
                        } 
                        refresh(refreshModel);
                    }, 30000);

                    return { 
                        data: data,
                        status: false 
                    }
                });
            }

            return {
                login: function(model, persistent) {
                    return accountDataContext.login(path.server, model)
                    .then(function (data) {
                        
                        reset();

                        // Deve essere chiamata per prima
                        accountManager.setPersistent(persistent);

                        accountManager.setUserId(data.userId);
                        accountManager.setUserName(data.userName);
                        accountManager.setAccessToken(data.access_token);
                        accountManager.setRefreshToken(data.refresh_token);
                        accountManager.setAccessTokenTime(data.expires_in);
                        accountManager.setAccessTokenDate(data['.expires']);
                
                        timeoutRefresh = setTimeout(function () {
                            var refreshModel = {
                                grant_type: "refresh_token",
                                refresh_token: refresh_token
                            }   
                            refresh(refreshModel);
                        }, accountManager.getAccessTokenTime());

                        return {
                            status: true,
                            data: data
                        }
                    }, function (data) {
                        return { 
                            status: false,
                            data: data
                        }
                    });
                },
                logout: function() {
                    return accountDataContext.logout(path.server)
                    .then(function (data) {
                        return {
                            data: data,
                            status: true
                        };
                    }, function (data) {
                        return { 
                            data: data,
                            status: false
                        }
                    })
                    .finally(reset);
                },
                forgotPassword:function(email, culture) {
                    return accountDataContext.forgotPassword(email, culture);
                },
                // INFO: E' sempre resa persistente
                // TODO: Gestire il timer del refreshToken
                loginFB: function (token) {
                    
                    var def = $q.defer();

                    var req = {
                        method: 'POST',
                        url: path.api + '/Account/FacebookLogin',
                        data: JSON.stringify(token),
                        contentType: 'application/json; charset=utf-8',
                        headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': '*/*' }
                    }

                    $http(req)
                    .then(function(data) {

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
                                accountManager.setPersistent(true);
                                
                                accountManager.setAccessToken(responseData.access_token);
                                /*
                                accountManager.setRefreshToken(responseData.refresh_token);
                                accountManager.setAccessTokenTime(responseData.expires_in);
                                accountManager.setAccessTokenDate(responseData['.expires']);
                                */
                                accountManager.setUserId(responseData.userId);
                                accountManager.setUserName(responseData.userName);

                                def.resolve(data);
                                return data;
                            }, function (data) {
                                def.reject(data);
                                return data;
                            })
                        }
                        else
                        {
                            var dummy = {responseData: responseData, status: false}
                            def.resolve(dummy);
                        }
                        
                        //accountManager.setFacebookAccessToken(token);

                        return data;
                        
                    }, function (data) {
                        def.reject(data);
                        return data;
                    });
                    return def.promise;
                },
                // INFO: E' sempre resa persistente
                // TODO: Gestire il timer del refreshToken
                loginGP: function (token) {
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
                                return { 
                                    data: data,
                                    status: false 
                                }
                            })
                        }

                        accountManager.setAccessToken(access_token);
                        accountManager.setFacebookAccessToken(token);
                        accountManager.setPersistent(true);

                        return {
                            status: true,
                            data: data
                        };

                    }, function (data) {
                        return { 
                            data: data,
                            status: false 
                        }
                    });
                }
            }
        }
    ]);    
}());