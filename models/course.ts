import Mongoose = require("mongoose");
import {Types} from 'mongoose';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';
import {tag} from './tag';
import {mycollection} from './mycollection';
import {assessment} from './assessment';
// import {myclass} from './myclass';

@document({ name: 'course', strict: Strict.false })
export class course extends baseModel {

@field()
course_id: string

@field()
course_title: string

@field()
course_subject: string

@field()
course_description: string

@field()
provider: string

@field()
remarks: string

@field()
image_url: string

@field()
language: string

@onetomany({ rel: 'tag', itemType: tag, embedded: true, persist: true, eagerLoading: false})
tags: Array<tag>;

@onetomany({ rel: 'mycollection', itemType: mycollection, embedded: true, persist: true, eagerLoading: false})
collections: Array<mycollection>;

@onetomany({ rel: 'assessment', itemType: assessment, embedded: true, persist: true, eagerLoading: false})
assessments: Array<assessment>;

// @manytoone({ rel: 'myclass', itemType: myclass, embedded: false, persist: true, eagerLoading: false})
// myclass: string
}

export default course;