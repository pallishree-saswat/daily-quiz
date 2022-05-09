const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
      required: true,
    },
    answerOptions: {},
    correctAnswer: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
