import * as Router from 'koa-router';
import * as collectionCtr from '../controller/collection';
const router = new Router();
router.post('/', collectionCtr.createCollection);
router.get('/list/:page', collectionCtr.getList);
router.get('/:id', collectionCtr.getInfo);
export default router