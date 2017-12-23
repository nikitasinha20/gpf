"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const decorators_1 = require('nodedata/di/decorators');
const inject_1 = require('nodedata/di/decorators/inject');
const studentRepository = require('../repositories/studentRepository');
const Enumerable = require('linq');
const schoolRepository = require('../repositories/schoolRepository');
const MyclassRepository = require('../repositories/myclassRepository');
const TeacherRepository = require('../repositories/teacherRepository');
const ScoreRepository = require('../repositories/scoreRepository');
const QuestionRepository = require('../repositories/questionRepository');
// const excel = require('node-excel-export');
var json2xls = require('json2xls');
const fs = require('fs');
const Q = require('q');
let ReportService = class ReportService {
    createReport(param_standard, param_subject) {
        var subjectParam = param_subject;
        var standardParam = param_standard;
        var reportDataList = [];
        var asyncCalls = [];
        return this.MyclassRepo.findWhere({ "standard": standardParam }).then((classes) => {
            var studentsList;
            Enumerable.from(classes).forEach(req_class => {
                if (req_class.students && req_class.students.length > 0) {
                    // studentsList = studentsList.push(...req_class.students);
                    Enumerable.from(req_class.students).forEach(student => {
                        let reportData = {};
                        reportData['childName'] = student['name'];
                        reportData['gender'] = student['sex'];
                        asyncCalls.push(this.schoolRepo.findWhere({ 'classes._id': req_class._id }).then((studentSchools) => {
                            var studentSchool = studentSchools[0];
                            if (studentSchool) {
                                reportData['district'] = studentSchool.disctrict;
                                reportData['block'] = studentSchool.block;
                                reportData['cluster'] = studentSchool.cluster;
                                reportData['schoolName'] = studentSchool.school_name;
                                return this.teacherRepo.findWhere({ 'school_id': studentSchool._id.toString() }).then((schoolTeachers) => {
                                    Enumerable.from(schoolTeachers).forEach(schoolTeacher => {
                                        Enumerable.from(schoolTeacher.myclasses).forEach(teacherClass => {
                                            Enumerable.from(teacherClass.courses).forEach(teacherCourse => {
                                                if (teacherCourse.course_subject === subjectParam) {
                                                    if (teacherClass.standard == req_class.standard) {
                                                        reportData['teacherName'] = schoolTeacher.name;
                                                    }
                                                    return this.scoreRepo.findWhere({ 'student': student._id }).then((scores) => {
                                                        Enumerable.from(scores).forEach(score => {
                                                            return this.questionRepo.findWhere({ _id: score.question }).then((questions) => {
                                                                var question = questions[0];
                                                                reportData[question.text] = score.marks;
                                                            });
                                                        });
                                                        let exists = false;
                                                        Enumerable.from(reportDataList).forEach(data => {
                                                            if (reportData['childName'] == data['childName']) {
                                                                exists = true;
                                                            }
                                                        });
                                                        if (!exists && Object.keys(reportData).length > 8) {
                                                            reportData['class'] = standardParam;
                                                            reportDataList.push(reportData);
                                                        }
                                                    });
                                                }
                                            });
                                        });
                                    });
                                });
                            }
                        }));
                    });
                }
            });
            return Q.allSettled(asyncCalls).then(res => {
                var finalReport = this.exportData(reportDataList);
                return reportDataList;
            }).catch(err => {
                throw err;
            });
        });
    }
    exportData(params) {
        var json = params;
        var xls = json2xls(json);
        return fs.writeFileSync('data.xlsx', xls, 'binary');
    }
};
__decorate([
    inject_1.inject(studentRepository), 
    __metadata('design:type', studentRepository.StudentRepository)
], ReportService.prototype, "studentRepo", void 0);
__decorate([
    inject_1.inject(schoolRepository), 
    __metadata('design:type', schoolRepository.SchoolRepository)
], ReportService.prototype, "schoolRepo", void 0);
__decorate([
    inject_1.inject(ScoreRepository), 
    __metadata('design:type', ScoreRepository.scoreRepository)
], ReportService.prototype, "scoreRepo", void 0);
__decorate([
    inject_1.inject(QuestionRepository), 
    __metadata('design:type', QuestionRepository.QuestionRepository)
], ReportService.prototype, "questionRepo", void 0);
__decorate([
    inject_1.inject(MyclassRepository), 
    __metadata('design:type', MyclassRepository.MyclassRepository)
], ReportService.prototype, "MyclassRepo", void 0);
__decorate([
    inject_1.inject(TeacherRepository), 
    __metadata('design:type', TeacherRepository.TeacherRepository)
], ReportService.prototype, "teacherRepo", void 0);
ReportService = __decorate([
    decorators_1.service({ singleton: true, serviceName: 'studentService' }), 
    __metadata('design:paramtypes', [])
], ReportService);
exports.ReportService = ReportService;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReportService;

//# sourceMappingURL=reportService.js.map
