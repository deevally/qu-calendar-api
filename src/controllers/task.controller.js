import asyncHandler from "../middlewares/async";
import { StatusMessages, ResponseCode } from "../utils/constants";


/**
 * @description Task controller
 * @class TaskController
 */

/**
 * @description Authenticate user
 * @returns {boolean}
 */

const AuthUser = asyncHandler(async (req, res, next) => {
  try {
    const authCode = await req.service.task.AuthUser();
    console.log(authCode);
    res.redirect(authCode);
  } catch (error) {
    next(error);
  }
});

/**
 * @description Auth Callback
 * @returns {boolean}
 */

const AuthCallback = asyncHandler(async (req, res, next) => {
  const { code } = req.query;
  try {
    const tokens = await req.service.task.AuthCallback(code);

    // Save the tokens in a cookie
    res.cookie("tokens", tokens);

    // Redirect back to the client side. [http://localhost:3000/] url can be changed to any other url used by the client side. For now i just return the tokens
    //res.redirect("http://localhost:3000/");
    return res.status(200).json({
      tokens: req.cookies.tokens,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Creates a Task
 * @returns {boolean} Returns the created Task
 */

const CreateTask = asyncHandler(async (req, res, next) => {
  const tokens = req.cookies.tokens;

  // Binary data base64
  const uploadFile = Buffer.from(req.files.fileContent.data, "binary");

  const fileExtension = req.files.fileContent.name.split(".").pop();
  const fileType = req.files.fileContent.mimetype;
  const fileOptions = {
    uploadFile,
    fileName: `${Date.now()}.${fileExtension}`,
    contentType: fileType,
  };

  const options = req.body
  try {
    const result = await req.service.task.CreateTask(options, tokens, fileOptions);

    return res.status(ResponseCode.OK).json({
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Creates new Event
 * @returns {boolean} Returns the created Event
 */


const CreateEvent = asyncHandler(async (req, res, next) => {
  const eventData = req.body;

  const tokens = req.cookies.tokens;
  try {
    const result = await req.service.task.CreateEvent(eventData, tokens);
    return res.status(ResponseCode.OK).json({
      result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Get all  Task created in a day
 * @returns {object} Returns all the  Task
 */

const GetAllTaskstoday = asyncHandler(async (req, res, next) => {
  try {
    const result = await req.service.task.TasksToday();

    return res.status(ResponseCode.OK).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Update Task Progress
 * @returns {boolean} true
 */

 const UpdateTaskProgress = asyncHandler(async (req, res, next) => {
   const { status } = req.body;

   const {taskId} = req.params;
  try {

    const options = {
      taskId,
      status,
    };
    const result = await req.service.task.UpdateTaskProgress(options);

    if(result === true){
    return res.status(ResponseCode.OK).json({
      success: true,
    });
  }
  } catch (error) {
    next(error);
  }
});

/**
 * @description Get all  Task created in a Day, Week, Month. Query with date-range
 * @returns {object} Returns all the  Task
 */

const GetAllTasksDayWeekMonth = asyncHandler(async (req, res, next) => {
  const { dayStart, dayEnd } = req.query;

  try {
    const options = {
      dayStart,
      dayEnd,
    };

    const result = await req.service.task.TasksADayWeekMonth(options);

    return res.status(ResponseCode.OK).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default {
  CreateTask,
  GetAllTaskstoday,
  GetAllTasksDayWeekMonth,
  AuthUser,
  AuthCallback,
  CreateEvent,
  UpdateTaskProgress
};
