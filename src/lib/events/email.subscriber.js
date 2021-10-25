import EmailService from "../../utils/sendEmail";
import EventEmitter from "events";
const Emitter = new EventEmitter();

Emitter.on("login_event", async (data) => await EmailService.SendEmail(data));
Emitter.on("inviteemail_event", async (data) => await EmailService.SendEmail(data));
export default Emitter;
