(function () {
    "use strict";
    angular.module("freeants", [])
})();
(function() {
    'use strict';
    
    angular.module('freeants').factory('accountDataContext', ['$http', 'helpers', 'path', 
    function ($http, helpers, path) {

    // routes
    function loginUrl() {return path.server + "Token"}
    function accountUrl() { return path.api + "/Account"; }
    function logoutUrl() {return accountUrl() + "/Logout";}
    function getUserInfoUrl() { return accountUrl() + "/UserInfo"; }
    function forgotPasswordUrl(email,culture) { return accountUrl() + "/ForgotPassword/" + email + "/" +culture }
    function resetPasswordUrl() { return accountUrl() + "/ResetPassword"; }
    function changePasswordUrl() { return accountUrl() + "/ChangePassword"; }
    function registerByOnlyEmailUrl(email, culture) { return accountUrl() + "/RegisterByOnlyEmail/" + email +"/" + culture }
    function confirmAccountByOnlyEmailUrl() { return accountUrl() + "/ConfirmAccountByOnlyEmail/" }

    return {
        login : function(data) {
            var req = $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                url: loginUrl(),
                data: $.param(data)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        logout: function() {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: logoutUrl()
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        refresh: function(data) {
            var req = $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                url: loginUrl(),
                data: $.param(data)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        forgotPassword: function(email, culture) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: forgotPasswordUrl(email, culture)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        changePassword: function(passModel) {
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
        resetPassword: function(passModel) {
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
        registerByOnlyEmail: function(email, culture) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: registerByOnlyEmailUrl(email, culture)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        confirmAccountByOnlyEmail: function(confirmModel) {
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
        getUserInfo: function() {
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
            
            if (!localStorage.getItem(appName + '_remember'))
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
                    access_token_time = value;
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
                getRefreshToken: function() {
                    return refresh_token;
                },
                getAccessTokenDate: function(){
                    return access_token_date;
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
                        userName: userName,
                        userId: userId
                    };
                }
            }
        }];
    })
    .factory('accountManagerService', ['accountDataContext', 'path', 'accountManager', '$http', '$q', 
        function (accountDataContext, path, accountManager, $http, $q) {

            var refreshTokenTimeout = null;

            var resetRefreshTimeout = function() {
                if (refreshTokenTimeout) {
                    clearTimeout(refreshTokenTimeout);
                    refreshTokenTimeout = null;
                }                
            }
            var startRefreshTimeout = function(timeout) {

                return;// TODO: Questo metodo del del timer non sembra funzionare

                resetRefreshTimeout();

                var to = timeout ? timeout : accountManager.getAccessTokenTime() * 1000;
                refreshTokenTimeout = setTimeout(function () {
                    var refreshModel = {
                        grant_type: "refresh_token",
                        refresh_token: accountManager.getRefreshToken()
                    }   
                    refresh(refreshModel);
                }, to);
            }
            var reset = function() {
                resetRefreshTimeout();
                accountManager.resetStorages();
            }
            var refresh = function(model) {
                return accountDataContext.refresh(model)
                .then(function (data) {
                    accountManager.setAccessToken(data.access_token);
                    accountManager.setRefreshToken(data.refresh_token);
                    accountManager.setAccessTokenTime(data.expires_in);
                    // TODO: Perchè non si preleva data['.expires'] come avviene nel login?
                    startRefreshTimeout();
                    return {
                        status: true,
                        data: data
                    };
                }, function (data) {
                    startRefreshTimeout(30000);
                    return { 
                        data: data,
                        status: false 
                    }
                });
            }

            return {
                checkAccessToken: function() {
                    var now = new Date();
                    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                    if (accountManager.getAccessToken()) {
                        if (Date.parse(accountManager.getAccessTokenDate()) <= (Date.parse(now_utc))) {
                            reset();
                            return false;
                        }
                        // TODO: Qui dovrebbe essere avviato il timer del refresh token, ma access_token_time è quello di quando si è fatto il login e quindi non ha più senso utilizzarlo
                        // TODo: Potrebbe essere scaduto anche il refresh_token
                        return true;
                    }
                    reset();
                    return false;
                },
                login: function(model, persistent) {

                    reset();

                    return accountDataContext.login(model)
                    .then(function (data) {

                        // TODO: Sarebbe bello unificare questi metodi
                        // Deve essere chiamata per prima
                        // Se il parametro persistent non è passato si lascia il valore per come era
                        if (persistent)
                            accountManager.setPersistent(persistent);
                        accountManager.setUserId(data.userId);
                        accountManager.setUserName(data.userName);
                        accountManager.setAccessToken(data.access_token);
                        accountManager.setRefreshToken(data.refresh_token);
                        accountManager.setAccessTokenTime(data.expires_in);
                        accountManager.setAccessTokenDate(data['.expires']);
                
                        startRefreshTimeout();

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
                    return accountDataContext.logout()
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
                // TODO: Gestire il timer del refreshToken quando comunque funzionerà
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
                                accountManager.setUserId(data.data.userId);
                                accountManager.setUserName(data.data.userName);
                                accountManager.setFacebookAccessToken(token);

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
                        
                        return data;
                        
                    }, function (data) {
                        def.reject(data);
                        return data;
                    });
                    return def.promise;
                },
                // INFO: E' sempre resa persistente
                // TODO: Gestire il timer del refreshToken quando comunque funzionerà
                loginGP: function (token) {

                    var def = $q.defer();
                    
                    var req = {
                        method: 'POST',
                        url: path.api + '/Account/GoogleLogin',
                        data: JSON.stringify(token),
                        contentType: 'application/json; charset=utf-8',
                        headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': '*/*' },
                    };
                    
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
                                accountManager.setUserId(data.data.userId);
                                accountManager.setUserName(data.data.userName);
                                accountManager.setGoogleAccessToken(token);

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
                        
                        return data;
                        
                    }, function (data) {
                        def.reject(data);
                        return data;
                    });
                    return def.promise;
                }
            }
        }
    ]);    
}());
(function () {

    'use strict'

    var app = angular.module('freeants');

    app.factory('ApplicationThingsManager', ['$timeout', '$q', 'thingsDataContext', 'thingUserRightsDataContext', 'notifierConnector', 'thingClaims', 'thingsManager', 'ThingModel', 'accountManager',
    function ($timeout, $q, thingsDataContext, thingUserRightsDataContext, notifierConnector, thingClaims, thingsManager, ThingModel, accountManager) {
        function ApplicationThingsManager(mainThing, thingKind, rightsAndClaims, usersManager) {

            var self = this;

            this.rightsAndClaims = rightsAndClaims;

            this.thingKind = thingKind;

            this.mainThing = mainThing;
            this.things = this.mainThing.children;

            this.getThingsParams = {
                //parentThingId: null,
                filter: "Kind eq '" + this.thingKind + "'",
                top: 10,
                //skip: 0,
                orderBy: null,
                valueFilter: null
            }
            this.getChindrenThingsParams = {
                parentThingId: null,
                filter: "",
                top: 10,
                skip: 0,
                orderBy: null,
                valueFilter: null
            }

            // TODO: Spostare su thingsManager
            this.searchThing = function searchThing(things, thingId) {
                var thing = null;
                var index = -1;
                if (things) {
                    for (var i = 0; i < things.length; i++) {
                        if (things[i].id == thingId) {
                            thing = things[i];
                            index = i;
                            break;
                        }
                    }
                }
                if (thing)
                    return { thing: thing, thingIndex: index };
                else
                    null;
            }
            this.searchThingChild = function searchThingChild(things, childId, parentId) {
                var child = null;
                var appIndex = -1;
                var childIndex = 1;
                if (things) {
                    for (var i = 0; i < things.length; i++) {
                        if ((parentId == null) || (things[i].id == parentId)) {
                            var thing = this.searchThing(things[i].children, childId);
                            if (thing) {
                                child = thing.thing;
                                appIndex = i;
                                childIndex = thing.thingIndex;
                                break;
                            }
                        }
                    }
                }
                if (child)
                    return { child: child, appIndex: appIndex, childIndex: childIndex };
                else
                    return null;
            }

            this.onCreateThing = function onCreateThing(thing) {
                if (thing.kind == self.thingKind) {
                    thingsManager.addThingChild(self.mainThing, thing);
                    return;
                }
            }
            this.onUpdateThing = function onUpdateThing(thing) {
                var thingObj = self.searchThing(self.mainThing.children, thing.id);
                if (thingObj) {
                    var thingModel = new ThingModel(thing, thingObj.thing.children, thingObj.thing.childrenSkip, thingObj.thing.childrenTotalItems);
                    self.mainThing.children[thingObj.thingIndex] = thingModel;
                    $timeout(null, 1);
                    return;
                }
                var childThing = self.searchThingChild(self.mainThing.children, thing.id);
                if (childThing) {
                    var childThingModel = new ThingModel(thing, childThing.child.children, childThing.child.childrenSkip, childThing.child.childrenTotalItems);
                    self.mainThing.children[childThing.appIndex].children[childThing.childIndex] = childThingModel;
                    $timeout(null, 1);
                    return;
                }
            }
            // TODO: Gestire la cancellazione di un Service?
            this.onDeleteThing = function onDeleteThing(thingId) {
                var thing = self.searchThing(self.mainThing.children, thingId);
                if (thing) {
                    self.mainThing.children.splice(thing.thingIndex, 1);
                    return;
                }
            }

            this.onUpdateThingValue = function onUpdateThingValue(thingId, value) {

                var thingObj = self.searchThing(self.mainThing.children, thingId);
                if (thingObj) {
                    thingObj.thing.value = angular.fromJson(value);
                    $timeout(null, 1);
                    return;
                }
                var childThing = self.searchThingChild(self.mainThing.children, thingId);
                if (childThing) {
                    childThing.child.value = angular.fromJson(value);
                    $timeout(null, 1);
                    return;
                }
            }

            // TODO: Pensare a come evitare di fare una chiamata verso il server per ottenere la Thing aggiunta
            this.onCreateChildThingId = function onCreateChildThingId(parentId, childId, kind) {
                var thing = self.searchThing(self.mainThing.children, parentId);
                if (thing) {
                    thingsDataContext.getThing(childId)
                    .then(function (data) {
                        thing.thing.children.push(new ThingModel(data));
                    });
                    return;
                }
            }
            this.onDeleteChildThingId = function onDeleteChildThingId(parentId, childId, kind) {
                var childObj = self.searchThingChild(self.mainThing.children, childId, parentId);
                if (childObj)
                    self.mainThing.children[childObj.appIndex].children.splice(childObj.childIndex, 1);
            }

            // TODO: Pensare a come evitare di fare una chiamata verso il server per ottenere lo User
            this.onCreateThingUserRights = function onCreateThingUserRights(thingId, userRights) {                   
                var thing = self.searchThing(self.mainThing.children, thingId);
                if (thing) {
                    usersManager.getUser(userRights.userId)
                    .then(function (user) {
                        thing.thing.usersInfos.unshift(user);
                    });
                    return;
                }
                else {
                    var childThing = self.searchThingChild(self.mainThing.children, thingId);
                    if (childThing) {
                        usersManager.getUser(userRights.userId)
                            .then(function (user) {
                                childThing.child.usersInfos.unshift(user);
                            });
                    }
                    else {
                            thingsManager.getThing(thingId).then(function (data) {
                                var thing = data;
                                if (thing && thing.kind == self.thingKind) {
                                    thingsManager.addThingChild(self.mainThing, thing);
                                }
                            });
                    }
                }
            }
            this.onUpdateThingUserRights = function onUpdateThingUserRights(thingId, userRights) {
            }
            this.onDeleteThingUserRights = function onDeleteThingUserRights(thingId, userId) {
                var userInfos = accountManager.getUserInfo();
                var thing = self.searchThing(self.mainThing.children, thingId);
                if (thing) {
                    if (userId == userInfos.userId) {
                        self.mainThing.children.splice(thing.thingIndex, 1);
                    }
                    else {
                        var user = self.searchThing(thing.thing.usersInfos, userId);
                        if (user) {
                            self.mainThing.children[thing.thingIndex].usersInfos.splice(user.thingIndex, 1);
                        }
                    }
                }
                else {
                    var childThing = self.searchThingChild(self.mainThing.children, thingId);
                    if (childThing) {
                        var user = self.searchThing(childThing.child.usersInfos, userId);
                        if (user) {
                            self.mainThing.children[childThing.appIndex].children[childThing.childIndex].usersInfos.splice(user.thingIndex, 1);
                        }
                    }
                }
                $timeout(null, 1);
            }

            notifierConnector.setHook('onCreateThing', self.onCreateThing);
            notifierConnector.setHook('onUpdateThing', self.onUpdateThing);
            notifierConnector.setHook('onDeleteThing', self.onDeleteThing);
            notifierConnector.setHook('onUpdateThingValue', self.onUpdateThingValue);
            notifierConnector.setHook('onCreateChildThingId', self.onCreateChildThingId);
            notifierConnector.setHook('onDeleteChildThingId', self.onDeleteChildThingId);
            notifierConnector.setHook('onCreateThingUserRights',self.onCreateThingUserRights);
            notifierConnector.setHook('onUpdateThingUserRights', self.onUpdateThingUserRights);
            notifierConnector.setHook('onDeleteThingUserRights', self.onDeleteThingUserRights);
        }

        ApplicationThingsManager.prototype.dispose = function() {
            
            notifierConnector.remHook('onDeleteThingUserRights', this.onUpdateThingUserRights);
            notifierConnector.remHook('onUpdateThingUserRights', this.onUpdateThingUserRights);
            notifierConnector.remHook('onCreateThingUserRights',this.onCreateThingUserRights);
            notifierConnector.remHook('onDeleteChildThingId', this.onDeleteChildThingId);
            notifierConnector.remHook('onCreateChildThingId', this.onCreateChildThingId);
            notifierConnector.remHook('onUpdateThingValue', this.onUpdateThingValue);
            notifierConnector.remHook('onDeleteThing', this.onDeleteThing);
            notifierConnector.remHook('onUpdateThing', this.onUpdateThing);
            notifierConnector.remHook('onCreateThing', this.onCreateThing);
        }

        // Children Things
        ApplicationThingsManager.prototype.setTopChildrenThings = function (top) {
            this.getChindrenThingsParams.top = top;
        }
        ApplicationThingsManager.prototype.getThingChildrenTotalsItems = function (thing) {
            return thing.childrenTotalItems;
        }
        ApplicationThingsManager.prototype.getMoreThingChildren = function (thing, cancel) {
            return thingsManager.getMoreThingChildren(thing, this.getChindrenThingsParams, cancel)
        }
        ApplicationThingsManager.prototype.addChild = function (thingId, childId) {
            return thingsDataContext.addChildToParent(thingId, childId);
        }
        ApplicationThingsManager.prototype.collapseThing = function (thingId, cancel) {
            if (this.mainThing.id == thingId) {
                thingsManager.collapseThing(this.mainThing, cancel)
                return;
            }

            var thing = null;
            for(var i = 0;i < this.mainThing.children.length;i++)
                if (thingId == this.mainThing.children[i].id) {
                    thing = this.mainThing.children[i];
                    break
                }
            if (thing)
                thingsManager.collapseThing(thing, cancel)
        }

        ApplicationThingsManager.prototype.setTopThings = function (top) {
            this.getThingsParams.top = top;
        }
        ApplicationThingsManager.prototype.getThingsTotalItems = function () {
            return this.mainThing.childrenTotalItems;
        }
        ApplicationThingsManager.prototype.getMoreThings = function (cancel) {

            var self = this;// Useful into callback

            var def = $q.defer();

            thingsManager.getMoreThingChildren(this.mainThing, this.getThingsParams, cancel)
            .then(function (data) {
                var promises = [];

                // Try to get all things children
                for (var i = 0; i < data.things.length; i++) {
                    promises.push(self.getMoreThingChildren(data.things[i], cancel));
                }

                $q.all(promises)
                .then(function (data) {
                    def.resolve(data);
                    return data;
                }, function (data) {
                    if (cancel)
                        cancel.resolve();
                    def.reject(data);
                    return data;
                });
            });

            return def.promise;
        }            
        ApplicationThingsManager.prototype.createThing = function (thing) {

            //Forzo qualunque cosa venga passata

            thing.kind = this.thingKind;
            thing.deletedStatus = thingClaims.ThingDeletedStatusOk;

            thing.publicReadClaims = this.rightsAndClaims.PublicReadClaims;
            thing.publicChangeClaims = this.rightsAndClaims.PublicChangeClaims;
            thing.everyoneReadClaims = this.rightsAndClaims.EveryoneReadClaims;
            thing.everyoneChangeClaims = this.rightsAndClaims.EveryoneChangeClaims;

            thing.userRole = thingClaims.ThingUserRoleAdministrator;
            thing.userStatus = thingClaims.ThingUserStatusOk;

            thing.userReadClaims = this.rightsAndClaims.CreatorUserReadClaims;
            thing.userChangeClaims = this.rightsAndClaims.CreatorUserChangeClaims;

            return thingsManager.createThing(thing);
        }
        ApplicationThingsManager.prototype.updateThing = function (thing) {
            return thingsDataContext.updateThing(thing.id, thing);
        }
        ApplicationThingsManager.prototype.deleteThing = function (thingId, recursive) {
            return thingsManager.deleteThing(thingId, recursive);
        }
        ApplicationThingsManager.prototype.shallowCopyThing = function (thing) {
            return thingsManager.shallowCopyThing(thing);
        }
        ApplicationThingsManager.prototype.updateThingFromCopy = function (thing, thingChild) {
            var app = this.searchThing(this.things, thing.id);
            this.things[app.thingIndex].childrenSkip = thing.childrenSkip;
            this.things[app.thingIndex].childrenTotalItems = thing.childrenTotalItems;
            if (thingChild) {
                var service = this.searchThing(this.things[app.thingIndex].children, thingChild.id);
                this.things[app.thingIndex].children[service.thingIndex].childrenSkip = thingChild.childrenSkip;
                this.things[app.thingIndex].children[service.thingIndex].childrenTotalItems = thingChild.childrenTotalItems;
            }
        }

        ApplicationThingsManager.prototype.removeUser = function (thingId, userId) {
            return thingUserRightsDataContext.deleteThingUserRights(thingId, userId);
        }
        
        return ApplicationThingsManager;
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
        "ThingUserReadClaimsCanReadDeletedStatus": 64,
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
                var accessToken = accountManager.getAccessToken();
                if (accessToken) {
                    return { "Authorization": "Bearer " + accessToken };
                }
                var apiKey = accountManager.getApiKey();
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
    angular.module('freeants').factory('imagesRawDataContext', ['$http', 'helpers','path', function ($http, helpers, path) {

    function imagesRawUrl(id) { return path.api + "/imagesRaw/" + (id || ""); }

    return {

        createImageRaw : function (imageData) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: imagesRawUrl(),
                data: '"' + imageData + '"'
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        deleteImageRaw: function (fileName) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: imagesRawUrl(fileName)
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
                            localStorage.setItem(localStorageLabel, lang);
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
    
    angular.module('freeants').factory('schedulerDataContext', ['$http', 'helpers', 'path', 
    function ($http, helpers, path) {
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
                    method: 'DELETE',
                    headers: helpers.getSecurityHeaders(),
                    url: SchedulerUrl() + "/" + thingId + "/" + schedulerId,
                    data: null
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
    function thingsPositionsUrl() { return path.api + "/things/positions" }
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
        },
        putThingsPositions: function (positions) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: thingsPositionsUrl(),
                data: positions
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
		
        function ThingModel(thingRaw, children, skip, totalItems) {
            
            this.childrenSkip = !!skip ? skip : 0;
            this.childrenTotalItems = !!totalItems ? totalItems : Number.MAX_SAFE_INTEGER;
            this.children = !!children ? children : [];
            
            this.setData(thingRaw);
        }

        ThingModel.prototype.setData = function (thingData) {

                if (thingData) {
                    angular.extend(this, thingData);
                }

                if (this.value == null || this.value == "") {
                    this.value = {};
                }
                this.value = angular.fromJson(this.value);
        }
        ThingModel.prototype.collapse = function () {

                this.childrenSkip = 0;
                // INFO: Non lo azzero per tenere traccia di quanti potenziali Children potrebbero esserci
                // this.childrenTotalItems = Number.MAX_SAFE_INTEGER;
                this.children = [];
        }
        ThingModel.prototype.shallowCopy = function () {
            var currentThing = JSON.parse(JSON.stringify(this));
            if (this.children)
                currentThing.children = this.children;
            if (this.usersInfos)
                currentThing.usersInfos = this.usersInfos;
            return currentThing;
        }            

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

	angular.module('freeants').factory('thingsManager', ['$q', 'thingsDataContext', 'ThingModel', 
    function ($q, thingsDataContext, ThingModel) {

        function getMoreThingChildren(thing, parameter, cancel) {

            parameter.skip = thing.childrenSkip;
            parameter.parentThingId = thing.id;

            return getThings(parameter, cancel)
            .then(function (data) {

                thing.childrenTotalItems = data.itemsRange.totalItems;
                thing.childrenSkip = thing.childrenSkip + parameter.top;
                //  Fix range
                if (thing.childrenSkip > thing.childrenTotalItems) {
                    thing.childrenSkip = thing.childrenTotalItems;
                }

                for (var i = 0; i < data.things.length;i++)
                    thing.children.push(data.things[i]);

                return data;
            });
        }

        //TODO: def non serve a niente
        function deleteThingChildren(parentThingId, recursive) {

            return thingsDataContext.getChildrenIds(parentThingId)
            .then(function (childrenIds) {

                var def = $q.defer();

                var childrenPromises = [];

                for (var i = 0; i < childrenIds.length; i++) {
                    childrenPromises.push(deleteThing(childrenIds[i], recursive));
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

        function addThingChild(thing, childThingRaw) {
            thing.children.unshift(new ThingModel(childThingRaw));
        }

        function collapseThing(thing, cancel) {
            if (cancel)
                cancel.resolve();
            thing.collapse();
        }

        function getThing(thingId) {
            function getSucceded(data) {

                var thing = null;

                if (data) {
                    thing = new ThingModel(data);
                }
                return thing;
            }
            return thingsDataContext.getThing(thingId)
                .then(getSucceded);
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
        
        function createThing(thingRaw) {
            return thingsDataContext.createThing(thingRaw)
            .then(function (data) {
                return new ThingModel(data);
            });
        }        

        function deleteThing(thingId, recursive) {
            
            if (recursive) {
              return deleteThingChildren(thingId, recursive)
              .then(function(data){
                  return thingsDataContext.deleteThing(thingId);
              });   
            }

            return thingsDataContext.deleteThing(thingId);
        }        

        function shallowCopyThing(thing) {
            return thing.shallowCopy();
        }

        return {
            getThing: getThing,
            getThings: getThings,
            createThing: createThing,
            deleteThing: deleteThing,
            getMoreThingChildren: getMoreThingChildren,
            deleteThingChildren: deleteThingChildren,
            addThingChild: addThingChild,
            collapseThing: collapseThing,
            shallowCopyThing: shallowCopyThing             
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
                url: thingsUserRoleStatusUrl(parameter.thingId) + "?" +
                    (!!parameter.filter ? ("&$filter=" + parameter.filter) : "") +
                    (!!parameter.top ? ("&$top=" + parameter.top) : "") +
                    (!!parameter.skip ? ("&$skip=" + parameter.skip) : "") +
                    (!!parameter.orderBy ? ("&$orderby=" + parameter.orderBy) : "")
            }).then(function (response) {
                return response.data;
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
        var localStorageLabel = "Language";
    return {
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
            $translate.refresh(lang);
            $translate.use(lang);
        },
        setLocalStorageLabel: function (label) {
            localStorageLabel = label;
        },
        getCurrentLanguage: function(){
            return localStorage.getItem(localStorageLabel);
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
            $translate.refresh(lang);
            $translate.use(lang);
        },
        setLanguages: function (data) {
            angular.merge(languages, data);
        },
        initialize: function (obj) {
            angular.merge(languages, obj);
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
            var deviceCulture = "en-GB";

            var language = culture;
            if (!language)
                language = $translate.use();
            for (var i = 0; i < supportedLanguages.length; i++) {
                if (language == supportedLanguages[i].code) {
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
    angular.module('freeants').factory('userDataContext', ['$http', 'helpers','path', function ($http, helpers, path) {

    function usersUrl(id) { return path.api + "/users/" + (id || ""); }

    return {

        getUsers : function (parameter, timeout) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                timeout: (timeout) ? (timeout.promise) : null,
                url: usersUrl() + "?" +
                    (!!parameter.filter ? ("&$filter=" + parameter.filter) : "") +
                    (!!parameter.top ? ("&$top=" + parameter.top) : "") +
                    (!!parameter.skip ? ("&$skip=" + parameter.skip) : "") +
                    (!!parameter.orderBy ? ("&$orderby=" + parameter.orderBy) : "")
            }).then(function (response) {
                return {
                    users: response.data,
                    itemsRange: helpers.getRangeItemsFromResponse(response)
                };
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

(function () {
    'use strict';

    angular.module('freeants').factory('UsersManager', ['$q', '$filter', 'userDataContext', function ($q, $filter, userDataContext) {
        
        function UsersManager() {

            this.skip = 0;
            this.usersTotalItems = Number.MAX_SAFE_INTEGER;

            this.users = [];

            this.getUsersParams = {			
                filter: "",
                top: 5,
                skip: this.skip,
                orderBy: null,
            };
        }

        UsersManager.prototype.getUser = function getUser(userId) {
            
            var result = $filter('filter')(this.users, { id: userId });
            if (result.length != 0) {
                var def = $q.defer();
                def.resolve(result[0]);

                return def.promise;
            }

            return userDataContext.getUser(userId);
        }

        UsersManager.prototype.getMoreUsers = function getMoreUsers(cancel) {
            var self = this;

            self.getUsersParams.skip = self.skip;

            return userDataContext.getUsers(this.getUsersParams, cancel)
            .then(function(data) {

                self.usersTotalItems = data.itemsRange.totalItems;
                self.skip += self.getUsersParams.top;
                //  Fix range
                if (self.skip > self.usersTotalItems) {
                    self.skip = self.usersTotalItems;
                }

                for (var i = 0; i < data.users.length;i++)
                    self.users.push(data.users[i]);

                return data;
            });              
        }

         UsersManager.prototype.getUsersItems = function() {
            return this.users.length;
        }

        UsersManager.prototype.getUsersTotalItems = function() {
            return this.usersTotalItems;
        }

        return UsersManager;

    }]);
	
}());