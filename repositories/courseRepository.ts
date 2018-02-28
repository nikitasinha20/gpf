import {repository} from "nodedata/core/decorators";
import {course} from '../models/course';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'course', model: course })
export class CourseRepository extends DynamicRepository {

}
export default CourseRepository
