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
const decorators_1 = require("nodedata/core/decorators");
const score_1 = require('../models/score');
const AuthorizationRepository_1 = require('nodedata/tests/repositories/security/AuthorizationRepository');
const ScoreService = require('../services/scoreService');
const inject_1 = require('nodedata/di/decorators/inject');
let scoreRepository = class scoreRepository extends AuthorizationRepository_1.AuthorizationRepository {
    postCreate(params) {
        let input_score = (params.newPersistentEntity);
        return this.scoreService.reporting(input_score);
    }
};
__decorate([
    inject_1.inject(ScoreService), 
    __metadata('design:type', ScoreService.ScoreService)
], scoreRepository.prototype, "scoreService", void 0);
scoreRepository = __decorate([
    decorators_1.repository({ path: 'score', model: score_1.score }), 
    __metadata('design:paramtypes', [])
], scoreRepository);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = scoreRepository;

//# sourceMappingURL=scoreRepository.js.map
