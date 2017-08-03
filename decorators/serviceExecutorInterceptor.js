"use strict";
const utils_1 = require("nodedata/core/metadata/utils");
const decorators_1 = require('./decorators');
const decorator_type_1 = require('nodedata/core/enums/decorator-type');
//var domain = require('../../security/auth/domain');
const serviceExecutor_1 = require('./serviceExecutor');
function executeService(params) {
    params = params || {};
    return function (target, propertyKey, descriptor) {
        utils_1.MetaUtils.addMetaData(target, {
            decorator: decorators_1.Decorators.AUTHORINGSTATUS,
            decoratorType: decorator_type_1.DecoratorType.METHOD,
            params: params,
            propertyKey: propertyKey
        });
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = Array.apply(this, arguments);
            return serviceExecutor_1.ServiceExecutor.execute(params.serviceName, params.methodName, args[0]).then(result => {
                return originalMethod.apply(this, arguments);
            });
        };
        return descriptor;
    };
}
exports.executeService = executeService;

//# sourceMappingURL=serviceExecutorInterceptor.js.map
