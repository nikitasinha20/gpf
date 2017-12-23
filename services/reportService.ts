import {service} from 'nodedata/di/decorators';
import {inject} from 'nodedata/di/decorators/inject';
import {report} from '../models/report';
import { test1 } from '../models/test';
import mongoose = require("mongoose");
import * as studentRepository from '../repositories/studentRepository';
import * as Enumerable from 'linq';
import * as schoolRepository from '../repositories/schoolRepository';
import * as MyclassRepository from '../repositories/myclassRepository';
import * as TeacherRepository from '../repositories/teacherRepository';
import * as ScoreRepository from '../repositories/scoreRepository';
import * as QuestionRepository from '../repositories/questionRepository';
import {myclass} from '../models/myclass';
import {school} from '../models/school';
import {teacher} from '../models/teacher';
// const excel = require('node-excel-export');
var json2xls = require('json2xls');
const fs = require('fs');
import Q = require('q');
import student from '../models/student';
import { score } from '../models/score';
import { question } from '../models/question';

@service({ singleton: true, serviceName: 'studentService' })
export class ReportService {

    @inject(studentRepository)
    private studentRepo: studentRepository.StudentRepository;

    @inject(schoolRepository)
    private schoolRepo: schoolRepository.SchoolRepository;

    @inject(ScoreRepository)
    private scoreRepo: ScoreRepository.scoreRepository;

    @inject(QuestionRepository)
    private questionRepo: QuestionRepository.QuestionRepository;

    @inject(MyclassRepository)
    private MyclassRepo: MyclassRepository.MyclassRepository;

    @inject(TeacherRepository)
    private teacherRepo: TeacherRepository.TeacherRepository;

    public createReport(param_standard:string, param_subject:string) { 
      var subjectParam = param_subject;
      var standardParam = param_standard;
      var reportDataList = [];
      var asyncCalls = [];
      return this.MyclassRepo.findWhere({"standard": standardParam}).then((classes: Array<myclass>) =>{
        var studentsList;
        Enumerable.from(classes).forEach(req_class=>{
          if(req_class.students && req_class.students.length > 0){
            // studentsList = studentsList.push(...req_class.students);
            Enumerable.from(req_class.students).forEach(student => {
              let reportData = {};
              reportData['childName'] = student['name'];
              reportData['gender'] =student['sex'];
              asyncCalls.push(this.schoolRepo.findWhere({'classes._id': req_class._id}).then((studentSchools:Array<school>)=>{
                var studentSchool = studentSchools[0];
                if(studentSchool){
                  reportData['district'] = studentSchool.disctrict;
                  reportData['block'] = studentSchool.block;
                  reportData['cluster'] = studentSchool.cluster;
                  reportData['schoolName'] = studentSchool.school_name;
                  return this.teacherRepo.findWhere({'school_id': studentSchool._id.toString()}).then((schoolTeachers: Array<teacher>)=>{
                    Enumerable.from(schoolTeachers).forEach(schoolTeacher =>{
                        Enumerable.from(schoolTeacher.myclasses).forEach(teacherClass =>{
                            Enumerable.from(teacherClass.courses).forEach(teacherCourse =>{
                                if(teacherCourse.course_subject === subjectParam){
                                    if(teacherClass.standard==req_class.standard){
                                        reportData['teacherName'] = schoolTeacher.name;
                                    }
                                    return this.scoreRepo.findWhere({'student': student._id}).then((scores: Array<score>)=>{
                                      Enumerable.from(scores).forEach(score =>{
                                        return this.questionRepo.findWhere({_id: score.question}).then((questions: Array<question>) =>{
                                          var question = questions[0];
                                          reportData[question.text] =  score.marks;
                                          
                                        });
                                      });
                                      let exists = false;
                                      Enumerable.from(reportDataList).forEach(data=>{
                                        if(reportData['childName'] == data['childName']){
                                          exists = true;
                                        }
                                      })
                                      if(!exists && Object.keys(reportData).length > 8){
                                        reportData['class']= standardParam;
                                        reportDataList.push(reportData);
                                      }
                                    });
                                }
                            });
                        });
                    });
                  });
                }
              })
            )
           });
          }
        });
        return Q.allSettled(asyncCalls).then(res => {
          var finalReport = this.exportData( reportDataList)
          return reportDataList;
        }).catch(err => {
            throw err;
        });
      });
    }

    exportData(params: any){
      var json = params
    
      var xls = json2xls(json);
      
      return fs.writeFileSync('data.xlsx', xls, 'binary');
    }
 
}

export default ReportService;


