import {repository} from "nodedata/core/decorators";
import {score} from '../models/score';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'score', model: score })
export default class scoreRepository extends DynamicRepository {
    
    dobulkpost(objArr: Array<any>){
        return super.bulkPost(objArr);
    }

}