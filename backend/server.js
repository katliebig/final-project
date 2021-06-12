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
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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
    unique: true,
    minLength: 4,
    maxLength: 20
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const Character = mongoose.model('Character', {
  image: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Race = mongoose.model("Race", {
  race: {
    type: String,
    required: true,
    unique: true
  },
  attributes: {
    type: Array,
    required: true
  }
})

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      req.user = user
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
app.use(express.json({ limit: '50mb' }))

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
      id: newUser._id,
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
        id: user._id,
        username: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'Username and/or password do not match.' })
    }
  } catch (error) {
    res.status(404).json({ success: false, message: 'Invalid request', error: error })
  }
})

app.post("/races", async (req, res) => {
  const { race, attributes } = req.body
  try {
    const newRace = await new Race({ race, attributes }).save()
    res.json(newRace)
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error })
  }
})

app.get("/races/:race", authenticateUser)
app.get('/races/:race', async (req, res) => {
  const { race } = req.params

  try {
    const chosenRace = await Race.findOne({ race })

    const chosenRaceResults = await cloudinary.search
      .expression(`tags=${race}`)
      .execute()

    const urls = {}

    for (const resource of chosenRaceResults.resources) {
      for (const attribute of chosenRace.attributes) {
        if (resource.filename.includes(attribute)) {
          if (!urls[attribute]) {
            urls[attribute] = [resource.secure_url]
          } else {
            urls[attribute] = [...urls[attribute], resource.secure_url]
          }
        }
      }
    }

    res.json({ urls, attributes: chosenRace.attributes })

  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error })
  }
})

app.get("/characters", async (req, res) => {
  const characters = await Character.find().populate("user", "username")
  res.json(characters)
})

app.post("/characters", authenticateUser)
app.post("/characters", async (req, res) => {
  const { _id } = req.user
  const { image } = req.body

  try {
    const user = await User.findById(_id)
    await new Character({ image, user }).save()
    res.json({ message: "Character saved successfully" })
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error })
  }
})

app.get("/characters/users/:id", authenticateUser)
app.get("/characters/users/:id", async (req, res) => {
  const { id } = req.params

  try {
    const characters = await Character.find({ user: id })
    if (characters) {
      res.json(characters)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error })
  }
})

app.delete("/characters/users/:id", authenticateUser)
app.delete('/characters/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCharacter = await Character.deleteOne({ _id: id });
    if (deletedCharacter) {
      res.json({ message: "Character deleted" });
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
