import {repository} from "nodedata/core/decorators";
import {test1} from '../models/test';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';
// import * as testService from '../services/testService';
import { inject } from 'nodedata/di/decorators/inject';


@repository({ path: 'assessment', model: test1 })
export class testRepository extends DynamicRepository {

    // @inject(testService)
    // private testService: testService.testService;

    // getCurrenttestForCourse(test_id : number){
    //     return this.testService.getCurrenttestForCourse(test_id);
    // }

}

export default testRepository;

