import Mongoose = require("mongoose");
import {Types} from 'mongoose';
import {field, document} from 'nodedata/mongoose/decorators'; 
import {Strict} from 'nodedata/mongoose/enums/';
import {baseModel} from './baseModel';
import {teacher} from './teacher';
import {myclass} from './myclass';
import {onetomany, manytoone, manytomany, onetoone} from 'nodedata/core/decorators';

@document({ name: 'school', strict: Strict.throw })
export class school extends baseModel {

    @field()
    school_name: string;

    @field()
    center: string;

    @field()
    school_id: string;

    @field()
    principal: string;

    @field()
    disctrict: string;

    @field()
    block: string;

    @field()
    cluster: string;

    @onetomany({ rel: 'teacher', itemType: teacher, embedded: true, persist: true, eagerLoading: false})
    teachers: Array<teacher>;

    @onetomany({ rel: 'myclass', itemType: myclass, embedded: true, persist: true, eagerLoading: false})
    classes: Array<myclass>;
}

export default school;