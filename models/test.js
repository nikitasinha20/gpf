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
const topic_1 = require('./topic');
const question_1 = require('./question');
const report_1 = require('./report');
let test1 = class test1 extends baseModel_1.baseModel {
};
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], test1.prototype, "test_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], test1.prototype, "Uid", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], test1.prototype, "title", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], test1.prototype, "custom_test_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], test1.prototype, "creator_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], test1.prototype, "created_by", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], test1.prototype, "create_date", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], test1.prototype, "board", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', Number)
], test1.prototype, "num_questions", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', Number)
], test1.prototype, "maximum_marks", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', Number)
], test1.prototype, "passing_marks", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], test1.prototype, "valid_till", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'topic', itemType: topic_1.topic, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], test1.prototype, "topics", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'question', itemType: question_1.question, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], test1.prototype, "questions", void 0);
__decorate([
    decorators_2.onetoone({ rel: 'report', itemType: report_1.report, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', report_1.report)
], test1.prototype, "report", void 0);
test1 = __decorate([
    decorators_1.document({ name: 'test', strict: _1.Strict.false }), 
    __metadata('design:paramtypes', [])
], test1);
exports.test1 = test1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = test1;

//# sourceMappingURL=test.js.map
