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
const _1 = require('nodedata/mongoose/enums/');
const decorators_1 = require('nodedata/mongoose/decorators');
const baseModel_1 = require('./baseModel');
const question_1 = require('./question');
const student_1 = require('./student');
const decorators_2 = require('nodedata/core/decorators');
let score = class score extends baseModel_1.baseModel {
};
__decorate([
    decorators_1.field(), 
    __metadata('design:type', Number)
], score.prototype, "marks", void 0);
__decorate([
    decorators_2.onetoone({ rel: 'student', itemType: student_1.student, embedded: false, persist: true, eagerLoading: false }), 
    __metadata('design:type', student_1.student)
], score.prototype, "student", void 0);
__decorate([
    decorators_2.onetoone({ rel: 'question', itemType: question_1.question, embedded: false, persist: true, eagerLoading: false }), 
    __metadata('design:type', question_1.question)
], score.prototype, "question", void 0);
score = __decorate([
    decorators_1.document({ name: 'score', strict: _1.Strict.false }), 
    __metadata('design:paramtypes', [])
], score);
exports.score = score;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = score;

//# sourceMappingURL=score.js.map
