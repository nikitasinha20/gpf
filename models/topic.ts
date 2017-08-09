// import Mongoose = require("mongoose");
// import {Types} from 'mongoose';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
// import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';

@document({ name: 'topic', strict: Strict.false })
export class topic extends baseModel {

@field()
title: string

@field()
difficulty_level: string

@field()
num_question: string

}

export default topic;