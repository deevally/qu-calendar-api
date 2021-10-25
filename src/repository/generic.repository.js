import moment from "moment";
import { Event } from "../models/event.model";
/**
 * @description GenericRepository
 * @class GenericRepository
 */

/**
 * @description create a new document
 * @param {Model} Model
 * @param {option} options
 * @returns {document} returns a newly created document
 */

async function create(Model, options) {
  try {
    const document = await Model.create(options);
    return document;
  } catch (error) {
    throw error;
  }
}

/**
 * @description Fetch all events in a day
 * @param {object} Model
 * @returns {Document} Resolves paginated array of documents.
 */

async function eventsADay() {
  try {
    const dayStart = moment.utc().startOf("day"); // set to 12:00 am today
    const dayEnd = moment.utc().endOf("day"); // set to 23:59 pm today
    console.log("day");

    const documents = await Event.find({
      createdAt: {
        $gte: dayStart,
        $lte: dayEnd,
      },
    }).exec();

    return documents;
  } catch (error) {
    throw error;
  }
}

/**
 * @description Fetch all events in a week
 * @param {object} Model
 * @returns {Document} Resolves paginated array of documents.
 */

async function eventsAWeek() {
  try {
    const weekStart = moment().startOf("week"); // set to the first day of this week, 12:00 am
    const weekEnd = moment().endOf("week"); // set to the last day of this week, 11:59 pm
    console.log("week");

    const documents = await Event.find({
      createdAt: {
        $gte: weekStart,
        $lte: weekEnd,
      },
    }).exec();

    return documents;
  } catch (error) {
    throw error;
  }
}

/**
 * @description Fetch all events in a month
 * @param {object} Model
 * @returns {Document} Resolves paginated array of documents.
 */

async function eventsAMonth() {
  try {
    const monthStart = moment().startOf("month"); // set to the first of this month, 12:00 am
    const monthEnd = moment().endOf("month"); // set to the last day of this month, 11:59 pm
    console.log("month");
    const documents = await Event.find({
      createdAt: {
        $gte: monthStart,
        $lte: monthEnd,
      },
    }).exec();

    return documents;
  } catch (error) {
    throw error;
  }
}

/**
 * @description Fetch all documents
 * @param {object} Model
 * @param {object} query
 * @param {object} options Query options
 * @returns {Document} Resolves paginated array of documents.
 */

async function GetAllDocs(Model, options) {
  try {
    const documents = await Model.find({}, null, {
      skip: options.page * options.limit,
    })
      .limit(options.limit)
      .sort("-createdAt")
      .exec();
    return documents;
  } catch (error) {
    throw error;
  }
}

/**
 * @description update a document
 * @param {object} Model
 * @param {object} query
 * @param {object} options Query options
 * @returns {Document} Updates a particular Document
 */

async function update(Model, id, options) {
  try {
    const documents = await Model.findOneAndUpdate({ _id: id }, options, {
      new: true,
      //runValidators: true,
    });
    return documents;
  } catch (error) {
    throw error;
  }
}

/**
 * @description deletes a document
 * @param {object} Model
 * @param {object} query
 * @param {object} options Query options
 * @returns {Document} Deletes a particular Document
 */

async function deleteRecord(Model, id) {
  try {
    const documents = await Model.findByIdAndRemove({ _id: id });

    return documents;
  } catch (error) {
    throw error;
  }
}

export default {
  create,
  update,
  deleteRecord,
  eventsADay,
  eventsAWeek,
  eventsAMonth,
};
