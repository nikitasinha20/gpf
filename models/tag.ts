import Mongoose = require("nodedata/mongoose");
import {Types} from 'mongoose';
// import {subject} from './subject';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';

@document({ name: 'tag', strict: Strict.false })
export class tag extends baseModel {

    @field()
    name: string;

    @field()
    tag_creator: string

    @field()
    start_date: string

    @field()
    end_date: string
    
}

export default tag;