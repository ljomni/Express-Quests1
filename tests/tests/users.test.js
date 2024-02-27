const request = require("supertest");
const app = require("../../app");
const { pool } = require("../../database");

afterAll(async () => {
  await database.end();
});


describe("GET /api/users", () => {
  test("should respond with a list of users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([])); 
  });
});

describe("GET /api/users/:id", () => {
  test("should respond with a user when a valid ID is provided", async () => {
    const userId = 1;
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", userId); 
  });

  test("should respond with 404 when an invalid ID is provided", async () => {
    const invalidUserId = 999; 
    const response = await request(app).get(`/api/users/${invalidUserId}`);
    expect(response.status).toBe(404);
  });
});
