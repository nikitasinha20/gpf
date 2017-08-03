import Mongoose = require("mongoose");
import {Types} from 'mongoose';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';
import {course} from './course';

@document({ name: 'myclass', strict: Strict.false })
export class myclass extends baseModel {

@field()
class_id: string

@field()
standard: string

@field()
section: string

@onetomany({ rel: 'course', itemType: course, embedded: true, persist: true, eagerLoading: false})
courses: Array<course>;

}

export default myclass;