import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { router } from "./app/routes"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())


// basic logger
app.use((req, res, next) => {
  console.log('Incoming Request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });
  next();
});


app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Server!"
    })
})

export default app