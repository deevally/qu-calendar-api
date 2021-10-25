import asyncHandler from "../middlewares/async";
import UserService from "../services/event.service";
import { StatusMessages, ResponseCode } from "../utils/constants";

/**
 * @description Event controller
 * @class EventController
 */

/**
 * @description Creates an Event
 * @returns {boolean} Returns the Event
 */


const CreateEvent = asyncHandler(async (req, res, next) => {
  const options = req.body;
  try {
    const events = await req.service.event.CreateEvent(options);

    return res.status(ResponseCode.OK).json({
      data: events,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});



/**
 * @description Get all  Events created in a day
 * @returns {boolean} Returns all the  Event
 */


 const GetAllEventsDay = asyncHandler(async (req, res, next) => {
  try {
    const events = await req.service.event.EventsADay();

    return res.status(ResponseCode.OK).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    next(error);
  }
});




/**
 * @description Get all  Events created in a Week
 * @returns {boolean} Returns all the  Event
 */


 const GetAllEventsWeek = asyncHandler(async (req, res, next) => {
  try {
    const events = await req.service.event.EventsAWeek();

    return res.status(ResponseCode.OK).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    next(error);
  }
});


/**
 * @description Get all  Events created in a Week
 * @returns {boolean} Returns all the  Event
 */


 const GetAllEventsMonth = asyncHandler(async (req, res, next) => {
  try {
    const events = await req.service.event.EventsAMonth();

    return res.status(ResponseCode.OK).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    next(error);
  }
});
export default {
  CreateEvent,
  GetAllEventsDay,
  GetAllEventsWeek,
  GetAllEventsMonth
};
