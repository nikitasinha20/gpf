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
process.env["SENDGRID_API_KEY"] = "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"

@repository({ path: 'report', model: report })
export class ReportRepository extends AuthorizationRepository {

    @inject(ReportService)
    reportService: ReportService.ReportService;

    preCreate(params: EntityActionParam): Q.Promise<EntityActionParam> {
        console.log("***********In precreate");
        return Q.resolve(params);
    }

    doCreateReport(standard:string, subject:string ): Q.Promise<any>{
        return this.reportService.createReport(standard, subject);
    }

    doCreateTeacherReport(teacher, standard:string, subject:string, pragat:boolean, saral:boolean ): Q.Promise<any>{
        return this.reportService.createTeacherReport(teacher, standard, subject, saral).then(report =>{
            if(pragat){
                return this.reportService.createPragatReport(report);
            }
            else{
                return Q.resolve(report);
            }
        });
    }
    
    doSendMail(email:string, report_name:string){
        var data = fs.readFileSync(report_name, 'base64', function (err,data) {
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
    
}
export default ReportRepository;
