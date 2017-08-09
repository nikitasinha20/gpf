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
// import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
const baseModel_1 = require('./baseModel');
let term = class term extends baseModel_1.baseModel {
};
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], term.prototype, "name", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], term.prototype, "start_date", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], term.prototype, "end_date", void 0);
term = __decorate([
    decorators_1.document({ name: 'term', strict: _1.Strict.false }), 
    __metadata('design:paramtypes', [])
], term);
exports.term = term;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = term;

//# sourceMappingURL=term.js.map
