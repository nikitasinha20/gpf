import {service} from 'nodedata/di/decorators';
import {inject} from 'nodedata/di/decorators/inject';
import {report} from '../models/report';
import { test1 } from '../models/test';
import mongoose = require("mongoose");
import {Student} from '../models/student';


import * as studentRepository from '../repositories/studentRepository';


@service({ singleton: true, serviceName: 'studentService' })
export class StudentService {

 
}

export default StudentService;