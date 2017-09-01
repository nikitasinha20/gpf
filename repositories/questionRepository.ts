import {repository} from "nodedata/core/decorators";
import {question} from '../models/question';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'question', model: question })
export default class QuestionRepository extends DynamicRepository {

}
