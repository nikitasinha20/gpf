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
const decorators_2 = require('nodedata/core/decorators');
const baseModel_1 = require('./baseModel');
const course_1 = require('./course');
const student_1 = require('./student');
// import {teacher} from './teacher';
let myclass = class myclass extends baseModel_1.baseModel {
};
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], myclass.prototype, "class_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], myclass.prototype, "standard", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], myclass.prototype, "section", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], myclass.prototype, "class_teacher_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], myclass.prototype, "class_unique_identifier", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], myclass.prototype, "subjects", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'course', itemType: course_1.course, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], myclass.prototype, "courses", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'student', itemType: student_1.Student, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], myclass.prototype, "students", void 0);
myclass = __decorate([
    decorators_1.document({ name: 'myclass', strict: _1.Strict.false }), 
    __metadata('design:paramtypes', [])
], myclass);
exports.myclass = myclass;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = myclass;

//# sourceMappingURL=myclass.js.map
