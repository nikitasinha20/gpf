import {inject, injectbyname} from 'nodedata/di/decorators/inject';
import {service} from 'nodedata/di/decorators/service';
import * as assessmentRepository from '../repositories/assessmentRepository';
import {assessment} from '../models/assessment';
import Q = require('q');

@service({ singleton: true, serviceName: 'assessmentService' })
export class AssessmentService {
    // @inject(assessmentRepository)
    // private _assessmentRepository: assessmentRepository.AssessmentRepository;

    // public getCurrentAssessmentForCourse(assesment_id: number){
    //     var assessment =  this._assessmentRepository.findOne(assesment_id);
    //     let course = assessment.course;
    //     assessment["subject"] = course.course_subject;
    //     assessment["language"] = course.language;
    //     return assessment;
    // }

}