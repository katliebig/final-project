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

  const mouths = await cloudinary.search
    .expression('tags=mouth')
    .execute()

  const noses = await cloudinary.search
    .expression('tags=nose')
    .execute()

  const heads = await cloudinary.search
    .expression('tags=head')
    .execute()

  const clothes = await cloudinary.search
    .expression('tags=clothes')
    .execute()

  const ears = await cloudinary.search
    .expression('tags=ears')
    .execute()

  const eyebrows = await cloudinary.search
    .expression('tags=eyebrows')
    .execute()

  const eyes = await cloudinary.search
    .expression('tags=eyes')
    .execute()

  const hairstyles = await cloudinary.search
    .expression('tags=hair')
    .execute()

  const urlsMouth = []
  const urlsNoses = []
  const urlsClothes = []
  const urlsHeads = []
  const urlsEars = []
  const urlsEyebrows = []
  const urlsEyes = []
  const urlsHairstyle = []

  for (let resource of mouths.resources) {
    urlsMouth.push(resource.secure_url)
  }
  for (let resource of noses.resources) {
    urlsNoses.push(resource.secure_url)
  }
  for (let resource of heads.resources) {
    urlsHeads.push(resource.secure_url)
  }
  for (let resource of clothes.resources) {
    urlsClothes.push(resource.secure_url)
  }
  for (let resource of ears.resources) {
    urlsEars.push(resource.secure_url)
  }
  for (let resource of eyebrows.resources) {
    urlsEyebrows.push(resource.secure_url)
  }
  for (let resource of eyes.resources) {
    urlsEyes.push(resource.secure_url)
  }
  for (let resource of hairstyles.resources) {
    urlsHairstyle.push(resource.secure_url)
  }

  res.json({
    mouths: urlsMouth,
    noses: urlsNoses,
    heads: urlsHeads,
    clothes: urlsClothes,
    ears: urlsEars,
    eyebrows: urlsEyebrows,
    eyes: urlsEyes,
    hairstyles: urlsHairstyle,
  })
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
