import {repository} from "nodedata/core/decorators";
import {student} from '../models/student';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'student', model: student })
export default class StudentRepository extends DynamicRepository {

}