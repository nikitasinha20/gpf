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
const decorators_1 = require('nodedata/di/decorators');
const inject_1 = require('nodedata/di/decorators/inject');
const mongoose = require("mongoose");
// import * as reportRepository from '../repositories/reportRepository';
// import * as testRepository from '../repositories/testRepository';
const scoreRepository = require('../repositories/scoreRepository');
let ScoreService_1;
let ScoreService = ScoreService_1 = class ScoreService {
    // reporting(input_score){
    //     if(input_score.assessment){
    //         return this.testRepository.findWhere({_id: input_score.assessment}).then((tests: test1) => {
    //             let test = tests[0];
    //             let old_report = test.report;
    //             if(old_report){
    //                 let max_marks = old_report.max_marks > input_score.marks ? old_report.max_marks : input_score.marks;
    //                 let total_students = old_report.total_students + 1 ;
    //                 let total_average_score = (old_report.total_average_score + input_score.marks) / total_students;
    //                 let total_students_passed = old_report.total_students_passed || 0;
    //                 let average_pass_percentage = old_report.average_pass_percentage || 0;
    //                 let average_scored_percentage = (total_average_score/test.maximum_marks) * 100;
    //                 if(input_score.marks > test.passing_marks){
    //                     total_students_passed = total_students_passed + 1;
    //                     average_pass_percentage = (total_students_passed/total_students) * 100;
    //                 }
    //             let report_obj: report = new report();
    //             report_obj.max_marks = max_marks;
    //             report_obj.total_students = total_students;
    //             report_obj.total_average_score = total_average_score;
    //             report_obj.total_students_passed = total_students_passed;
    //             report_obj.average_pass_percentage = average_pass_percentage;
    //             report_obj.average_scored_percentage = average_scored_percentage;
    //             return this.reportRepository.patch(old_report._id,report_obj);
    //             }
    //             else{
    //                 let report_obj: report = new report();
    //                 report_obj.max_marks = input_score.marks;
    //                 report_obj.total_students = 1;
    //                 report_obj.total_average_score = input_score.marks;
    //                 return this.reportRepository.post(report_obj).then((new_report: report) => {
    //                     return this.testRepository.patch(test._id,{'report': new_report});
    //                 });
    //             }
    //         }).catch(error => {
    //             throw error;
    //         });
    //     }
    // }
    static findAll(params) {
        if (params["assessment"]) {
            params["assessment"] = mongoose.Types.ObjectId(params["assessment"].toString());
            var options = {};
            console.log("Querying Database");
            return ScoreService_1.scoreRepository.findWhere(params, null, options);
        }
    }
};
__decorate([
    inject_1.inject(scoreRepository), 
    __metadata('design:type', scoreRepository.scoreRepository)
], ScoreService, "scoreRepository", void 0);
ScoreService = ScoreService_1 = __decorate([
    decorators_1.service({ singleton: true, serviceName: 'scoreService' }), 
    __metadata('design:paramtypes', [])
], ScoreService);
exports.ScoreService = ScoreService;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScoreService;

//# sourceMappingURL=scoreService.js.map
