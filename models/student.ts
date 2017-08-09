import Mongoose = require("mongoose");
import {Types} from 'mongoose';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {baseModel} from './baseModel';

@document({ name: 'student', strict: Strict.false })
export class student extends baseModel {

@field()
roll_no: string

@field()
name: string

@field()
father_name: string

@field()
sex: string

@field()
dob: string

@field()
unique_id: string

@field()
join_date: string

@field()
distinction: string

}

export default student;