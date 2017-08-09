import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {baseModel} from './baseModel';

@document({ name: 'category', strict: Strict.false })
export class category extends baseModel {

    @field()
    category_title: string

    @field()
    category_value: string

}

export default category;