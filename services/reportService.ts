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
import * as CourseRepository from '../repositories/courseRepository';

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

    @inject(CourseRepository)
    private courseRepo: CourseRepository.CourseRepository;

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
              var reportData = {};
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
                                      var exists = false;
                                      Enumerable.from(reportDataList).forEach(data=>{
                                        if(reportData['childName'] == data['childName']){
                                          exists = true;
                                        }
                                      });
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
          var file_name = param_standard + "_" + param_subject + ".xlsx"
          var finalReport = this.exportData( reportDataList, file_name)
          return reportDataList;
        }).catch(err => {
            throw err;
        });
      });
    }

    exportData(params: any, file_name: string){
      var json = params
      var xls = json2xls(json, {style:"styles.xml"});
      
      return fs.writeFileSync(file_name, xls, 'binary');
    }

    //params: teacher (_id) , subject, class
    public createTeacherReport(param_teacher, param_standard, param_subject, saral): Q.Promise<any>{
      var responseData=[]
      var file_name = param_teacher + "_" + param_standard + "_" + param_subject + ".xlsx"
      var teacher_id = mongoose.Types.ObjectId(param_teacher)
      return this.teacherRepo.findWhere({"_id": teacher_id}).then((teachers :Array<teacher>) =>{
        if(teachers){
          var teacher = teachers[0]
          console.log("Teacher: ", teacher)
          return this.schoolRepo.findWhere({"_id": teacher["school_id"]}).then((schools : Array<school>) =>{
            if(schools){
              var asyncCalls=[]
              var school = schools[0]
              console.log("school: ", school)
              Enumerable.from(school.classes).forEach(schoolClass =>{
                if(schoolClass["standard"] == param_standard ){
                  var students = schoolClass["students"]
                  Enumerable.from(students).forEach(student =>{
                    var responseObj = {}
                    console.log("student: ", student)
                    responseObj["Standard"] = param_standard;
                    responseObj["School"] = school["school_name"];
                    responseObj["Subject"] = param_subject;
                    responseObj["Student"] = student["name"];
                    Enumerable.from(teacher["myclasses"]).forEach((teacherClass : myclass) => {
                      if(teacherClass.standard == param_standard){
                        var courses = teacherClass.courses;
                        console.log("courses: ", courses)
                        Enumerable.from(courses).forEach(teacherCourse =>{
                          if(teacherCourse.course_subject == param_subject){
                            var course = teacherCourse;
                            var assessment = course["assesments"][0]
                            console.log("assessment: ", assessment)
                            responseObj["Assessment"] = assessment.title;
                            responseObj["MaximumMarks"] = assessment.maximum_marks;
                            var total_marks = 0
                            asyncCalls.push(this.scoreRepo.findWhere({"student": student["_id"], "assessment": assessment._id}).then((scores: Array<score>) => {
                              if(scores){
                                responseObj["Scored"] = true;
                                Enumerable.from(scores).forEach(score =>{
                                  console.log("score: ", score)
                                  Enumerable.from(assessment.questions).forEach(question =>{
                                    if(question["_id"].toString() == score.question.toString()){
                                      console.log("question: ", question)
                                      if(saral){
                                        var q_no = question["question_no"]
                                        if(responseObj.hasOwnProperty(q_no)){
                                          responseObj[q_no] += score.marks; 
                                        }
                                        else{
                                          responseObj[q_no] = score.marks;
                                        }
                                      }
                                      else{
                                        var text = question["text"]
                                        responseObj[text] = score["marks"];
                                        total_marks += score.marks;
                                      }
                                      
                                    }
                                  });
                                });
                              }
                              responseObj["TotalMarks"] = total_marks;
                              responseObj["TotalPercentage"] = ( total_marks / assessment.maximum_marks ) * 100
                              responseData.push(responseObj)
                            }));
                          }
                        });
                      }
                    });
                  });
                }
              });
              return Q.allSettled(asyncCalls).then(res => {
                var finalReport = this.exportData(responseData, file_name)
                return Q.resolve(responseData);
              }).catch(err => {
                  throw err;
              });
            }
            // else{
            //   return Q.reject("Teacher's school not found!")
            // }
          })
          
        }
        // else{
        //   return Q.reject("Teacher not found!")
        // }
      });
    }

    public createPragatReport(report: Array<any>){
      var pragatCount = {
        "SecondDivision" : 0,
        "FirstDivision" : 0,
        "Distinction" : 0,
        "Fail" : 0
      }
      Enumerable.from(report).forEach(reportObj => {
        if(reportObj["TotalPercentage"] > 40 && reportObj["TotalPercentage"] <= 60){
            reportObj["result"] = "Second Division";
            pragatCount["SecondDivision"] += 1
        }
        else if(reportObj["TotalPercentage"] > 60 && reportObj["TotalPercentage"] <= 80){
            reportObj["result"] = "First Division";
            pragatCount["FirstDivision"] += 1
        }
        else if(reportObj["TotalPercentage"] > 80 && reportObj["TotalPercentage"] <= 100){
            reportObj["result"] = "Distinction";
            pragatCount["Distinction"] += 1
        }
        else{
            reportObj["result"] = "Fail";
            pragatCount["Fail"] += 1
        }
    });
    var newResponse = report.filter(function (r) {
        return r.Scored == true
    });
    var total_scored = newResponse.length
    var percent_pragat = ((total_scored - pragatCount["Fail"]) / total_scored) * 100
    var percent_non_pragat = (pragatCount["Fail"] / total_scored) * 100
    var percent_distinction = (pragatCount["Distinction"] / total_scored) * 100
    var percent_FirstDivision = (pragatCount["FirstDivision"] / total_scored) * 100
    var percent_SecondDivision = (pragatCount["SecondDivision"] / total_scored) * 100
    var pragat_report = {
        "Pragat Percent" : percent_pragat,
        "NonPragat Percent" : percent_non_pragat,
        "Distinction Percent" : percent_distinction,
        "FirstDivision Percent" : percent_FirstDivision,
        "SecondDivision Percent" : percent_SecondDivision,
        "TotalStudents Assessed" : total_scored
    }
    return [pragat_report]
    }
 
}

export default ReportService;


