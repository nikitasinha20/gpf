import {repository} from "nodedata/core/decorators";
import {report} from '../models/report';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';
import {AuthorizationRepository} from './../security/AuthorizationRepository'
import {inject} from 'nodedata/di/decorators/inject';
import * as ReportService from '../services/reportService';
import * as Enumerable from 'linq';
import Q = require('q');
import { entityAction, EntityActionParam } from "nodedata/core/decorators/entityAction";
const fs = require('fs')

@repository({ path: 'report', model: report })
export class ReportRepository extends AuthorizationRepository {

    @inject(ReportService)
    reportService: ReportService.ReportService;

    preCreate(params: EntityActionParam): Q.Promise<EntityActionParam> {
        return Q.resolve(params);
    }

    doCreateReport(standard:string, subject:string ): Q.Promise<any>{
        return this.reportService.createReport(standard, subject); 
    }

    doCreateTeacherReport(params:any): Q.Promise<any>{
        var teacher = params.teacher;
        var standard = params.standard;
        var subject = params.subject;
        var pragat = params.pragat;
        var saral = params.saral; 
        return this.reportService.createTeacherReport(teacher, standard, subject, saral).then(report =>{
            if(pragat){
                return this.reportService.createPragatReport(report);
            }
            else{
                return Q.resolve(report);
            }
        });
    }
    
    doSendMail(params){
        var email = params.email;
        var report_name = params.report_name
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
        }

        transporter.sendMail(mailOptions, function(err, success) {
            if (err) {
                // Handle error
                console.log("Error: ", err)
            }
            console.log("Mail sent with attachment " + report_name + " to " + email)
        });
    }
}
export default ReportRepository;
