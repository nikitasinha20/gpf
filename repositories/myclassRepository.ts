import {repository} from "nodedata/core/decorators";
import {myclass} from '../models/myclass';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'myclass', model: myclass })
export class MyclassRepository extends DynamicRepository {

}
export default MyclassRepository;
