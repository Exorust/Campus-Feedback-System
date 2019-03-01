const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja Schema & model
const FeedbackSchema = new Schema({
    student_id: {
        type: Number,
        required: [true, 'Name field is required']
    },
    feedback_type: {
        type: String,
        required: [true, 'Name field is required']
    },
    content: {
        type: String,
        required: [true, 'Name field is required']
    }
    // add in geo location
});

const FeedbackModel = mongoose.model('feedback', FeedbackSchema);

module.exports = FeedbackModel;
