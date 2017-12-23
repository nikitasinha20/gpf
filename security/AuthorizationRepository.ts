﻿import { repository } from "nodedata/core/decorators";
import { preauthorize } from "nodedata/core/decorators/preauthorize";
import { entityAction, EntityActionParam } from "nodedata/core/decorators/entityAction";
import { postfilter } from "nodedata/core/decorators/postfilter";
import { authorize } from "nodedata/core/decorators/authorize";
import { } from 'nodedata/di/decorators/inject';
import { DynamicRepository } from 'nodedata/core/dynamic/dynamic-repository';
import { inject } from 'nodedata/di/decorators/inject';
import Q = require('q');
// import { logger } from "../logging";
// import * as Logger from "../services/common/services/LoggerService";


export class AuthorizationRepository extends DynamicRepository {

    ///Entity action Mehods

    preCreate(params: EntityActionParam): Q.Promise<EntityActionParam> {
        return Q.resolve(params);
    }

    postCreate(params: EntityActionParam): Q.Promise<EntityActionParam> {
        return Q.when(params);
    }

    preUpdate(params: EntityActionParam): Q.Promise<EntityActionParam> {
        return Q.resolve(params);
    }

    postUpdate(params: EntityActionParam): Q.Promise<EntityActionParam> {
        return Q.when(params);
    }


    preBulkCreate(params: Array<EntityActionParam>): Q.Promise<Array<EntityActionParam>> {
        return Q.resolve(params);
    }

    preBulkDelete(params: Array<EntityActionParam>): Q.Promise<Array<EntityActionParam>> {
        return Q.resolve(params);
    }

    postBulkCreate(params: Array<EntityActionParam>): Q.Promise<Array<EntityActionParam>> {
        return Q.resolve(params);
    }

    preBulkUpdate(params: Array<EntityActionParam>): Q.Promise<Array<EntityActionParam>> {
        return Q.when(params);
    }

    postBulkUpdate(params: Array<EntityActionParam>): Q.Promise<Array<EntityActionParam>> {
        return Q.when(params);
    }

    preDelete(params: EntityActionParam): Q.Promise<EntityActionParam> {
        return Q.when(params);
    }

    postDelete(params: EntityActionParam): Q.Promise<EntityActionParam> {
        return Q.when(params);
    }

    postBulkDelete(params: Array<EntityActionParam>): Q.Promise<Array<EntityActionParam>> {
        return Q.when(params);
    }

    preRead(params: EntityActionParam): Q.Promise<EntityActionParam> {
        return Q.when(params);
    }

    postRead(params: EntityActionParam): Q.Promise<any> {
        return Q.when(params);
    }

    preBulkRead(params: Array<EntityActionParam>): Q.Promise<Array<EntityActionParam>> {
        return Q.when(params);
    }

    postBulkRead(params: Array<EntityActionParam>): Q.Promise<Array<EntityActionParam>> {
        return Q.when(params);
    }

    bulkPost(objArr: Array<any>, batchSize?: number): Q.Promise<any> {
        let actionEntities: Array<EntityActionParam> = this.getEntityFromArgs.apply(this, arguments);
        if (!actionEntities) {
            actionEntities = [];
        }
        this.logEntityInfo("bulkPost", objArr);
        return this.preBulkCreate(actionEntities)
            .then((params: Array<EntityActionParam>) => {
                let entitiesToCreate: Array<any> = new Array<any>();
                params.forEach((input: EntityActionParam) => { entitiesToCreate.push(input.inputEntity); });
                arguments[0] = entitiesToCreate;
                arguments[arguments.length - 1] = undefined;
                return super.bulkPost.apply(this, arguments).then((createdDbOEntites: Array<any>) => {
                    let indexInMainCollection: number = 0;
                    createdDbOEntites.forEach((createdEntity) => {
                        actionEntities[indexInMainCollection].newPersistentEntity = createdEntity;
                        indexInMainCollection++;
                    })

                    return this.postBulkCreate(actionEntities).then((result) => {
                       return result.map(x => x.newPersistentEntity)
                    }
                        );
                }, (error) => {
                    return Q.reject(error);
                })
            }, (error) => {
                return Q.reject(error);
            });

    }

    bulkPut(objArr: Array<any>, batchSize?: number, donotLoadChilds?: boolean) {
        if (!objArr || !objArr.length) return Q.when(objArr);
        let actionEntities: Array<EntityActionParam> = this.getEntityFromArgs.apply(this, arguments);
        if (!actionEntities) {
            actionEntities = [];
        }
        this.logEntityInfo("bulkPut", objArr);
        return this.preBulkUpdate(actionEntities)
            .then((params: Array<EntityActionParam>) => {
                let entitiesToUpdate: Array<any> = new Array<any>();
                params.forEach((input: EntityActionParam) => { input.newPersistentEntity.__dbEntity = input.oldPersistentEntity; entitiesToUpdate.push(input.newPersistentEntity); });
                arguments[0] = entitiesToUpdate;
                arguments[arguments.length - 1] = undefined;
                return super.bulkPut.apply(this, arguments).then((createdDbOEntites: Array<any>) => {
                    let indexInMainCollection: number = 0;
                    createdDbOEntites.forEach((createdEntity) => {
                        actionEntities[indexInMainCollection].newPersistentEntity = createdEntity;
                        indexInMainCollection++;
                    })

                    return this.postBulkUpdate(actionEntities).then((result) =>
                        result.map(x => x.newPersistentEntity)
                    );
                }, (error) => {
                    return Q.reject(error);
                })
            }, (error) => {
                return Q.reject(error);
            });
    }

    bulkDel(params: Array<any>) {
        let actionParams: Array<EntityActionParam> = this.getEntityFromArgs.apply(this, arguments);
        let entitiesToDelete = [];
        if (!actionParams) {
            actionParams = [];
        }
        this.logEntityInfo("bulkDel", params);
        actionParams.forEach((input: EntityActionParam) => { entitiesToDelete.push(input.newPersistentEntity); })
        return this.preBulkDelete(actionParams)
            .then((params: Array<EntityActionParam>) => {
                return super.bulkDel(entitiesToDelete).then((updatedDbObj: Array<any>) => {
                    return this.postBulkDelete(actionParams).then((result) =>
                        result.map(x => x.newPersistentEntity)
                    );
                }, (error) => {
                    return Q.reject(error);
                })
            }, (error) => {
                return Q.reject(error);
            });
    }

    // TODO: need to disccus whether we need to secure bulkPutMany action since it is not exposed  api, it is consumed by server only.
    public bulkPutMany(objIds: Array<any>, obj: any) {
        obj._id = objIds[0];
        this.logEntityInfo("bulkPutMany", objIds);
        return super.bulkPutMany(objIds, obj);
    }

    findOne(id: any, donotLoadChilds?: boolean): Q.Promise<any> {
        let params: EntityActionParam = this.getEntityFromArgs.apply(this, arguments);
        if (!params) {
            params = {};
        }
        return this.preRead(params).then(result => {
            return this.postRead(result).then((updatedParams: EntityActionParam) => {
                return Q.resolve(updatedParams.newPersistentEntity);
            }).catch(exc => {
                return Q.reject(exc);
            });
        }).catch(exc => {
            return Q.reject(exc);
        });
    }

    findMany(ids: Array<any>, toLoadEmbededChilds?: boolean): Q.Promise<any> {
        let actionEntities: Array<EntityActionParam> = this.getEntityFromArgs.apply(this, arguments);
        if (!actionEntities) {
            actionEntities = [];
        }
        return this.preBulkRead(actionEntities).then(results => {
            return this.postBulkRead(results).then(newResults => {
                return Q.when(newResults.map(entity => entity.newPersistentEntity));
            }).catch(exc => {
                console.log("ERROR: ",exc);
                return Q.reject(exc);
            });
        }).catch(exc => {
            console.log("ERROR: ",exc);
            return Q.reject(exc);
        });
    }





    findWhere(query, selectedFields?: Array<any> | any, queryOptions?: any, toLoadChilds?: boolean): Q.Promise<any> {
        let actionEntities: Array<EntityActionParam> = this.getEntityFromArgs.apply(this, arguments);
        if (!actionEntities) {
            actionEntities = [];
        }
        return this.preBulkRead(actionEntities).then(results => {
            return this.postBulkRead(results).then(newResults => {
                return Q.when(newResults.map(entity => entity.newPersistentEntity));
            }).catch(exc => {
                console.log("ERROR: ",exc);
                return Q.reject(exc);
            });
        }).catch(exc => {
            console.log("ERROR: ",exc);
            return Q.reject(exc);
        });
    }

    findByField(fieldName, value): Q.Promise<any> {
        return super.findByField(fieldName, value);
    }

    findChild(id, prop): Q.Promise<any> {
        return super.findChild(id, prop);
    }


    put(id: any, obj: any): Q.Promise<any> {
        let resultEntityActionObj: EntityActionParam = this.getEntityFromArgs.apply(this, arguments);
        if (!resultEntityActionObj) {
            resultEntityActionObj = {};
        }
        this.logEntityInfo("put", obj);
        return this.preUpdate(resultEntityActionObj)
            .then((params: EntityActionParam) => {
                params.newPersistentEntity.__dbEntity = params.oldPersistentEntity;
                return super.put(id, params.newPersistentEntity).then((updatedDbObj: any) => {
                    resultEntityActionObj.newPersistentEntity = updatedDbObj;
                    return this.postUpdate(resultEntityActionObj).then((updatedEntity: EntityActionParam) => {
                        return Q.when(updatedEntity.newPersistentEntity);
                    }, (exc) => {
                        return Q.reject(exc);
                    });
                }, (error) => {
                    return Q.reject(error);
                })
            }, (error) => {
                return Q.reject(error);
            });
        //return super.put(id, obj);
    }


    post(obj: any): Q.Promise<any> {
        this.logEntityInfo("post", obj);
        let resultEntityActionObj: EntityActionParam = this.getEntityFromArgs.apply(this, arguments);
        if (!resultEntityActionObj) {
            resultEntityActionObj = {};
        }
        return this.preCreate(resultEntityActionObj)
            .then((params: EntityActionParam) => {
                return super.post(params.inputEntity).then((updatedDbObj: any) => {
                    resultEntityActionObj.newPersistentEntity = updatedDbObj;
                    return this.postCreate(resultEntityActionObj).then((result) => result.newPersistentEntity );
                }, (error) => {
                    return Q.reject(error);
                })
            }, (error) => {
                return Q.reject(error);
            });
    }

    delete(obj: any) {
        let resultEntityActionObj: EntityActionParam = this.getEntityFromArgs.apply(this, arguments);
        if (!resultEntityActionObj) {
            resultEntityActionObj = {};
        }
        this.logEntityInfo("delete", resultEntityActionObj.newPersistentEntity._id);
        return this.preDelete(resultEntityActionObj)
            .then((params: EntityActionParam) => {
                return super.delete(resultEntityActionObj.newPersistentEntity._id).then((updatedDbObj: any) => {
                    resultEntityActionObj.newPersistentEntity = updatedDbObj;
                    return this.postDelete(resultEntityActionObj).then((result) => result.newPersistentEntity); 
                }, (error) => {
                    return Q.reject(error);
                })
            }, (error) => {
                return Q.reject(error);
            });
    }

    patch(id: any, obj) {
        this.logEntityInfo("patch", obj);
        let resultEntityActionObj: EntityActionParam = this.getEntityFromArgs.apply(this, arguments);
        if (!resultEntityActionObj) {
            resultEntityActionObj = {};
        }
        return this.preUpdate(resultEntityActionObj)
            .then((params: EntityActionParam) => {
                params.inputEntity.__dbEntity = params.oldPersistentEntity;
                return super.patch(id, params.inputEntity).then((updatedDbObj: any) => {
                    resultEntityActionObj.newPersistentEntity = updatedDbObj;
                    // return this.postUpdate(resultEntityActionObj.newPersistentEntity);
                    return this.postUpdate(resultEntityActionObj).then((updatedEntity: EntityActionParam) => {
                        return Q.when(updatedEntity.newPersistentEntity);
                    }, (exc) => {
                        return Q.reject(exc);
                    });
                }, (error) => {
                    return Q.reject(error);
                })
            }, (error) => {
                return Q.reject(error);
            });

    }

    // @authorize({ roles: ['ROLE_A'] }) // Authorization part
    findAll(): any {
        let actionEntities: Array<EntityActionParam> = this.getEntityFromArgs.apply(this, arguments);
        if (!actionEntities) {
            actionEntities = [];
        }
        return this.postBulkRead(actionEntities).then((newResults: Array<EntityActionParam>) => {
            return Q.when(newResults.map((x: EntityActionParam) => x.newPersistentEntity));
        }).catch(exc => {
            console.log("ERROR: ",exc);
            return Q.reject(exc);
        });
    }

    getEntityType(): any {
        return super.getEntityType();
    }

    private getEntityFromArgs() {
        let args: Array<any> = Array.prototype.slice.call(arguments);
        let params: EntityActionParam = <EntityActionParam>args[args.length - 1];
        return params;
    }

    private logEntityInfo(methodName: string, obj: any) {

        // let incomingJsonLog = {
        //     MenthodName: methodName,
        //     EntityObj: obj
        // };

        //this.logger.logInfo(incomingJsonLog);
    }

}
export default AuthorizationRepository;
