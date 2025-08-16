import { Server } from "http"
import mongoose from "mongoose"
import app from "./app"
import { enVariables } from "./app/config/env.config"

let server: Server
const startServer = async () => {
    try {
        await mongoose.connect(enVariables.DB_URI)
        console.log("Server Connected to MongoDB!")
        server = app.listen(enVariables.PORT, () => {
            console.log(`Server is running on port http://localhost:${enVariables.PORT}`)
        })
    } catch (error) {
        console.log("An error occurred during Server start: ", error)
    }
}
startServer()