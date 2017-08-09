import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
// import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';

@document({ name: 'term', strict: Strict.false })
export class term extends baseModel {

@field()
name: string

@field()
start_date: string

@field()
end_date: string

}
export default term;