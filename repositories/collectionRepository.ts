import {repository} from "nodedata/core/decorators";
import {mycollection} from '../models/mycollection';
import {DynamicRepository} from 'nodedata/core/dynamic/dynamic-repository';

@repository({ path: 'mycollection', model: mycollection })
export default class CollectionRepository extends DynamicRepository {

}
