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
const decorators_1 = require('nodedata/mongoose/decorators');
const _1 = require('nodedata/mongoose/enums/');
const baseModel_1 = require('./baseModel');
const teacher_1 = require('./teacher');
const myclass_1 = require('./myclass');
const term_1 = require('./term');
const decorators_2 = require('nodedata/core/decorators');
let school = class school extends baseModel_1.baseModel {
};
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], school.prototype, "school_name", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], school.prototype, "center", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], school.prototype, "school_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], school.prototype, "principal", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], school.prototype, "disctrict", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], school.prototype, "block", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], school.prototype, "cluster", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'teacher', itemType: teacher_1.teacher, embedded: false, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], school.prototype, "teachers", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'myclass', itemType: myclass_1.myclass, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], school.prototype, "classes", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'term', itemType: term_1.term, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], school.prototype, "terms", void 0);
school = __decorate([
    decorators_1.document({ name: 'school', strict: _1.Strict.false }), 
    __metadata('design:paramtypes', [])
], school);
exports.school = school;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = school;

//# sourceMappingURL=school.js.map
