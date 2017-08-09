// import Mongoose = require("mongoose");
// import {Types} from 'mongoose';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
// import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';

@document({ name: 'question', strict: Strict.false })
export class question extends baseModel {

@field()
text: string

@field()
answer: string

@field()
marks: string

}

export default question;