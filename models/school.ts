import Mongoose = require("mongoose");
import {Types} from 'mongoose';
import {field, document} from 'nodedata/mongoose/decorators'; 
import {Strict} from 'nodedata/mongoose/enums/';
import {baseModel} from './baseModel';
import {teacher} from './teacher';
import {onetomany, manytoone, manytomany, onetoone} from 'nodedata/core/decorators';

@document({ name: 'school', strict: Strict.throw })
export class school extends baseModel {
    @field()
    age: string;

    @onetomany({ rel: 'teacher', itemType: teacher, embedded: true, persist: true, eagerLoading: false})
    //@onetomany({ rel: 'teacher', itemType: teacher, embedded: true, persist: true, eagerLoading: false})
    teachers: Array<teacher>;
}

export default school;