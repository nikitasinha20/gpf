import {service} from 'nodedata/di/decorators';
import {inject} from 'nodedata/di/decorators/inject';
import {report} from '../models/report';
import { test1 } from '../models/test';
import mongoose = require("mongoose");
// import * as reportRepository from '../repositories/reportRepository';
// import * as testRepository from '../repositories/testRepository';
import * as scoreRepository from '../repositories/scoreRepository';


@service({ singleton: true, serviceName: 'scoreService' })
export class ScoreService {

    // @inject(reportRepository)
    // private reportRepository: reportRepository.ReportRepository;

    // @inject(testRepository)
    // private testRepository: testRepository.testRepository;

    @inject(scoreRepository)
    static scoreRepository: scoreRepository.scoreRepository;

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

    public static findAll(params: any) {
        if (params["assessment"]) {
            params["assessment"] = mongoose.Types.ObjectId(params["assessment"].toString());
            var options = {};
            console.log("Querying Database");
            return ScoreService.scoreRepository.findWhere(params, null, options)
        }
    } 
}

export default ScoreService;