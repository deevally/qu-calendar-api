import ErrorResponse  from "../utils/error.response";
import GenericRepository from "../repository/generic.repository";
import { Task } from "../models/task.model";
import { StatusMessages, ResponseCode } from "../utils/constants";
import { google } from "googleapis";
import AWS from "aws-sdk";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_SCOPES,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  BUCKET_NAME,
} from "../config/config";

//create a new instance of OAuth2Client
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
);

const scopes = [GOOGLE_SCOPES];

//Generate Google Auth Url
const authCode = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  prompt: "consent",
});

/**
 * @description Task Service
 * @class TaskService
 */

/**
 * @description Auth User with Google
 * @returns {Url} Url
 */
async function AuthUser() {
  const userAuth = authCode;
  return userAuth;
}

/**
 * @description Google Auth callback Url and token
 * @returns {Url} Url
 */
async function AuthCallback(code) {
  //Get code sent by Google and Exchange it for tokens
  const { tokens } = await oauth2Client.getToken(code);

  return tokens;
}

/**
 * @description Get Task created in a day
 * @returns {Object} Task
 */
async function TasksToday(limit, page) {
  const options = {
    limit: Number(limit),
    page: Number(page),
  };
  const tasks = await GenericRepository.tasksToday(options);
  if (Array.isArray(tasks) && tasks.length === 0)
    throw new ErrorResponse(
      StatusMessages.NO_EVENTS_TODAY,
      ResponseCode.NOT_FOUND
    );

  return tasks;
}

/**
 * @description Get Task created in a day , week , month
 * @returns {Object} Task
 */
async function TasksADayWeekMonth({ dayStart, dayEnd,limit, page }) {

  const pagination = {
    limit: Number(limit),
    page: Number(page),
  }
  const event = await GenericRepository.tasksADayWeekMonth(dayStart, dayEnd,pagination);
  if (Array.isArray(event) && event.length === 0)
    throw new ErrorResponse(
      StatusMessages.NO_EVENTS_PERIOD,
      ResponseCode.NOT_FOUND
    );

  return event;
}

/**
 * @description Create Task
 * @returns {Object} Task
 */

async function CreateTask(options, tokens, fileOptions) {
  const {
    summary,
    description,
    eventUrl,
    file,
    startDate,
    endDate,
    attendees,
    location,
  } = options;

  const eventData = {
    summary,
    description,
    startDate,
    endDate,
    attendees,
    location,
  };

  //Create Google Event
  const event = await CreateEvent(eventData, tokens);

  //Upload file to S3
  const s3Upload = await UploadFile(fileOptions);
  console.log({ s3Upload });

  const taskData = {
    summary,
    file: s3Upload,
    description,
    eventUrl: event.eventUrl,
    startDate,
    endDate,
  };
  //Create Task
  const task = await GenericRepository.create(Task, taskData);

  const result = {
    summary: task.summary,
    description: task.description,
    eventUrl: event.eventUrl,
    file: s3Upload,
    startDate: task.startDate,
    endDate: task.endDate,
  };

  return result;
}

/**
 * @description Create Event in Google Calendar
 * @returns {Object} Event
 */
async function CreateEvent(eventData, tokens) {
  oauth2Client.setCredentials(tokens);

  const {
    summary,
    description,
    eventUrl,
    startDate,
    endDate,
    attendees,
    location,
  } = eventData;

  const calendar = google.calendar({ version: "v3", oauth2Client });

  // Create a list of attendee objects to pass into the request to Google
  const attendeesEmails = attendees.split(",");

  const attendeesList = attendeesEmails.map((attendee) => {
    return { email: attendee.trim() };
  });

  //The Event details
  const eventDetails = {
    summary: summary,
    location: location,
    description: description,
    start: {
      dateTime: startDate,
    },
    end: {
      dateTime: endDate,
    },
    attendees: attendeesList,
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  let calendarEvent;
  try {
    calendarEvent = await calendar.events.insert({
      sendNotifications: true,
      auth: oauth2Client,
      calendarId: "primary",
      resource: eventDetails,
    });
    return { eventUrl: calendarEvent.data.htmlLink };
  } catch (error) {
    throw new ErrorResponse(
      StatusMessages.ERROR_CREATING_EVENT,
      ResponseCode.INTERNAL_SERVER_ERROR
    );
  }
}

/**
 * @description Upload file to S3
 * @returns {Object} S3 url
 */
async function UploadFile({ uploadFile, contentType, fileName }) {
  //Create new S3 instance

  const s3 = new AWS.S3();
  // Set the Region
  AWS.config.update({
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    //region: "us-east-1", //Region
  });

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    Body: uploadFile,
    ContentType: contentType,
    ACL: "public-read",
  };

  try {
    //Uploading files to the bucket

    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    throw new ErrorResponse(
      StatusMessages.ERROR_UPLOADING_FILE,
      ResponseCode.INTERNAL_SERVER_ERROR
    );
  }
}

/**
 * @description Update Task Progress
 * @returns {boolean} true
 */

async function UpdateTaskProgress({ taskId, status }) {
  const task = await GenericRepository.findById(Task, taskId);
  if (!task)
    throw new ErrorResponse(
      StatusMessages.TASK_NOT_FOUND,
      ResponseCode.NOT_FOUND
    );
  const updatedTask = await GenericRepository.update(Task, taskId, { status });

  if (!updatedTask)
    throw new ErrorResponse(
      StatusMessages.ERROR_UPDATING_TASK,
      ResponseCode.BAD_REQUEST
    );
  if (updatedTask) return true;
}


/**
 * @description Delete Task Service
 * @returns {boolean} true
 */

 async function DeleteTask(taskId ) {
  const task = await GenericRepository.findById(Task, taskId);
  if (!task)
    throw new ErrorResponse(
      StatusMessages.TASK_NOT_FOUND,
      ResponseCode.NOT_FOUND
    );
  const deleteTask = await GenericRepository.deleteRecord(Task, taskId,);
  if (deleteTask) return true;
}
export default {
  TasksToday,
  TasksADayWeekMonth,
  CreateTask,
  CreateEvent,
  AuthUser,
  AuthCallback,
  UploadFile,
  UpdateTaskProgress,
  DeleteTask
};
