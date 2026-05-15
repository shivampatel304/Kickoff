import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
    res.json({message: "Auth API is running"});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})