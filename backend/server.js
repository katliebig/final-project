import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cloudinaryFramework from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import listEndpoints from 'express-list-endpoints'

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

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error })
  }
}

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.post('/users', async (req, res) => {
  const { username, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt)
    }).save()

    res.json({
      success: true,
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken
    })
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error })
  }
})

app.post('/sessions', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userID: user._id,
        username: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    res.status(404).json({ success: false, message: 'Invalid request', error: error })
  }
})

app.get('/human', async (req, res) => {
  // TODO: make into race endpoint using params
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
    res.status(400).json({ message: "Something went wrong", error })
  }
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
