import { connection, router } from "../server";
import request from "supertest";

export const historyPayload = {
  symptoms: "Cefalea",
  medicalApp: "Neurología",
  drugs: "Ibuprofeno",
};

describe("history", () => {
  beforeAll(async () => {
    await connection;
  });

  // Testear GET ALL
  describe("get all histories", () => {
    describe("given the histories can be read", () => {
      it("should return a 200", async () => {
        const response = await request(router).get(`/histories/get`);
        expect(response.statusCode).toBe(200);
      });
    });
    // Testear POST
    describe("create history", () => {
      describe("given the history can be created", () => {
        it("should return a 201", async () => {
          const response = await request(router)
            .post("/histories/create")
            .send(historyPayload);
          expect(response.statusCode).toBe(201);
        });
      });

      //Testear GET con ID
      describe("get history by id", () => {
        describe("given the history can be read", () => {
          it("should return a 200", async () => {
            const historyId = "history-123";
            const response = await request(router).get(
              `/histories/get/${historyId}`
            );
            expect(200);
          });
        });
        // Testear DELETE
        describe("delete history", () => {
          describe("given the history can be deleted", () => {
            it("should return a 201", async () => {
              const historyId = "history-123";
              const response = await request(router)
                .delete(`/histories/delete/${historyId}`)
                .send();
              expect(201);
            });
          });
          //Testear PUT
          const editHistory = {
            symptoms: "Náuseas",
            medicalApp: "Neurología",
            drugs: "Ibuprofeno",
          };

          describe("edit history", () => {
            describe("given the history can be edited", () => {
              it("should return a 201", async () => {
                const historyId = "history-123";
                const response = await request(router)
                  .put(`/histories/update/${historyId}`)
                  .send(editHistory);
                expect(201);
              });
            });
          });
        });
      });
    });
  });
});
