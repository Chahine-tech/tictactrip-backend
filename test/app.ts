import request from "supertest";
import server from "../server";

describe("POST /api/justify", () => {
  test("should return justified text", async () => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const token = "testToken";
    const response = await request(server)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .send(text);

    expect(response.status).toBe(200);
    expect(response.text).toMatch(
      /Lorem ipsum dolor sit amet,\s+consectetur adipiscing elit\./
    );
  });

  test("should return 401 if invalid token provided", async () => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const token = "";
    const response = await request(server)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .send(text);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Invalid token" });
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

    expect(response.status).toBe(402);
    expect(response.body).toEqual({ error: "Payment required" });
  });
});
