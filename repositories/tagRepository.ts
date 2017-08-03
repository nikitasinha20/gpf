import {repository} from "nodedata/core/decorators";
import {tag} from '../models/tag';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'tag', model: tag })
export default class TagRepository extends DynamicRepository {

}
