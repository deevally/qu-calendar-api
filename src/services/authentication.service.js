import { StatusMessages, ResponseCode } from "../utils/constants";
import ErrorResponse from "../utils/ErrorResponse";
import EmailService from "../utils/sendEmail";
import emailSubcriber from "../lib/events/email.subscriber";
import scheduler from "../lib/events/agenda.scheduler";
import UserService from "./event.service";
import { email_from } from "../config/config";
import GenericRepository from "../repository/generic.repository";
import { User } from "../models/event.model";
/**
 * @description Authentication  Service
 * @class AuthenticationService
 */



/**
 * @description Authenticate a user
 * @returns {Object} token
 */
async function AuthenticateUser({ email, password }) {
  const date = new Date().toUTCString();
  if (!email || !password) {
    throw new ErrorResponse("email and password is required", 400);
  }

  const user = await UserService.FindByCredentials(email, password);

  const emailData = {
    destinationEmail: user.email,
    sourceEmail: email_from,
    subject: `Hello ${user.fullname} - Your login activity`,
    body: `Hello ${user.fullname}. Someone attempted to login to your Alt-Travel account on ${date}. If it's not you, kindly change your password. Thanks.`,
  };
  //emailSubcriber.emit("login_event", emailData);
  //scheduler.SendEmailLogin(emailData);

  return user;
}

export default {
  AuthenticateUser
};
