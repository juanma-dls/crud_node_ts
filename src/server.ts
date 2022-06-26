import "express-async-errors";
import express, { Request, Response, NextFunction, response } from "express";
import * as dotenv from "dotenv";
import path from "path";
import "./database";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true}))


app.use(express.static(path.join(__dirname, "..", "public")));
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");

// Starting the server
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message,
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
});

app.listen(PORT, () => {
    console.info(`Iniciando servidor en puerto ${PORT}`)
});

