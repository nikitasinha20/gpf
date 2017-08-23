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
const tag_1 = require('./tag');
const mycollection_1 = require('./mycollection');
const test_1 = require('./test');
// import {myclass} from './myclass';
let course = class course extends baseModel_1.baseModel {
};
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], course.prototype, "course_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], course.prototype, "course_title", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], course.prototype, "course_subject", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], course.prototype, "course_description", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], course.prototype, "provider", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], course.prototype, "remarks", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], course.prototype, "image_url", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], course.prototype, "language", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'tag', itemType: tag_1.tag, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], course.prototype, "tags", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'mycollection', itemType: mycollection_1.mycollection, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], course.prototype, "collections", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'test', itemType: test_1.test1, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], course.prototype, "assesments", void 0);
course = __decorate([
    decorators_1.document({ name: 'course', strict: _1.Strict.false }), 
    __metadata('design:paramtypes', [])
], course);
exports.course = course;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = course;

//# sourceMappingURL=course.js.map
