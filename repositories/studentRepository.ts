import {repository} from "nodedata/core/decorators";
import {Student} from '../models/student';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'student', model: Student })
export class StudentRepository extends DynamicRepository {
    getAllStudentList(){
        return this.findAll().then(studentList =>{
            return studentList;
        });
    }

}
export default StudentRepository;