const { Schema, model } = require("mongoose")

const feedbackSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        },
        message: {
            type: String,
            required: true
        }
    }
)


const Feedback = model("Feedback", feedbackSchema)

module.exports = Feedback
