const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const SIGNS = [
    "Bélier",
    "Taureau",
    "Gémeaux",
    "Cancer",
    "Lion",
    "Vierge",
    "Balance",
    "Scorpion",
    "Sagittaire",
    "Capricorne",
    "Verseau",
    "Poissons"
];

// Route GET /signs
app.get("/signs", (req, res) => {
    res.json(SIGNS);
});

// Route POST /sign
app.post("/sign", (req, res) => {
    const { date } = req.body;

    if (!date) {
        return res.status(400).json({ error: "Le champ 'date' est requis" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Date invalide. Format attendu: YYYY-MM-DD" });
    }

    const month = parsedDate.getUTCMonth() + 1;
    const day = parsedDate.getUTCDate();

    let sign = "";

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        sign = "Bélier";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        sign = "Taureau";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        sign = "Gémeaux";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
        sign = "Cancer";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        sign = "Lion";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        sign = "Vierge";
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
        sign = "Balance";
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
        sign = "Scorpion";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        sign = "Sagittaire";
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        sign = "Capricorne";
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        sign = "Verseau";
    } else {
        sign = "Poissons";
    }

    res.json({ sign });
});

app.get("/", (req, res) => {
    res.send("Horoscope API - Essayez GET /signs et POST /sign");
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Horoscope API listening at http://localhost:${port}`);
    });
}

module.exports = app;
