const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type",
}));
app.use(bodyParser.json());

const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};

app.listen(5500, () => {
  console.log("Server running at http://localhost:5500");
});

app.post("/addEvent", async (req, res) => {
    try{
        const { date, title, description } = req.body;
        await prisma.$connect;
        const newEvent = await prisma.event.create({
            data: {
                date: new Date(date),
                title: title,
                description: description,
            },
        });
        res.status(201).json({ message: "Event added successfully!", event: newEvent });
    }
    catch(error){
        console.error("Error adding event:", error);
        res.status(500).json({ error: "Failed to add event" });
    } finally {
        await prisma.$disconnect();
    }
});
app.delete("/delete-event",async(req,res)=>{
    try{
        const { id,title } = req.body;
        await prisma.$connect;
        const deletedEvent = await prisma.event.deleteMany({
            where: {
                id: parseInt(id),
                title: title,
            },
        });
        if(deletedEvent.count === 0){
            res.status(404).json({ message: "Event not found or title does not match" });
        }else {
            res.status(200).json({ message: "Event deleted successfully!" });
        }
    } catch(error){
        console.error("Error deleting event:", error);
        res.status(500).json({ error: "Failed to delete event" });
    } finally {
        await prisma.$disconnect();
    }
});
app.get("/getEvents", async (req, res) => {
    try{
        await prisma.$connect;
        const events = await prisma.event.findMany();
            res.status(200).json(events);
        }  catch(error){
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "Failed to fetch events" });
        } finally {
            await prisma.$disconnect();
        }
    });
