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
// import {subject} from './subject';
const decorators_1 = require('nodedata/mongoose/decorators');
const _1 = require('nodedata/mongoose/enums/');
const baseModel_1 = require('./baseModel');
let lesson = class lesson extends baseModel_1.baseModel {
};
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], lesson.prototype, "lesson_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], lesson.prototype, "lesson_name", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], lesson.prototype, "lesson_description", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], lesson.prototype, "image_url", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], lesson.prototype, "genie_content_id", void 0);
lesson = __decorate([
    decorators_1.document({ name: 'lesson', strict: _1.Strict.false }), 
    __metadata('design:paramtypes', [])
], lesson);
exports.lesson = lesson;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = lesson;

//# sourceMappingURL=lesson.js.map
