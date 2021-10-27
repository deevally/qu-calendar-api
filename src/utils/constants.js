const ResponseCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};
const StatusMessages = {
  NO_TASKS_TODAY:"No task created today",
  NO_TASKS_PERIOD:"No tasks created this period",
  ERROR_CREATING_EVENT: 'Error creating event',
  TASK_NOT_FOUND: 'Task not found',
  ERROR_UPDATING_TASK: "Error updating task",
  INVALID_CREDENTIALS: "Invalid credentials",
  ERROR_UPLOADING_FILE: "Error uploading file",
};


Object.freeze(ResponseCode);
Object.freeze(StatusMessages);

export { ResponseCode, StatusMessages };
