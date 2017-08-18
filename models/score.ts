import Mongoose = require("mongoose");
import {Strict} from 'nodedata/mongoose/enums/';
import {Types} from 'mongoose';
import {field, document} from 'nodedata/mongoose/decorators'; 
import {baseModel} from './baseModel';
import {question} from './question';
import {student} from './student';
import {onetomany, manytoone, manytomany, onetoone} from 'nodedata/core/decorators';

@document({ name: 'score', strict: Strict.false })
export class score extends baseModel {

    @field()
    marks: number;

    @onetoone({ rel: 'student', itemType: student, embedded: false, persist: true, eagerLoading: false})
    student: student;

    @onetoone({ rel: 'question', itemType: question, embedded: false, persist: true, eagerLoading: false})
    question: question;
}

export default score;