"use strict";
const utils_1 = require("nodedata/core/metadata/utils");
const Utils = require("nodedata/core/utils");
const decorators_1 = require('nodedata/core/constants/decorators');
const winstonLog_1 = require('nodedata/logging/winstonLog');
const Enumerable = require('linq');
var Q = require('q');
class ServiceExecutor {
    static execute(serviceName, methodName, params) {
        var services = utils_1.MetaUtils.getMetaDataForDecorators([decorators_1.Decorators.SERVICE]);
        var service = Enumerable.from(services).where(x => x.metadata[0].params.serviceName == serviceName).select(x => x.metadata[0]).firstOrDefault();
        if (service) {
            var param = [];
            param.push(params);
            var ret = service.target[methodName].apply(service.target, param);
            if (Utils.isPromise(ret)) {
                return ret.then(result => {
                    return result;
                }).catch((err) => {
                    winstonLog_1.winstonLog.logError('[ServiceExecutor : execute]: error ' + err);
                    throw err;
                });
            }
            else {
                return Q.when(ret);
            }
        }
        return Q.when(true);
    }
}
exports.ServiceExecutor = ServiceExecutor;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceExecutor;

//# sourceMappingURL=serviceExecutor.js.map
