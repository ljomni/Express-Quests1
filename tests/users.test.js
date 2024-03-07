const request = require("supertest");
const app = require("../src/app");
const { pool } = require("../../database");
const crypto = require("crypto");

afterAll(async () => {
  await pool.end();
});



describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});

describe("GET /api/users/:id", () => {
  it("should return one user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no user", async () => {
    const response = await request(app).get("/api/users/0");

    expect(response.status).toEqual(404);
  });
});

describe("POST /api/users", () => {
  it("should return created user with all properties", async () => {
    const newUser = {
      firstname: "Marie",
      lastname: "Martin",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Paris",
      language: "French",
    };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    const [result] = await pool.query(
      "SELECT * FROM users WHERE id=?",
      response.body.id
    );

    const [userInDatabase] = result;

    expect(userInDatabase).toHaveProperty("id");
    expect(userInDatabase).toHaveProperty("firstname");
    expect(userInDatabase.firstname).toEqual(newUser.firstname);

    expect(userInDatabase).toHaveProperty("lastname");
    expect(userInDatabase.lastname).toEqual(newUser.lastname);

    expect(userInDatabase).toHaveProperty("email");
    expect(userInDatabase.email).toEqual(newUser.email);

    expect(userInDatabase).toHaveProperty("city");
    expect(userInDatabase.city).toEqual(newUser.city);

    expect(userInDatabase).toHaveProperty("language");
    expect(userInDatabase.language).toEqual(newUser.language);
  });

  it("should return an error for missing properties", async () => {
    const userWithMissingProps = { firstname: "Jane" };

    const response = await request(app)
      .post("/api/users")
      .send(userWithMissingProps);

    expect(response.status).toEqual(500);
  });
});