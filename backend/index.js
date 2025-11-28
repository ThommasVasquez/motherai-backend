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

// 🔹 1. Configuración CORS para Vercel + local
const allowedOrigins = [
    "http://localhost:5173",              // dev
    "https://yx-ai-platform.vercel.app",  // producción en Vercel
];

const corsOptions = {
    origin: function (origin, callback) {
        // Algunas peticiones (como Postman) no traen origin -> se permiten
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // importante si usas cookies / sesión
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

// 🔹 2. Primero CORS (incluido preflight)
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // maneja OPTIONS para todas las rutas

// 🔹 3. Luego body parser y sesión
app.use(json());
app.use(
    session({
        secret: process.env.SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false, // si luego pones true en producción, recuerda configurar trust proxy
            maxAge: 24 * 60 * 60 * 10000,
        },
    })
);

// 🔹 4. Tus rutas
app.use("/users", router);
app.use("/website", websiteRouter);
app.use("/orchestration", orchestrationRouter);
app.use("/copywriting", copyWritingRouter);
app.use("/seo", seoRouter);
app.use("/video", videoRouter);
app.use("/transcribe", transcribeRouter);
app.use("/motherAI", motherAiRouter);
app.use("/image", imageRouter);
app.use("/convo", convoRouter);
app.use("/automation", automationRouter);
app.use("/auth", googleRouter);
app.use("/payment", paymentRouter);
app.use("/scrap", scrapperRouter);
app.use("/df", deepFakeRouter);

app.get("/test", (req, res) => {
    res.status(200).send("<h1> Hello  Here!!!! </h1>");
});

app.listen(process.env.PORT, () => {
    console.log("Server is running...");
});
