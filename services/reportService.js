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
const excel = require('node-excel-export');
let ReportService = class ReportService {
    createReport(params) {
        var subjectParam = params["subject"];
        var standardParam = params["standard"];
        var assessmentParam = params["assessment"];
        var reportDataList = [];
        var studentList = this.studentRepo.getAllStudentList();
        Enumerable.from(studentList).forEach(student => {
            let reportData = {};
            reportData['childName'] = student['name'];
            reportData['gender'] = student['sex'];
            let id = student['_id'];
            return this.MyclassRepo.findWhere({ 'students._id': id }).then((studentClass) => {
                if (studentClass.standard === standardParam) {
                    reportData['standard'] = studentClass.standard;
                    return this.schoolRepo.findWhere({ 'classes._id': studentClass._id }).then((studentSchool) => {
                        reportData['district'] = studentSchool.disctrict;
                        reportData['block'] = studentSchool.block;
                        reportData['cluster'] = studentSchool.cluster;
                        reportData['schoolName'] = studentSchool.school_name;
                        return this.teacherRepo.findWhere({ 'school_id': studentSchool._id.toString() }).then((schoolTeachers) => {
                            Enumerable.from(schoolTeachers).forEach(schoolTeacher => {
                                Enumerable.from(schoolTeacher.myclasses).forEach(teacherClass => {
                                    Enumerable.from(teacherClass.courses).forEach(teacherCourse => {
                                        if (teacherCourse.course_subject === subjectParam) {
                                            if (teacherClass.standard == studentClass.standard) {
                                                reportData['teacherName'] = schoolTeacher.name;
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
    exportData(params) {
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
        const heading = [];
        const specification = {
            customer_name: {
                displayName: 'Customer',
                headerStyle: styles.headerDark,
                cellStyle: function (value, row) {
                    // if the status is 1 then color in green else color in red 
                    // Notice how we use another cell value to style the current one 
                    return (row.status_id == 1) ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } }; // <- Inline cell style is possible  
                },
                width: 120 // <- width in pixels 
            },
            status_id: {
                displayName: 'Status',
                headerStyle: styles.headerDark,
                cellFormat: function (value, row) {
                    return (value == 1) ? 'Active' : 'Inactive';
                },
                width: '10' // <- width in chars (when the number is passed as string) 
            },
            note: {
                displayName: 'Description',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink,
                width: 220 // <- width in pixels 
            }
        };
        const dataset = [params];
        const report = excel.buildExport([
            {
                name: 'Report',
                heading: heading,
                // merges: merges, // <- Merge cell ranges 
                specification: specification,
                data: dataset // <-- Report data 
            }
        ]);
        return report;
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
