const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(cors())




app.listen(PORT, () => console.log(`Server is running on ${PORT}`))