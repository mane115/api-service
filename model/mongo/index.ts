import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import clientInit from './client';
import apiInit from './api';
import collectionInit from './collection';
import queueInit from './queue';
import responsenit from './response';
import config from '../../config';
import { fs } from '../../util';

mongoose.Promise = bluebird;
mongoose.connect(config.database.mongo);
console.log(`init mongo success ${config.database.mongo}`);
clientInit(mongoose);
apiInit(mongoose);
collectionInit(mongoose);
queueInit(mongoose);
responsenit(mongoose)
export let users = mongoose.models.users;
export let apis = mongoose.models.apis;
export let responses = mongoose.models.responses;
export let collections = mongoose.models.apiCollections;
export let queues = mongoose.models.queues;
export default mongoose