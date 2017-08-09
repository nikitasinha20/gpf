import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';
import {assessment} from './assessment';
import {category} from './category';

@document({ name: 'report', strict: Strict.false })
export class report extends baseModel {

    @field()
    text: string

    @field()
    answer: string

    @field()
    marks: string

    @onetomany({ rel: 'category', itemType: category, embedded: true, persist: true, eagerLoading: false})
    categories: Array<category>;

}

export default report;