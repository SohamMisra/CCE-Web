const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // Add this line
const multer = require('multer');

require("dotenv").config();

const app = express();
app.use(cors());
/*app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type",
}));*/
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

//const http = require("http");
const { neon } = require("@neondatabase/serverless");
const { log } = require("console");

try {
    const sql = neon(process.env.DATABASE_URL);
    console.log('DB connection');
    
} catch (error) {
    throw new Error('DB conn failed')
}


/*const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};*/
// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'images'))
    },
    filename: function (req, file, cb) {
        // Use event date for the filename
        /*const eventDate = new Date(req.body.date);
        const formattedDate = eventDate.toISOString().split('T')[0];
        const sanitizedTitle = req.body.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        cb(null, `${formattedDate}_${sanitizedTitle}${path.extname(file.originalname)}`)
    */
    // Use only the sanitized title for the filename
    const sanitizedTitle = req.body.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    cb(null, `${sanitizedTitle}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

/*app.listen(5500, () => {
  console.log("Server running at http://localhost:5500");
});
*/
app.post("/addEvent", upload.single('poster'),  async (req, res) => {
    try{
        console.log(req.body);
        const { date, title, description } = req.body;
        console.log('Received event data:', { date, title, description }); // Debug log

        await prisma.$connect();
        const newEvent = await prisma.event.create({
            data: {
                date: new Date(date),
                title: title,
                description: description
            },
        });
        console.log('Created event:', newEvent); // Debug log

        res.status(201).json({ message: "Event added successfully!", event: newEvent });
    }
    catch(error){
        console.error("Error adding event:", error);
        res.status(500).json({ error: "Failed to add event" });
    } finally {
        await prisma.$disconnect();
    }
});
app.delete("/deleteEvent",async(req,res)=>{
    try{
        const { title } = req.body;
        await prisma.$connect();
        const deletedEvent = await prisma.event.deleteMany({
            where: {
                //id: parseInt(id),
                title: title,
            },
        });
        if(deletedEvent.count === 0){
            res.status(404).json({ message: "Event not found" });
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
    try {
        await prisma.$connect();
        const isUpcoming = req.query["isUpcoming"]
        if (isUpcoming) {
            const events = await prisma.event.findMany({
                where: {
                    date: {
                        gte: new Date()
                    },
                },
                orderBy: {
                    date: 'asc'
                }
            });
            res.status(200).json(events);
        } else {
        const events = await prisma.event.findMany({
            orderBy: {
                date: 'asc'
            }
        });
        res.status(200).json(events);
    }
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    } finally {
        await prisma.$disconnect();
    }
});
/*app.get("/events/upcoming", async (req, res) => {
    try{
        await prisma.$connect();
        const events = await prisma.event.findMany();
            res.status(200).json(events);
        }  catch(error){
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "Failed to fetch events" });
        } finally {
            await prisma.$disconnect();
        }
    });*/
// New routes for previous and upcoming events
/*app.get('/events/previous', async (req, res) => {
    try {
        await prisma.$connect();
        const previousEvents = await prisma.event.findMany({
            where: {
                date: {
                    lt: new Date()
                }
            },
            orderBy: {
                date: 'desc'
            }
        });
        res.json(previousEvents);
    } catch (error) {
        console.error("Error fetching previous events:", error);
        res.status(500).json({ error: "Failed to fetch previous events" });
    } finally {
        await prisma.$disconnect();
    }
});

app.get('/events/upcoming', async (req, res) => {
    try {
        await prisma.$connect();
        const upcomingEvents = await prisma.event.findMany({
            where: {
                date: {
                    gte: new Date()
                }
            },
            orderBy: {
                date: 'asc'
            }
        });
        res.json(upcomingEvents);
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res.status(500).json({ error: "Failed to fetch upcoming events" });
    } finally {
        await prisma.$disconnect();
    }
});*/


/*app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/

// ...existing code...
const PORT = process.env.PORT || 5500;

const startServer = (port) => {
    const server = app.listen(port)
        .on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${port} is busy, trying ${port + 1}`);
                startServer(port + 1);
            } else {
                console.error('Server error:', err);
            }
        })
        .on('listening', () => {
            const addr = server.address();
            console.log(`Server running at http://localhost:${addr.port}`);
        });
};
startServer(PORT);
