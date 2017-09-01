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

}

export default scoreRepository;