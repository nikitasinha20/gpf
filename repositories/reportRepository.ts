import {repository} from "nodedata/core/decorators";
import {report} from '../models/report';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';
import {inject} from 'nodedata/di/decorators/inject';
import * as ReportService from '../services/reportService';
import Q = require('q');

@repository({ path: 'report', model: report })
export class ReportRepository extends DynamicRepository {

    @inject(ReportService)
    reportService: ReportService.ReportService;

    doCreateReport(params:any): Q.Promise<any>{
        return this.reportService.createReport(params);
    }

}
export default ReportRepository;
