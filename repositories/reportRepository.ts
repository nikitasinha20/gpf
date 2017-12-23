import {repository} from "nodedata/core/decorators";
import {report} from '../models/report';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';
import {AuthorizationRepository} from './../security/AuthorizationRepository'
import {inject} from 'nodedata/di/decorators/inject';
import * as ReportService from '../services/reportService';
import Q = require('q');
import { entityAction, EntityActionParam } from "nodedata/core/decorators/entityAction";

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

}
export default ReportRepository;
