"use strict";
const utils_1 = require("nodedata/core/metadata/utils");
const decorator_type_1 = require('nodedata/core/enums/decorator-type');
const decorators_1 = require('./decorators');
function children(params) {
    return function (target, propertyKey) {
        //console.log('field - propertyKey: ', propertyKey, ', target:', target);
        utils_1.MetaUtils.addMetaData(target, {
            decorator: decorators_1.Decorators.CHILDREN,
            decoratorType: decorator_type_1.DecoratorType.PROPERTY,
            params: params,
            propertyKey: propertyKey
        });
    };
}
exports.children = children;

//# sourceMappingURL=children.js.map
