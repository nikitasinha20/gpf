import Mongoose = require("nodedata/mongoose");
import {Types} from 'mongoose';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';
import {tag} from './tag';
import {topic} from './topic';
import {question} from './question';
import {report} from './report';
import {course} from './course';

@document({ name: 'test', strict: Strict.false })
export class test1 extends baseModel {

    @field()
    test_id: string;

    @field()
    Uid: string

    @field()
    title: string

    @field()
    custom_test_id: string

    @field()
    creator_id: string

    @field()
    created_by: string

    @field()
    create_date: string

    @field()
    board: string

    @field()
    num_questions: number

    @field()
    maximum_marks: number

    @field()
    passing_marks: number

    @field()
    valid_till: string

    @onetomany({ rel: 'topic', itemType: topic, embedded: true, persist: true, eagerLoading: false})
    topics: Array<topic>;

    @onetomany({ rel: 'question', itemType: question, embedded: true, persist: true, eagerLoading: false})
    questions: Array<question>;

    @onetoone({ rel: 'report', itemType: report, embedded: true, persist: true, eagerLoading: false})
    report: report;

}

export default test1;