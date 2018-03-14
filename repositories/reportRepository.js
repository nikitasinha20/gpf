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
        console.log("***********In precreate");
        return Q.resolve(params);
    }
    doCreateReport(standard, subject) {
        return this.reportService.createReport(standard, subject);
    }
    doCreateTeacherReport(teacher, standard, subject, pragat, saral) {
        return this.reportService.createTeacherReport(teacher, standard, subject, saral).then(report => {
            if (pragat) {
                return this.reportService.createPragatReport(report);
            }
            else {
                return Q.resolve(report);
            }
        });
    }
    doSendMail(email, report_name) {
        var data = fs.readFileSync(report_name, 'base64', function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log(data);
        });
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: 'reports@gyanprakash.org',
            subject: 'Report',
            text: 'Please find attached the report you had requested for. Have a Good day!',
            html: '<strong>Please find attached the report you had requested for. Have a Good day!</strong>',
            attachments: [
                {
                    content: data,
                    filename: report_name,
                    type: 'plain/text',
                    disposition: 'attachment',
                    contentId: report_name
                },
            ],
        };
        sgMail.send(msg);
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
