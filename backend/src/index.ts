import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from "./routes/auth.routes";

dotenv.config();

const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];

for(const envVar of requiredEnvVars){
    if(!process.env[envVar]){
        console.error(`Missing required environment variable: ${envVar}`)
        process.exit(1);
    }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
    res.json({message: "Auth API is running"});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})