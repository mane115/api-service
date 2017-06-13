import * as Router from 'koa-router';
import * as ctr from '../controller/api';
import FilterFactory from '../midware/filter'
const factory = new FilterFactory();
const router = new Router();
const filter = factory.getFilter('api');
router.post('/', filter.validate('create'), ctr.createApi);
router.post('/:id', ctr.testApi);
router.get('/:id', ctr.getInfo);
router.put('/:id', ctr.updateApi);
export default router