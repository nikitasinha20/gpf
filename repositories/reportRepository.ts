import {repository} from "nodedata/core/decorators";
import {report} from '../models/report';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'report', model: report })
export class ReportRepository extends DynamicRepository {

}
export default ReportRepository;
