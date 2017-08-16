import Mongoose = require("mongoose");
import {Types} from 'mongoose';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';
import {course} from './course';
import {student} from './student';
// import {teacher} from './teacher';


@document({ name: 'myclass', strict: Strict.false })
export class myclass extends baseModel {

@field()
class_id: string

@field()
standard: string

@field()
section: string

@field()
class_teacher_id: string

@field()
class_unique_identifier: string

@field()
subjects: string

@onetomany({ rel: 'course', itemType: course, embedded: true, persist: true, eagerLoading: false})
courses: Array<course>;

@onetomany({ rel: 'student', itemType: student, embedded: true, persist: true, eagerLoading: false})
students: Array<student>;

// @manytoone({ rel: 'teacher', itemType: teacher, embedded: false, persist: true, eagerLoading: false})
// teacher: string

}

export default myclass;