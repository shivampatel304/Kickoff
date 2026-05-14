import express,  {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({connectionString: process.env.DATABASE_URL})

app.get('/api/health', async (_req: Request, res: Response) => {
    const  result = await pool.query('SELECT NOW()');
    res.json({ok: true, time: result.rows[0].now})
});

const port = process.env.PORT || 3001;
app.listen(port,  () => console.log(`API listening on : ${port}`));