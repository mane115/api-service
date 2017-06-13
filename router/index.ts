import * as Router from 'koa-router';
import { handleResponse } from '../util';
import config from '../config';
import api from './api';
import collection from './collection';
import getLogger from '../midware/log'
const router = new Router({ prefix: config.baseUrl });
router.use('/*', handleResponse);
router.use('/endpoint', getLogger('api'), api.routes(), api.allowedMethods());
router.use('/collection', getLogger('collection'), collection.routes(), collection.allowedMethods());
export default router;