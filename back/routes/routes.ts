import { Router, Request, Response } from "express";
import { db } from "../db/db";

export const router: Router = Router();

router.get("/list", async (req: Request, res: Response) => {
    try {
        const tasks = await db.task.findMany();
        console.log(tasks); 
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao listar tarefas");
    }
});

router.post("/list", async (req: Request, res: Response) => {
    const { title, task } = req.body;

    if (!title || !task) {
        res.status(400).send("Dados incompletos");
        return;  
    }

    try {
       await db.task.create({
            data: {
                title, 
                task
            }
        });
        res.status(201).redirect("list"); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao adicionar tarefa");
    }
});

router.post("/delete",async(req:Request, res:Response)=>{
    const { title, task } = req.body;

    if (!title || !task) {
        res.status(400).send("Dados incompletos");
        return;  
    }
    try{
        await db.task.deleteMany({
            where:{
                title:title, task:task
            }
        }); 
        res.status(201).redirect("list"); 

    }catch(error){
        console.error(error);
        res.status(500).send("Erro de deletar a tarefa");
    }
})