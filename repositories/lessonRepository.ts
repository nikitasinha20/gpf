import {repository} from "nodedata/core/decorators";
import {lesson} from '../models/lesson';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'lesson', model: lesson })
export default class LessonRepository extends DynamicRepository {

}
