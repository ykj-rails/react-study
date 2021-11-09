// ログイン処理を捌くだけの簡単なサーバー

const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const SECRET_KEY = 'SHHH!'
const PORT = process.env.PORT || 3000

// お遊びで書いてみただけ
app.get('/user', (req, res) => {
  return res.json({
    status: 200,
    data: [
      {
        name: 'yukiji',
        age: 32,
      },
    ],
  })
})

app.post('/login', (req, res) => {
  const data = req.body
  if (data.username !== 'admin' || data.password !== 'admin') {
    return res.status(422).send({
      status: 422,
      error: 'Invalid username/password',
    })
  }

  // jwtトークン発行
  const token = jwt.sign(data, SECRET_KEY)
  console.log(token)

  return res.json({
    status: 200,
    data: { token },
  })
})

app.listen(PORT, () => console.log(`server started! listen: ${PORT}`))
