const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    introduction: {
        type: String
    },
    major: {
        type: String,
        maxlength: 30
    },
    images: {
        type: Array,
        default: []
    },
    graduStatus: {
        type: Number,
        default: 1
    },
    license: {
        type: String,
        maxlength: 100
    }
}, { timestamps: true })

profileSchema.index({
    title: 'text',
    introduction: 'text'
}, {
    weights: {
        title: 5,
        introduction: 1
    }
})


const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile } 