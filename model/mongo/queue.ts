import { status, type } from '../../common/const';
let init = function (mongoose) {
    let schema = new mongoose.Schema({
        api_info: {
            type: mongoose.Schema.ObjectId,
            ref: 'apis',
        },
        pre: {
            type: mongoose.Schema.ObjectId,
            ref: 'apis',
        },
        body: String,
        headers: String,
        create_at: {
            type: Date,
            default: Date.now
        },
        update_at: {
            type: Date,
            default: Date.now
        }
    });
    mongoose.model('queues', schema)
};
export default init