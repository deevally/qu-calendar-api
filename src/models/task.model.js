import mongoose from "mongoose";
import Joi from "joi";
import mongooseUniqueValidator from "mongoose-unique-validator";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    summary: {
      type: String,
      lowercase: true,
      trim: true,
      index: {
        unique: false,
      }
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
      index: {
        unique: false,
      }
    },
    status: {
      type: String,
      enum: {
        values: ["todo", "inprogress", "testing", "done"],
        message: "Please select correct status",
      },
      default: "todo",
    },
    file: {
      type: String,
      lowercase: true,
      trim: true,
      index: {
        unique: false,
      }
    },
    eventUrl: {
      type: String,
      lowercase: true,
      trim: true,
      index: {
        unique: false,
      },
    },

    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: Date.now
    },
  
  },
  { timestamps: true }
);

const validateTask = (k) => {
  const schema = Joi.object({
    summary: Joi.string(),
    description: Joi.string(),
    eventUrl: Joi.string(),
    location: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    attendees: Joi.string(),
    status: Joi.string().valid("todo", "inprogress", "testing", "done"),
    file: Joi.string(),
  
  });

  return schema.validate(k);
};



TaskSchema.plugin(mongoosePaginate);
TaskSchema.plugin(mongooseUniqueValidator);

TaskSchema.set("toObject", { virtuals: true });
TaskSchema.set("toJSON", { virtuals: true });

const Task = mongoose.model("Task", TaskSchema);

module.exports = {
  Task,
  validateTask,
};
