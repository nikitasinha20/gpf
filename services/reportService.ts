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
import {myclass} from '../models/myclass';
import {school} from '../models/school';
import {teacher} from '../models/teacher';
const excel = require('node-excel-export');

@service({ singleton: true, serviceName: 'studentService' })
export class ReportService {

    @inject(studentRepository)
    private studentRepo: studentRepository.StudentRepository;

    @inject(schoolRepository)
    private schoolRepo: schoolRepository.SchoolRepository;

    @inject(MyclassRepository)
    private MyclassRepo: MyclassRepository.MyclassRepository;

    @inject(TeacherRepository)
    private teacherRepo: TeacherRepository.TeacherRepository;

    public createReport(params:any) {
        var subjectParam = params["subject"];
        var standardParam = params["standard"];
        var assessmentParam = params["assessment"]; 
        var reportDataList = [];
        var studentList = this.studentRepo.getAllStudentList();
        Enumerable.from(studentList).forEach(student => {
            let reportData = {};
            reportData['childName'] = student['name'];
            reportData['gender'] =student['sex'];
            let id = student['_id'];
            return this.MyclassRepo.findWhere({'students._id' : id}).then((studentClass: myclass) => {
                if(studentClass.standard === standardParam){
                    reportData['standard'] = studentClass.standard;
                    return this.schoolRepo.findWhere({'classes._id': studentClass._id}).then((studentSchool:school)=>{
                        reportData['district'] = studentSchool.disctrict;
                        reportData['block'] = studentSchool.block;
                        reportData['cluster'] = studentSchool.cluster;
                        reportData['schoolName'] = studentSchool.school_name;
                        return this.teacherRepo.findWhere({'school_id': studentSchool._id.toString()}).then((schoolTeachers: Array<teacher>)=>{
                            Enumerable.from(schoolTeachers).forEach(schoolTeacher =>{
                                Enumerable.from(schoolTeacher.myclasses).forEach(teacherClass =>{
                                    Enumerable.from(teacherClass.courses).forEach(teacherCourse =>{
                                        if(teacherCourse.course_subject === subjectParam){
                                            if(teacherClass.standard==studentClass.standard){
                                                reportData['teacherName'] = schoolTeacher.name
                                            }
                                            reportDataList.push(reportData);
                                        }
                                    });
                                });
                            });
                        });
                    });
                }
            });
        });
        // var finalReport = this.exportData( reportDataList);
        //export reportDataList(It contains all the rows)

        return Q.when(reportDataList);
    }

    exportData(params: any){
        const styles = {
            headerDark: {
                fill: {
                  fgColor: {
                    rgb: 'FF000000'
                  }
                },
                font: {
                  color: {
                    rgb: 'FFFFFFFF'
                  },
                  sz: 14,
                  bold: true,
                  underline: true
                }
              },
              cellPink: {
                fill: {
                  fgColor: {
                    rgb: 'FFFFCCFF'
                  }
                }
              },
              cellGreen: {
                fill: {
                  fgColor: {
                    rgb: 'FF00FF00'
                  }
                }
            }
        };
        const heading = [
        //     [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
        //     ['a2', 'b2', 'c2'] // <-- It can be only values 
        ];

        const specification = {
            customer_name: { // <- the key should match the actual data key 
              displayName: 'Customer', // <- Here you specify the column header 
              headerStyle: styles.headerDark, // <- Header style 
              cellStyle: function(value, row) { // <- style renderer function 
                // if the status is 1 then color in green else color in red 
                // Notice how we use another cell value to style the current one 
                return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible  
              },
              width: 120 // <- width in pixels 
            },
            status_id: {
              displayName: 'Status',
              headerStyle: styles.headerDark,
              cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property 
                return (value == 1) ? 'Active' : 'Inactive';
              },
              width: '10' // <- width in chars (when the number is passed as string) 
            },
            note: {
              displayName: 'Description',
              headerStyle: styles.headerDark,
              cellStyle: styles.cellPink, // <- Cell style 
              width: 220 // <- width in pixels 
            }
        }

        const dataset = [params];

        const report = excel.buildExport(
            [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report 
              {
                name: 'Report', // <- Specify sheet name (optional) 
                heading: heading, // <- Raw heading array (optional) 
                // merges: merges, // <- Merge cell ranges 
                specification: specification, // <- Report specification 
                data: dataset // <-- Report data 
              }
            ]
        );

        return report;

    }
 
}

export default ReportService;


