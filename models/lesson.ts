import Mongoose = require("nodedata/mongoose");
import {Types} from 'mongoose';
// import {subject} from './subject';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';

@document({ name: 'lesson', strict: Strict.false })
export class lesson extends baseModel {

    @field()
    lesson_id: string;

    @field()
    lesson_name: string

    @field()
    lesson_description: string

    @field()
    image_url: string

    @field()
    genie_content_id: string

    // @onetomany({ rel: 'tag', itemType: tag, embedded: true, persist: true, eagerLoading: false})
    // tags: Array<tag>;
    
}

export default lesson;