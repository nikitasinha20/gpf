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
let assessment = class assessment extends baseModel_1.baseModel {
};
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "assessment_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "Uid", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "title", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "custom_assessment_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "creator_id", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "created_by", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "create_date", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "board", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "num_questions", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "maximum_marks", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], assessment.prototype, "valid_till", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'topic', itemType: topic_1.topic, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], assessment.prototype, "topics", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'question', itemType: question_1.question, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], assessment.prototype, "questions", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'report', itemType: report_1.report, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], assessment.prototype, "reports", void 0);
assessment = __decorate([
    decorators_1.document({ name: 'assessment', strict: _1.Strict.false }), 
    __metadata('design:paramtypes', [])
], assessment);
exports.assessment = assessment;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assessment;

//# sourceMappingURL=assessment.js.map
