import {repository} from "nodedata/core/decorators";
import {assessment} from '../models/assessment';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';
import * as assessmentService from '../services/assessmentService';
import { inject } from 'nodedata/di/decorators/inject';


@repository({ path: 'assessment', model: assessment })
export class AssessmentRepository extends DynamicRepository {

    // @inject(assessmentService)
    // private assessmentService: assessmentService.AssessmentService;

    // getCurrentAssessmentForCourse(assesment_id : number){
    //     return this.assessmentService.getCurrentAssessmentForCourse(assesment_id);
    // }

}

export default AssessmentRepository;

