const { json } = require("express");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { router } = require("./routes/index");
const { websiteRouter } = require("./routes/websiteRoutes");
const { orchestrationRouter } = require("./routes/orchestartionRoutes");
const { copyWritingRouter } = require("./routes/copywritingRoutes");
const { seoRouter } = require("./routes/seoRouter");
const { videoRouter } = require("./routes/videoRoutes");
const { transcribeRouter } = require("./routes/transcribeRoutes");
const { motherAiRouter } = require("./routes/motherAIRoutes");
const { imageRouter } = require("./routes/imageRoutes");
const { convoRouter } = require("./routes/conversationRoutes");
const { automationRouter } = require("./routes/automationRouter");
const { googleRouter } = require("./routes/googleRoutes");
const { paymentRouter } = require("./routes/paymentRouter");
const { scrapperRouter } = require("./routes/scrapperRoutes");
const { deepFakeRouter } = require("./routes/deepFake");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// 🔹 CORS bien configurado para local + Vercel
const allowedOrigins = [
    "http://localhost:5173",
    "https://yx-ai-platform.vercel.app",
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight

app.use(json());
app.use(
    session({
        secret: process.env.SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 10000,
        },
    })
);

// tus app.use("/users", router) y demás rutas igual que ya tenías
