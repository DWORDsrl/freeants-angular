(function () {

    'use strict'

    var app = angular.module('freeants');

    app.factory('ApplicationThingsManager', ['$timeout', '$q', 'thingsDataContext', 'notifierConnector', 'thingClaims', 'thingsManager', 'ThingModel', 'accountManager',
    function ($timeout, $q, thingsDataContext, notifierConnector, thingClaims, thingsManager, ThingModel, accountManager) {
        function ApplicationThingsManager(mainThing, thingKind, rightsAndClaims, usersManager, thingId) {

            var self = this;

            this.rightsAndClaims = rightsAndClaims;

            this.thingKind = thingKind;
            this.thingId = thingId;

            this.mainThing = mainThing;
            this.things = this.mainThing.children;

            var filterThingId = thingId ? " and Id eq '" + thingId + "'" : "";

            this.getThingsParams = {
                // Viene sovrascritto da thingsManager
                // parentThingId: null,
                filter: "Kind eq '" + this.thingKind + "'" + filterThingId,
                top: 10,
                //skip: 0,
                orderBy: null,
                valueFilter: null
            }
            this.getChindrenThingsParams = {
                // Viene sovrascritto da thingsManager
                // parentThingId: null,
                filter: "",
                top: 10,
                // Viene sovrascritto da thingsManager
                // skip: 0,
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

            this.onCreateThing = function onCreateThing(thingRaw) {
                // Si sta gestendo una sola Thing
                if (self.thingId)
                    return;
                if (thingRaw.kind == self.thingKind) {
                    thingsManager.addThingChild(self.mainThing, thingRaw);
                    $timeout(null, 1);
                    return;
                }
            }
            this.onUpdateThing = function onUpdateThing(thingRaw) {
                var thingObj = self.searchThing(self.mainThing.children, thingRaw.id);
                if (thingObj) {
                    thingObj.thing.setData(thingRaw);
                    $timeout(null, 1);
                    return;
                }
                var childThing = self.searchThingChild(self.mainThing.children, thingRaw.id);
                if (childThing) {                    
                    self.mainThing.children[childThing.appIndex].children[childThing.childIndex].setData(thingRaw);
                    $timeout(null, 1);
                    return;
                }
            }
            // TODO: Gestire la cancellazione di un Child?
            this.onDeleteThing = function onDeleteThing(thingId) {
                var thing = self.searchThing(self.mainThing.children, thingId);
                if (thing) {
                    self.mainThing.children.splice(thing.thingIndex, 1);
                    $timeout(null, 1);
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

            this.onUpdateThingPosition = function onUpdateThingPosition(position) {

                function swapPos(things, thing, pos) {
                    var oldThing = null;
                    if (pos < things.length)
                        oldThing = things[position.pos];
                    things[position.pos] = thing;
                    things[i] = oldThing;
                }

                if (!position.parentId) {
                    if (self.mainThing.id)
                        return;
                    for(var i = 0; i < self.mainThing.children.length; i++) {
                        var childThing = self.mainThing.children[i];
                        if (childThing.id == position.childId) {
                            swapPos(self.mainThing.children, childThing, position.pos);
                            $timeout(null, 1);
                            return;
                        }
                    }
                    return;
                }

                if (position.parentId == self.mainThing.id) {
                    for(var i = 0; i < self.mainThing.children.length; i++) {
                        var childThing = self.mainThing.children[i];
                        if (childThing.id == position.childId) {
                            swapPos(self.mainThing.children, childThing, position.pos);
                            $timeout(null, 1);
                            return;
                        }
                    }
                    return;
                }

                for(var i = 0; i < self.mainThing.children.length; i++) {
                    var parentThing = self.mainThing.children[i];
                    if (position.parentId == parentThing.id) {
                        for(var i = 0; i < parentThing.children.length; i++) {
                            var childThing = parentThing.children[i];
                            if (childThing.id == position.childId) {
                                swapPos(parentThing.children, childThing, position.pos);
                                $timeout(null, 1);
                                return;
                            }
                        }
                        return;
                    }   
                }
            }

            // TODO: Pensare a come evitare di fare una chiamata verso il server per ottenere la Thing aggiunta
            this.onCreateChildThingId = function onCreateChildThingId(parentId, childId, kind) {
                var thing = self.searchThing(self.mainThing.children, parentId);
                if (thing) {
                    thingsDataContext.getThing(childId)
                    .then(function (data) {
                        thing.thing.children.push(new ThingModel(data));
                        $timeout(null, 1);
                    });
                }
            }
            this.onDeleteChildThingId = function onDeleteChildThingId(parentId, childId, kind) {
                var childObj = self.searchThingChild(self.mainThing.children, childId, parentId);
                if (childObj) {
                    self.mainThing.children[childObj.appIndex].children.splice(childObj.childIndex, 1);
                    $timeout(null, 1);
                }
            }

            // TODO: Pensare a come evitare di fare una chiamata verso il server per ottenere lo user
            // TODO: Pensare a come evitare la getThing
            // TODO: Se viene aggiunto uno UserRights a un figlio del figlio non si riesce a rintracciare il parentId
            //       inoltre il server non notifica le eventuali relazioni Parent/Child ne quindi le relative posizioni
            this.onCreateThingUserRights = function onCreateThingUserRights(thingId, userRights) {

                var thing = self.searchThing(self.mainThing.children, thingId);
                if (thing) {
                    if (!usersManager)
                        return;
                    usersManager.getUser(userRights.userId)
                    .then(function (user) {
                        thing.thing.usersInfos.unshift(user);
                    });
                    $timeout(null, 1);
                    return;
                }
                var childThing = self.searchThingChild(self.mainThing.children, thingId);
                if (childThing) {
                    if (!usersManager)
                        return;
                    usersManager.getUser(userRights.userId)
                    .then(function (user) {
                        childThing.child.usersInfos.unshift(user);                            
                    });
                    $timeout(null, 1);
                    return;
                }

                // Si sta gestendo una sola Thing quindi non l'aggiungo
                if (self.thingId)
                    return;

                thingsManager.getThing(thingId)
                .then(function (data) {
                    var thing = data;
                    if (thing && thing.kind == self.thingKind) {
                        thingsManager.addThingChild(self.mainThing, thing);
                    }
                    $timeout(null, 1);
                });

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
            notifierConnector.setHook('onUpdateThingPosition', self.onUpdateThingPosition);
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

            //Forzo quasi qualunque cosa venga passata

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
        ApplicationThingsManager.prototype.addUser = function (thingId, thingUserRights, recursive) {
            return thingsManager.addUser(thingId, thingUserRights, recursive);
        }
        ApplicationThingsManager.prototype.updateUser = function (thingId, userId, thingUserRights, recursive) {
            return thingsManager.updateUser(thingId, userId, thingUserRights, recursive);
        }
        ApplicationThingsManager.prototype.removeUser = function (thingId, userId, recursive) {
            return thingsManager.removeUser(thingId, userId, recursive);
        }
        
        return ApplicationThingsManager;
    }]);
    
}());