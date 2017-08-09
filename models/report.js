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
const category_1 = require('./category');
let report = class report extends baseModel_1.baseModel {
};
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], report.prototype, "text", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], report.prototype, "answer", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], report.prototype, "marks", void 0);
__decorate([
    decorators_2.onetomany({ rel: 'category', itemType: category_1.category, embedded: true, persist: true, eagerLoading: false }), 
    __metadata('design:type', Array)
], report.prototype, "categories", void 0);
report = __decorate([
    decorators_1.document({ name: 'report', strict: _1.Strict.false }), 
    __metadata('design:paramtypes', [])
], report);
exports.report = report;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = report;

//# sourceMappingURL=report.js.map
