import * as Router from 'koa-router';
import * as adminCtr from '../controller/admin';
const router = new Router();
router.post('/client', adminCtr.createClient);
export default router