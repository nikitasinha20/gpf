import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';
import {test1} from './test';
import {category} from './category';

@document({ name: 'report', strict: Strict.false })
export class report extends baseModel {

    @field()
    standard: string

    @field()
    subject: string

    @field()
    max_marks: number

    @field()
    total_average_score: number

    @field()
    total_students_passed: number

    @field()
    average_pass_percentage: number

    @field()
    average_scored_percentage: number

    @field()
    total_students: number

    @onetomany({ rel: 'category', itemType: category, embedded: true, persist: true, eagerLoading: false})
    categories: Array<category>;

}

export default report;