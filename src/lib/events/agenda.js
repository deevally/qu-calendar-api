
import Agenda from "agenda";
import EmailService from "../../utils/sendEmail";
import log from "../../utils/logger";
import {
  NODE_ENV,
  MONGO_DB_URL_DEV,
  MONGO_DB_URL_TEST,
  MONGO_DB_URL_STAGING,
  MONGO_DB_URL_PROD,
} from "../../config/config";

let connectionUrl;
if (NODE_ENV === "development") {
  connectionUrl = MONGO_DB_URL_DEV;
} else if (NODE_ENV === "test") {
  connectionUrl = MONGO_DB_URL_TEST;
} else if (NODE_ENV === "staging") {
  connectionUrl = MONGO_DB_URL_STAGING;
} else if (NODE_ENV === "production") {
  connectionUrl = MONGO_DB_URL_PROD;
}



const agenda = new Agenda({
  db: { address: connectionUrl, collection: "CalendarJobs" },
  processEvery: '30 seconds'
});

agenda
  .on("ready", () => log.info("Agenda connection started!"))
  .on("error", () => log.info("Agenda connection error!"));

agenda.define("sendcalendarinvite",{priority: 'high', concurrency: 10}, async (job) => {
  const data = job.attrs.data;
  await EmailService.SendEmail(data);
});



agenda.start();

export default agenda;
