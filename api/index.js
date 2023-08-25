import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import adminRoute from "./routes/admins.js"
import userRoute from "./routes/users.js"
import annsRoute from "./routes/elonlar.js"
import lentaRoute from "./routes/lentas.js"
import advsRoute from "./routes/advs.js"
import classRoute from "./routes/classmates.js"
import commentRoute from "./routes/comments.js"
import authRoute from "./routes/auth.js"
import multer from "multer"
import path from "path"
const app = express()

// connection with database
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser : true,
  useUnifiedTopology:true,
}).then(console.log("Connected to backend")).catch(err => console.log(err))

// middlewares
app.use(cors({
  credentials:true,
  origin:"https://class11a.netlify.app"
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.static("uploads"))
cookieParser()

// upload
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./uploads")
  },
  filename:(req,file,cb)=>{
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res)=>{
  const file = req.file;
  res.status(200).json(file?.filename)
})

// routes
app.use("/api/admin",adminRoute)
app.use("/api/user",userRoute)
app.use("/api/announcement", annsRoute)
app.use("/api/lenta", lentaRoute)
app.use("/api/advertisement", advsRoute)
app.use("/api/classmate", classRoute)
app.use("/api/comment", commentRoute)
app.use("/api/auth", authRoute)



app.listen(8800,()=>{
  console.log("Server is listening on port 8800");
})