import { status } from '../../common/const';
let init = function (mongoose) {
    let client = new mongoose.Schema({
        client_id: String,
        client_secret: String,
        status: {
            type: Number,
            default: status.client.active
        },
        create_at: {
            type: Date,
            default: new Date
        },
        update_at: {
            type: Date,
            default: new Date
        }
    });
    client.index({
        client_id: 1
    })
    mongoose.model('clients', client)
};
export default init