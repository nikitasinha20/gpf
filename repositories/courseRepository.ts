import {repository} from "nodedata/core/decorators";
import {course} from '../models/course';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'course', model: course })
export default class CourseRepository extends DynamicRepository {

}
