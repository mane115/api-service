import { status } from '../../common/const';
let init = function (mongoose) {
    let schema = new mongoose.Schema({
        api: {
            type: mongoose.Schema.ObjectId,
            ref: 'apis',
        },
        response: String,
        response_type: String,
        create_at: {
            type: Date,
            default: Date.now
        },
        update_at: {
            type: Date,
            default: Date.now
        },
    });
    schema.index({
        api: 1
    });
    mongoose.model('responses', schema)
};
export default init