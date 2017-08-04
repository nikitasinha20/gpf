"use strict";
class Config {
}
// public static DbConnection: string = "mongodb://abcd1234:abcd1234@ds028310.mlab.com:28310/gpf";
Config.DbConnection = "mongodb://localhost:27017/gpf";
Config.basePath = "data";
Config.apiversion = "v1";
Config.ElasticSearchConnection = "http://localhost:9200";
Config.ApplyElasticSearch = false;
Config.ignorePaths = [];
Config.isMultiThreaded = true; // This param is for configuring multi process using worker/ process control attribute..
Config.worker = 'worker.js';
Config.process = 1;
exports.Config = Config;
class SqlConfig {
}
SqlConfig.isSqlEnabled = false;
SqlConfig.database = "test";
SqlConfig.username = "sa";
SqlConfig.password = "Apr@2016";
SqlConfig.sequlizeSetting = {
    host: '172.19.101.120',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};
exports.SqlConfig = SqlConfig;
class Security {
}
Security.isAutheticationEnabled = "disabled"; //allowed values: "disabled","enabledWithoutAuthorization","enabledWithAuthorization"
Security.authenticationType = "TokenBased"; //allowed values: "passwordBased","TokenBased"
Security.useFaceBookAuth = false;
exports.Security = Security;
//# sourceMappingURL=config.js.map