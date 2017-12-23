"use strict";
const dynamic_repository_1 = require('nodedata/core/dynamic/dynamic-repository');
const Q = require('q');
// import { logger } from "../logging";
// import * as Logger from "../services/common/services/LoggerService";
class AuthorizationRepository extends dynamic_repository_1.DynamicRepository {
    ///Entity action Mehods
    preCreate(params) {
        return Q.resolve(params);
    }
    postCreate(params) {
        return Q.when(params);
    }
    preUpdate(params) {
        return Q.resolve(params);
    }
    postUpdate(params) {
        return Q.when(params);
    }
    preBulkCreate(params) {
        return Q.resolve(params);
    }
    preBulkDelete(params) {
        return Q.resolve(params);
    }
    postBulkCreate(params) {
        return Q.resolve(params);
    }
    preBulkUpdate(params) {
        return Q.when(params);
    }
    postBulkUpdate(params) {
        return Q.when(params);
    }
    preDelete(params) {
        return Q.when(params);
    }
    postDelete(params) {
        return Q.when(params);
    }
    postBulkDelete(params) {
        return Q.when(params);
    }
    preRead(params) {
        return Q.when(params);
    }
    postRead(params) {
        return Q.when(params);
    }
    preBulkRead(params) {
        return Q.when(params);
    }
    postBulkRead(params) {
        return Q.when(params);
    }
    bulkPost(objArr, batchSize) {
        let actionEntities = this.getEntityFromArgs.apply(this, arguments);
        if (!actionEntities) {
            actionEntities = [];
        }
        this.logEntityInfo("bulkPost", objArr);
        return this.preBulkCreate(actionEntities)
            .then((params) => {
            let entitiesToCreate = new Array();
            params.forEach((input) => { entitiesToCreate.push(input.inputEntity); });
            arguments[0] = entitiesToCreate;
            arguments[arguments.length - 1] = undefined;
            return super.bulkPost.apply(this, arguments).then((createdDbOEntites) => {
                let indexInMainCollection = 0;
                createdDbOEntites.forEach((createdEntity) => {
                    actionEntities[indexInMainCollection].newPersistentEntity = createdEntity;
                    indexInMainCollection++;
                });
                return this.postBulkCreate(actionEntities).then((result) => {
                    return result.map(x => x.newPersistentEntity);
                });
            }, (error) => {
                return Q.reject(error);
            });
        }, (error) => {
            return Q.reject(error);
        });
    }
    bulkPut(objArr, batchSize, donotLoadChilds) {
        if (!objArr || !objArr.length)
            return Q.when(objArr);
        let actionEntities = this.getEntityFromArgs.apply(this, arguments);
        if (!actionEntities) {
            actionEntities = [];
        }
        this.logEntityInfo("bulkPut", objArr);
        return this.preBulkUpdate(actionEntities)
            .then((params) => {
            let entitiesToUpdate = new Array();
            params.forEach((input) => { input.newPersistentEntity.__dbEntity = input.oldPersistentEntity; entitiesToUpdate.push(input.newPersistentEntity); });
            arguments[0] = entitiesToUpdate;
            arguments[arguments.length - 1] = undefined;
            return super.bulkPut.apply(this, arguments).then((createdDbOEntites) => {
                let indexInMainCollection = 0;
                createdDbOEntites.forEach((createdEntity) => {
                    actionEntities[indexInMainCollection].newPersistentEntity = createdEntity;
                    indexInMainCollection++;
                });
                return this.postBulkUpdate(actionEntities).then((result) => result.map(x => x.newPersistentEntity));
            }, (error) => {
                return Q.reject(error);
            });
        }, (error) => {
            return Q.reject(error);
        });
    }
    bulkDel(params) {
        let actionParams = this.getEntityFromArgs.apply(this, arguments);
        let entitiesToDelete = [];
        if (!actionParams) {
            actionParams = [];
        }
        this.logEntityInfo("bulkDel", params);
        actionParams.forEach((input) => { entitiesToDelete.push(input.newPersistentEntity); });
        return this.preBulkDelete(actionParams)
            .then((params) => {
            return super.bulkDel(entitiesToDelete).then((updatedDbObj) => {
                return this.postBulkDelete(actionParams).then((result) => result.map(x => x.newPersistentEntity));
            }, (error) => {
                return Q.reject(error);
            });
        }, (error) => {
            return Q.reject(error);
        });
    }
    // TODO: need to disccus whether we need to secure bulkPutMany action since it is not exposed  api, it is consumed by server only.
    bulkPutMany(objIds, obj) {
        obj._id = objIds[0];
        this.logEntityInfo("bulkPutMany", objIds);
        return super.bulkPutMany(objIds, obj);
    }
    findOne(id, donotLoadChilds) {
        let params = this.getEntityFromArgs.apply(this, arguments);
        if (!params) {
            params = {};
        }
        return this.preRead(params).then(result => {
            return this.postRead(result).then((updatedParams) => {
                return Q.resolve(updatedParams.newPersistentEntity);
            }).catch(exc => {
                return Q.reject(exc);
            });
        }).catch(exc => {
            return Q.reject(exc);
        });
    }
    findMany(ids, toLoadEmbededChilds) {
        let actionEntities = this.getEntityFromArgs.apply(this, arguments);
        if (!actionEntities) {
            actionEntities = [];
        }
        return this.preBulkRead(actionEntities).then(results => {
            return this.postBulkRead(results).then(newResults => {
                return Q.when(newResults.map(entity => entity.newPersistentEntity));
            }).catch(exc => {
                console.log("ERROR: ", exc);
                return Q.reject(exc);
            });
        }).catch(exc => {
            console.log("ERROR: ", exc);
            return Q.reject(exc);
        });
    }
    findWhere(query, selectedFields, queryOptions, toLoadChilds) {
        let actionEntities = this.getEntityFromArgs.apply(this, arguments);
        if (!actionEntities) {
            actionEntities = [];
        }
        return this.preBulkRead(actionEntities).then(results => {
            return this.postBulkRead(results).then(newResults => {
                return Q.when(newResults.map(entity => entity.newPersistentEntity));
            }).catch(exc => {
                console.log("ERROR: ", exc);
                return Q.reject(exc);
            });
        }).catch(exc => {
            console.log("ERROR: ", exc);
            return Q.reject(exc);
        });
    }
    findByField(fieldName, value) {
        return super.findByField(fieldName, value);
    }
    findChild(id, prop) {
        return super.findChild(id, prop);
    }
    put(id, obj) {
        let resultEntityActionObj = this.getEntityFromArgs.apply(this, arguments);
        if (!resultEntityActionObj) {
            resultEntityActionObj = {};
        }
        this.logEntityInfo("put", obj);
        return this.preUpdate(resultEntityActionObj)
            .then((params) => {
            params.newPersistentEntity.__dbEntity = params.oldPersistentEntity;
            return super.put(id, params.newPersistentEntity).then((updatedDbObj) => {
                resultEntityActionObj.newPersistentEntity = updatedDbObj;
                return this.postUpdate(resultEntityActionObj).then((updatedEntity) => {
                    return Q.when(updatedEntity.newPersistentEntity);
                }, (exc) => {
                    return Q.reject(exc);
                });
            }, (error) => {
                return Q.reject(error);
            });
        }, (error) => {
            return Q.reject(error);
        });
        //return super.put(id, obj);
    }
    post(obj) {
        this.logEntityInfo("post", obj);
        let resultEntityActionObj = this.getEntityFromArgs.apply(this, arguments);
        if (!resultEntityActionObj) {
            resultEntityActionObj = {};
        }
        return this.preCreate(resultEntityActionObj)
            .then((params) => {
            return super.post(params.inputEntity).then((updatedDbObj) => {
                resultEntityActionObj.newPersistentEntity = updatedDbObj;
                return this.postCreate(resultEntityActionObj).then((result) => result.newPersistentEntity);
            }, (error) => {
                return Q.reject(error);
            });
        }, (error) => {
            return Q.reject(error);
        });
    }
    delete(obj) {
        let resultEntityActionObj = this.getEntityFromArgs.apply(this, arguments);
        if (!resultEntityActionObj) {
            resultEntityActionObj = {};
        }
        this.logEntityInfo("delete", resultEntityActionObj.newPersistentEntity._id);
        return this.preDelete(resultEntityActionObj)
            .then((params) => {
            return super.delete(resultEntityActionObj.newPersistentEntity._id).then((updatedDbObj) => {
                resultEntityActionObj.newPersistentEntity = updatedDbObj;
                return this.postDelete(resultEntityActionObj).then((result) => result.newPersistentEntity);
            }, (error) => {
                return Q.reject(error);
            });
        }, (error) => {
            return Q.reject(error);
        });
    }
    patch(id, obj) {
        this.logEntityInfo("patch", obj);
        let resultEntityActionObj = this.getEntityFromArgs.apply(this, arguments);
        if (!resultEntityActionObj) {
            resultEntityActionObj = {};
        }
        return this.preUpdate(resultEntityActionObj)
            .then((params) => {
            params.inputEntity.__dbEntity = params.oldPersistentEntity;
            return super.patch(id, params.inputEntity).then((updatedDbObj) => {
                resultEntityActionObj.newPersistentEntity = updatedDbObj;
                // return this.postUpdate(resultEntityActionObj.newPersistentEntity);
                return this.postUpdate(resultEntityActionObj).then((updatedEntity) => {
                    return Q.when(updatedEntity.newPersistentEntity);
                }, (exc) => {
                    return Q.reject(exc);
                });
            }, (error) => {
                return Q.reject(error);
            });
        }, (error) => {
            return Q.reject(error);
        });
    }
    // @authorize({ roles: ['ROLE_A'] }) // Authorization part
    findAll() {
        let actionEntities = this.getEntityFromArgs.apply(this, arguments);
        if (!actionEntities) {
            actionEntities = [];
        }
        return this.postBulkRead(actionEntities).then((newResults) => {
            return Q.when(newResults.map((x) => x.newPersistentEntity));
        }).catch(exc => {
            console.log("ERROR: ", exc);
            return Q.reject(exc);
        });
    }
    getEntityType() {
        return super.getEntityType();
    }
    getEntityFromArgs() {
        let args = Array.prototype.slice.call(arguments);
        let params = args[args.length - 1];
        return params;
    }
    logEntityInfo(methodName, obj) {
        // let incomingJsonLog = {
        //     MenthodName: methodName,
        //     EntityObj: obj
        // };
        //this.logger.logInfo(incomingJsonLog);
    }
}
exports.AuthorizationRepository = AuthorizationRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthorizationRepository;

//# sourceMappingURL=AuthorizationRepository.js.map
