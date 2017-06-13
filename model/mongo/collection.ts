import { status } from '../../common/const';
let init = function (mongoose) {
    let schema = new mongoose.Schema({
        name: String,
        host: String,
        base_url: String,
        create_at: {
            type: Date,
            default: Date.now
        },
        update_at: {
            type: Date,
            default: Date.now
        }
    });
    schema.index({
        name: 1
    })
    schema.index({
        create_at: -1
    })
    mongoose.model('apiCollections', schema)
};
export default init