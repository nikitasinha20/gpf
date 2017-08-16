import Mongoose = require("nodedata/mongoose");
import {Types} from 'mongoose';
// import {subject} from './subject';
import {field, document, transient} from 'nodedata/mongoose/decorators';
import {Strict} from 'nodedata/mongoose/enums/';
import {onetomany, manytoone, manytomany, onetoone, promisable} from 'nodedata/core/decorators';
import {baseModel} from './baseModel';
import {myclass} from './myclass';
import {school} from './school';

@document({ name: 'teacher', strict: Strict.false })
export class teacher extends baseModel {

    @field()
    name: string;

    @field()
    qualification: string;

    @field()
    dob: string

    @field()
    username: string

    @field()
    hiredate: string

    @onetomany({ rel: 'myclass', itemType: myclass, embedded: true, persist: true, eagerLoading: false})
    myclasses: Array<myclass>;
    
    @manytoone({rel: 'school', itemType: school, embedded: false, persist: true, eagerLoading: false})
    school: school;
    
}

export default teacher;