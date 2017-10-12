import {repository} from "nodedata/core/decorators";
import {score} from '../models/score';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';
//import {AuthorizationRepository} from 'nodedata/tests/repositories/security/AuthorizationRepository';
import * as ScoreService from '../services/scoreService';
import { entityAction, EntityActionParam } from "nodedata/core/decorators/entityAction";
import Q = require('q');
import { inject } from 'nodedata/di/decorators/inject';
import Mongoose = require("mongoose");

@repository({ path: 'score', model: score })
export class scoreRepository extends DynamicRepository {

    // @inject(ScoreService)
    // private scoreService: ScoreService.ScoreService

    // postCreate(params: EntityActionParam): Q.Promise<any> {
    //     let input_score: score = <score>(params.newPersistentEntity);
    //     return this.scoreService.reporting(input_score);  
    // }

    // postUpdate(params: EntityActionParam): Q.Promise<any> {
    //     let input_score: score = <score>(params.newPersistentEntity);
    //     return this.scoreService.reporting(input_score);
    // }

    bulkPost(objArr: Array<any>){
        objArr.forEach((obj) => {
            this.findWhere({ "student": Mongoose.Types.ObjectId(obj.student) , "assessment": Mongoose.Types.ObjectId(obj.assessment)}).then(scores => {
                var score = scores[0]
                if ( score ) {
                    return this.put(score._id, obj)
                }
                else {
                    return this.post(obj)
                }
                
            })
        });
        return super.bulkPost([]);
    }  
}

export default scoreRepository;