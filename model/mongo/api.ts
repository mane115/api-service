import { status, type } from '../../common/const';
let init = function (mongoose) {
    let schema = new mongoose.Schema({
        collection_info: {
            type: mongoose.Schema.ObjectId,
            ref: 'apiCollections',
        },
        name: String,
        url: String,
        method: String,
        headers: String,
        body: String,
        status: {
            type: Number,
            default: status.api.active
        },
        api_type: {
            type: Number,
            default: type.api.base
        },
        create_at: {
            type: Date,
            default: Date.now
        },
        update_at: {
            type: Date,
            default: Date.now
        },
    });
    mongoose.model('apis', schema)
};
export default init