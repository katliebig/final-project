import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cloudinaryFramework from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/character-creator"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
  cloud_name: 'character-creator',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'human',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
})
const parser = multer({ storage })


const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/human', parser.single('image'), async (req, res) => {
  res.send(cloudinary.url("hair2_n92fbb.png", { width: 100, height: 150, crop: "fill" }))
})

app.get('/hair', parser.single('image'), async (req, res) => {
  res.send(
    cloudinary.search // TODO: fix, error about missing api_key
      .expression('tags=hair')
      .execute()
  )
})



app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
