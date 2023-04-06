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

  return res.json({
    status: 200,
    data: { token },
  })
})

// token認証用api作ったお
app.post('/auth', (req, res) => {
  const authHeader = req.headers['authorization']
  // headersにauthorizationがセットされているかチェック
  if (authHeader === undefined)
    return res.json({ error: 'ヘッダーエラーだよー' })
  //Bearerが正しく定義されているか
  if (authHeader.split(' ')[0] !== 'Bearer')
    return res.json({ error: 'ヘッダーのフォーマットエラーだよー' })
  try {
    const token = jwt.verify(authHeader.split(' ')[1], SECRET_KEY)
    // username token チェック
    if (token.username === 'admin' && token.password === 'admin') {
      return res.json({
        status: 200,
      })
    } else {
      res.json({ error: '認証エラーだよー' })
    }
  } catch (e) {
    //tokenエラー
    res.json({ error: e.message })
  }
})

app.listen(PORT, () => console.log(`server started! listen: ${PORT}`))
