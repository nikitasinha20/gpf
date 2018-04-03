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
const decorators_1 = require("nodedata/core/decorators");
const report_1 = require('../models/report');
const AuthorizationRepository_1 = require('./../security/AuthorizationRepository');
const inject_1 = require('nodedata/di/decorators/inject');
const ReportService = require('../services/reportService');
const Q = require('q');
const fs = require('fs');
let ReportRepository = class ReportRepository extends AuthorizationRepository_1.AuthorizationRepository {
    preCreate(params) {
        return Q.resolve(params);
    }
    doCreateReport(standard, subject) {
        return this.reportService.createReport(standard, subject);
    }
    doCreateTeacherReport(params) {
        var teacher = params.teacher;
        var standard = params.standard;
        var subject = params.subject;
        var pragat = params.pragat;
        var saral = params.saral;
        return this.reportService.createTeacherReport(teacher, standard, subject, saral).then(report => {
            if (pragat) {
                return this.reportService.createPragatReport(report);
            }
            else {
                return Q.resolve(report);
            }
        });
    }
    doSendMail(params) {
        var email = params.email;
        var report_name = params.report_name;
        var mailer = require('nodemailer');
        let transporter = mailer.createTransport({
            "type": "SMTP",
            "host": "smtp.gmail.com",
            "secure": true,
            "port": 465,
            "auth": {
                "user": "pragat.gpf@gmail.com",
                "pass": "Password@12345"
            }
        });
        var mailOptions = {
            from: "reports@gyanprakash.org",
            to: email,
            subject: 'Report',
            text: 'Please find attached the report you had requested for. Have a Good day!',
            attachments: [{
                    filename: report_name,
                    path: './' + report_name
                }]
        };
        transporter.sendMail(mailOptions, function (err, success) {
            if (err) {
                // Handle error
                console.log("Error: ", err);
            }
            console.log("Mail sent with attachment " + report_name + " to " + email);
        });
    }
};
__decorate([
    inject_1.inject(ReportService), 
    __metadata('design:type', ReportService.ReportService)
], ReportRepository.prototype, "reportService", void 0);
ReportRepository = __decorate([
    decorators_1.repository({ path: 'report', model: report_1.report }), 
    __metadata('design:paramtypes', [])
], ReportRepository);
exports.ReportRepository = ReportRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReportRepository;

//# sourceMappingURL=reportRepository.js.map
