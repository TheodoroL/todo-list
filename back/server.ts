import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import { router } from './routes/routes';
dotenv.config(); 
const server = express(); 
server.use(cors({
    origin:"*"
})); 
server.use(express.json()); 
server.use(router); 
server.listen(process.env.PORT, ()=>{
    console.log("server run "); 
})