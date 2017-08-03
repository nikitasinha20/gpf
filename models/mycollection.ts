import Mongoose = require("nodedata/mongoose");
import {Types} from 'mongoose';
// import {subject} from './subject';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';
import {lesson} from './lesson';


@document({ name: 'mycollection', strict: Strict.false })
export class mycollection extends baseModel {

    @field()
    collection_id: string;

    @field()
    title: string

    @field()
    lesson_count: string

    @field()
    rating: string

    @field()
    rating_count: string

    @field()
    image_url: string

    @onetomany({ rel: 'lesson', itemType: lesson, embedded: true, persist: true, eagerLoading: false})
    lessons: Array<lesson>;
    
}

export default mycollection;