const ResponseCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};
const StatusMessages = {
  NO_EVENTS_TODAY:"No events created today",
  NO_EVENTS_WEEK:"No events created this week",
  NO_EVENTS_MONTH:"No events created this month",
  EMAIL_NOT_SENT:'Email could not be sent',
  ERROR_CREATING_EVENT: 'Error creating event',
  USER_ALREADY_INVITED: 'User already invited',
  ERROR_INVITE: 'Error inviting user',
  INVITE_SENT: 'Invite sent successfully',
  INVALID_CREDENTIALS: "Invalid credentials",
};


Object.freeze(ResponseCode);
Object.freeze(StatusMessages);

export { ResponseCode, StatusMessages };
