import express from 'express'
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

app.get('/human', async (req, res) => {
  try {

    const human = await cloudinary.search
      .expression("tags=human")
      .execute()

    const urlsMouth = []
    const urlsNose = []
    const urlsClothes = []
    const urlsHead = []
    const urlsEars = []
    const urlsEyebrows = []
    const urlsEyes = []
    const urlsHair = []

    for (let resource of human.resources) {
      if (resource.filename.includes("hair")) {
        urlsHair.push(resource.secure_url)
      } else if (resource.filename.includes("eyebrows")) {
        urlsEyebrows.push(resource.secure_url)
      } else if (resource.filename.includes("eyes")) {
        urlsEyes.push(resource.secure_url)
      } else if (resource.filename.includes("ears")) {
        urlsEars.push(resource.secure_url)
      } else if (resource.filename.includes("nose")) {
        urlsNose.push(resource.secure_url)
      } else if (resource.filename.includes("mouth")) {
        urlsMouth.push(resource.secure_url)
      } else if (resource.filename.includes("head")) {
        urlsHead.push(resource.secure_url)
      } else if (resource.filename.includes("clothes")) {
        urlsClothes.push(resource.secure_url)
      }
    }

    res.json({
      mouth: urlsMouth,
      nose: urlsNose,
      head: urlsHead,
      clothes: urlsClothes,
      ears: urlsEars,
      eyebrows: urlsEyebrows,
      eyes: urlsEyes,
      hair: urlsHair,
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
