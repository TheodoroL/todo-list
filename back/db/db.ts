import { PrismaClient } from "@prisma/client"
export const db  = new PrismaClient(); 
async function shutdown() {
    await db.$disconnect();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);