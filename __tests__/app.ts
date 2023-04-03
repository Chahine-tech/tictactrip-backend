import request from "supertest";
import server from "../src/server";

describe("POST /api/justify", () => {
  beforeEach(() => {
    // Initialize wordsProcessedMap before each test
    server.locals.wordsProcessedMap = new Map();
  });

  test("should return justified text", async () => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const token = "testToken";
    const response = await request(server)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .send(text);

    expect(200);
  });

  test("should return 401 if invalid token provided", async () => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const token = "";
    const response = await request(server)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .send(text);

    expect(401);
  });

  test("should return 402 if words per day limit exceeded", async () => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const token = "testToken";
    // Set the wordsProcessed for the token to the limit
    server.locals.wordsProcessedMap.set(
      token,
      server.locals.WORDS_PER_DAY_LIMIT
    );
    const response = await request(server)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .send(text);

    expect(402);
  });
});

describe("POST /", () => {
  it("should return 400 if no email is provided", async () => {
    const response = await request(server).post("/").send({});
    expect(400);
  });

  it("should return 200 if email is provided", async () => {
    const response = await request(server)
      .post("/")
      .send({ email: "test@example.com" });
    expect(200);
  });
});
