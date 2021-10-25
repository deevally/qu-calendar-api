// import { agenda } from "./agenda";

// // const emailData = {
// //   destinationEmail: "gerald.anosike@sterling.ng",
// //   sourceEmail: "travelalt@sterling.ng",
// //   subject: "Test reoccuring emails",
// //   body: `Hello ANON. Someone attempted to login to your traveldesk account on SEPTEMBER. If it's not you, kindly change your password. Thanks.`,
// // };

// // const scheduler = {
// //   SendEmailLogin: async (data) => {
// //     await agenda.schedule("in 5 second", "login", data);
// //   },

// //     SendInviteEmail: async (data) => {
// //     await agenda.schedule("in 2 minutes", "inviteuser", data);

// //   }

// // };

// // (async function  SendInviteEmail(data) {
// //   await agenda.start();
// //   await agenda.schedule("in 2 minutes", "inviteuser", data);
// // })();

//   async function SendEmailLogin(data){
//    // await agenda.start();
//     await agenda.schedule("in 5 second", "login", data);
//   }

//   async function SendInviteEmail(data) {
//     //await agenda.start();
//     await agenda.schedule("in 2 minutes", "inviteuser", data);

//   }

// //export default scheduler;

// export default {
//   SendEmailLogin,
//   SendInviteEmail
// }

import agenda from "./agenda";

const scheduler = {
  SendEmailLogin: async (data) => {
    await agenda.schedule("in 5 second", "login", data);
  },

  SendInviteEmail: async (data) => {
    await agenda.schedule("in 1 minute", "inviteuser", data);
  },
};

export default scheduler;
