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
// import Mongoose = require("mongoose");
// import {Types} from 'mongoose';
const decorators_1 = require('nodedata/mongoose/decorators');
const _1 = require('nodedata/mongoose/enums/');
// import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
const baseModel_1 = require('./baseModel');
let question = class question extends baseModel_1.baseModel {
};
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], question.prototype, "text", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], question.prototype, "answer", void 0);
__decorate([
    decorators_1.field(), 
    __metadata('design:type', String)
], question.prototype, "marks", void 0);
question = __decorate([
    decorators_1.document({ name: 'question', strict: _1.Strict.false }), 
    __metadata('design:paramtypes', [])
], question);
exports.question = question;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = question;

//# sourceMappingURL=question.js.map
