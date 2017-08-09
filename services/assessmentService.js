"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const service_1 = require('nodedata/di/decorators/service');
let AssessmentService = class AssessmentService {
};
AssessmentService = __decorate([
    service_1.service({ singleton: true, serviceName: 'assessmentService' }), 
    __metadata('design:paramtypes', [])
], AssessmentService);
exports.AssessmentService = AssessmentService;

//# sourceMappingURL=assessmentService.js.map
