import mongoose from "mongoose";
import Joi from "joi";
import mongooseUniqueValidator from "mongoose-unique-validator";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const EventSchema = new Schema(
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
    eventUrl: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: {
        unique: true,
      },
    },

    start: {
      type: Date,
      default: Date.now
    },
    end: {
      type: Date,
      default: Date.now
    },
  
  },
  { timestamps: true }
);

const validateEvent = (event) => {
  const schema = Joi.object({
    summary: Joi.string(),
    description: Joi.string(),
    eventUrl: Joi.string(),
    start: Joi.string(),
    end: Joi.string()
  });

  return schema.validate(event);
};



EventSchema.plugin(mongoosePaginate);
EventSchema.plugin(mongooseUniqueValidator);

EventSchema.set("toObject", { virtuals: true });
EventSchema.set("toJSON", { virtuals: true });

const Event = mongoose.model("Event", EventSchema);

module.exports = {
  Event,
  validateEvent,
};
