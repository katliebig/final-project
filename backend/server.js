import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2"
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
    maxLength: 16
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

const CharacterSchema = new mongoose.Schema({
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    default: ""
  },
  race: {
    type: String,
    default: ""
  },
  profession: {
    type: String,
    default: ""
  },
  background: {
    type: String,
    default: ""
  },
  other: {
    type: String,
    default: ""
  },
  stats: {
    type: Object,
    default: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    }
  }
})

CharacterSchema.plugin(mongoosePaginate)

const Character = mongoose.model('Character', CharacterSchema)

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

var corsOptions = {
  origin: ["http://localhost:3000", "https://character-creator.netlify.app"]
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})


// creates a new user
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

// allows the user to log in
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

// create a new race with attributes
// should be commented out unless a race should be added or updated
app.post("/races", async (req, res) => {
  const { race, attributes } = req.body
  try {
    const newRace = await new Race({ race, attributes }).save()
    res.json(newRace)
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error })
  }
})


// gets race by param, loops over attributes to find matching images 
// from cloudinary, sends urls
app.get('/races/:race', async (req, res) => {
  const { race } = req.params

  try {
    const chosenRace = await Race.findOne({ race }).lean()

    const chosenRaceResults = await cloudinary.search
      .expression(`tags=${race}`)
      .max_results(100)
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
    res.json({ success: true, urls, attributes: chosenRace.attributes })

  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong", error })
  }
})


// get all characters by race (if queried), sort by newest
app.get("/characters", async (req, res) => {
  const { race, page } = req.query
  let characters
  let perPage = 12

  const options = {
    sort: { createdAt: -1 },
    populate: "user",
    lean: true,
    offset: perPage * +page,
    limit: perPage
  }

  if (race !== "") {
    characters = await Character.paginate({ race: race }, options)
  } else {
    characters = await Character.paginate({}, options)
  }
  res.json({ success: true, characters })
})


// creates a new character
app.post("/characters", authenticateUser)
app.post("/characters", async (req, res) => {
  const { _id } = req.user
  const { image, race } = req.body

  try {
    const user = await User.findById(_id)
    await new Character({ image, user, race }).save()
    res.json({ success: true, message: "Character saved successfully" })
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong", error })
  }
})

// get all characters created by one user, sort by newest
app.get("/characters/users/:id", authenticateUser)
app.get("/characters/users/:id", async (req, res) => {
  const { id } = req.params

  try {
    const characters = await Character.find({ user: id }).sort({ createdAt: "desc" }).lean()
    if (characters) {
      res.json({ success: true, characters })
    } else {
      res.status(404).json({ success: false, message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong", error })
  }
})

// get one character by id, for character sheet
app.get("/characters/:id", authenticateUser)
app.get("/characters/:id", async (req, res) => {
  const { id } = req.params
  try {
    const character = await Character.findById(id).lean()
    if (character) {
      res.json({ success: true, character })
    } else {
      res.status(404).json({ success: false, message: 'Character not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

// finds and deletes one character by id
app.delete("/characters/:id", authenticateUser)
app.delete('/characters/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deletedCharacter = await Character.deleteOne({ _id: id })
    if (deletedCharacter) {
      res.json({ success: true, message: "Character deleted" })
    } else {
      res.status(404).json({ success: false, message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
});


// updates one character by id, for character sheet
app.patch("/characters/:id", authenticateUser)
app.patch("/characters/:id", async (req, res) => {
  const { id } = req.params
  const { name, profession, background, other, stats } = req.body

  try {
    const updatedCharacter = await Character.findByIdAndUpdate(id, {
      $set: {
        name,
        profession,
        background,
        other,
        stats
      }
    }, { new: true })
    res.json({ success: true, updatedCharacter })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
