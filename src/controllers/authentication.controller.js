import asyncHandler from "../middlewares/async";
import UserService from "../services/event.service";
import { StatusMessages } from "../utils/constants";
import {google} from "googleapis"
/**
 * @description Authentication controller
 * @class AuthenticationController
 */


const AuthUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  let user;

  await UserService.GetUserByEmail(email);

  const UserInfo = {
    email,
    password,
  };
  try {
    user = await req.service.auth.AuthenticateUser(UserInfo);

  } catch (error) {
    next(error);
  }
});
export default {
  AuthUser
};
