import Mongoose = require("mongoose");
import {Strict} from 'nodedata/mongoose/enums/';
import {Types} from 'mongoose';
import {field, document} from 'nodedata/mongoose/decorators'; 
import {baseModel} from './baseModel';
import {question} from './question';
import {Student} from './student';
import * as test1 from './test';
import {onetomany, manytoone, manytomany, onetoone} from 'nodedata/core/decorators';

@document({ name: 'score', strict: Strict.false })
export class score extends baseModel {

    @field()
    marks: number;

    @manytoone({ rel: 'student', itemType: Student, embedded: false, persist: true, eagerLoading: false})
    student: Student;

    @manytoone({ rel: 'question', itemType: question, embedded: false, persist: true, eagerLoading: false})
    question: question;

    @manytoone({ rel: 'test', itemType: test1, embedded: false, persist: true, eagerLoading: false})
    assessment: Object;
}

export default score;