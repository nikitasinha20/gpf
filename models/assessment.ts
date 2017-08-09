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

@document({ name: 'assessment', strict: Strict.false })
export class assessment extends baseModel {

    @field()
    assessment_id: string;

    @field()
    Uid: string

    @field()
    title: string

    @field()
    custom_assessment_id: string

    @field()
    creator_id: string

    @field()
    created_by: string

    @field()
    create_date: string

    @field()
    board: string

    @field()
    num_questions: string

    @field()
    maximum_marks: string

    @field()
    valid_till: string

    @onetomany({ rel: 'topic', itemType: topic, embedded: true, persist: true, eagerLoading: false})
    topics: Array<topic>;

    @onetomany({ rel: 'question', itemType: question, embedded: true, persist: true, eagerLoading: false})
    questions: Array<question>;

    @onetomany({ rel: 'report', itemType: report, embedded: true, persist: true, eagerLoading: false})
    reports: Array<report>;

}

export default assessment;