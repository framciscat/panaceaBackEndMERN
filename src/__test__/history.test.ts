import supertest from "supertest";
import {router} from "../server";
import request from "supertest";


export const historyPayload = {
  symptoms: "Cefalea",
  medicalApp: "Neurología",
  drugs: "Ibuprofeno",
};

describe("history", () => {
  describe("get history", () => {
    describe("given the history does not exist", () => {
      it("should return a 404", async () => {
        const historyId = "history-123";

        const response = await request(router).get(`/histories/get`);
        console.log(response);
      });
    });
  });
});
//     describe("given the history does exist", () => {
//       it("should return a 200 status and the history", async () => {
//         const history = await createHistory(historyPayload);

//         const historyId = "history-123";

//         const { body, statusCode } = await supertest(router)
//           .get(`/get/${historyId}`)
//           .expect(200);
//       });
//     });
//   });
// }); 

