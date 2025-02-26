import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import employeeRoutes from './routes/employee.js'

dotenv.config()

const app = express()
const PORT = 3000

const corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/api/employee', employeeRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Erro interno do servidor'
  return res.status(statusCode).json({ error: message })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`))
