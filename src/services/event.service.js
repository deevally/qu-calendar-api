import ErrorResponse from "../utils/ErrorResponse";
import GenericRepository from "../repository/generic.repository";
import { Event } from "../models/event.model";
import { StatusMessages, ResponseCode } from "../utils/constants";


/**
 * @description Event  Service
 * @class EventService
 */

/**
 * @description Get events created in a day
 * @returns {Object} user
 */
async function EventsADay() {
  const event = await GenericRepository.eventsADay();
if(Array.isArray(event) && event.length === 0) throw new ErrorResponse(StatusMessages.NO_EVENTS_TODAY, ResponseCode.NOT_FOUND);

return event;
}


/**
 * @description Get events created in a week
 * @returns {Object} user
 */
 async function EventsAWeek() {
  const event = await GenericRepository.eventsAWeek();
if(Array.isArray(event) && event.length === 0) throw new ErrorResponse(StatusMessages.NO_EVENTS_WEEK, ResponseCode.NOT_FOUND);

return event;
}


/**
 * @description Get events created in a month
 * @returns {Object} user
 */
 async function EventsAMonth() {
  const event = await GenericRepository.eventsAMonth();
if(Array.isArray(event) && event.length === 0) throw new ErrorResponse(StatusMessages.NO_EVENTS_WEEK, ResponseCode.NOT_FOUND);

return event;
}

/**
 * @description Create Event
 * @returns {Object} Event
 */

async function CreateEvent(options){

  const event = await GenericRepository.create(Event, options);

  if(!event) throw new ErrorResponse(StatusMessages.ERROR_CREATING_EVENT, ResponseCode.INTERNAL_SERVER_ERROR)

  return event;
}




export default {
  EventsADay,
  EventsAWeek,
  CreateEvent,
  EventsAMonth
};
