const request = require("supertest");
const app = require("./index");

describe("API Horoscope", () => {
    it("GET /signs devrait renvoyer la liste des signes", async () => {
        const response = await request(app).get("/signs");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toContain("Bélier");
    });

    it("POST /sign avec une date valide devrait renvoyer le signe correct", async () => {
        const response = await request(app)
            .post("/sign")
            .send({ date: "1992-04-25" });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ sign: "Taureau" });
    });

    it("POST /sign avec une date invalide devrait renvoyer une erreur", async () => {
        const response = await request(app)
            .post("/sign")
            .send({ date: "date-invalide" });
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error", "Date invalide. Format attendu: YYYY-MM-DD");
    });

    it("POST /sign sans date devrait renvoyer une erreur", async () => {
        const response = await request(app)
            .post("/sign")
            .send({});
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error", "Le champ 'date' est requis");
    });
});
