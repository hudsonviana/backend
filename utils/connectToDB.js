import pg from 'pg'
import 'dotenv/config'

const requiredEnvVars = [
  'PG_USER',
  'PG_HOST',
  'PG_DATABASE',
  'PG_PORT',
  'PG_PASSWORD',
]

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.log(`Faltando variável obrigatória: ${varName}`)
    process.exit(1)
  }
})

const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

db.connect()
  .then(() => console.log('Conectado com o banco de dados com sucesso!'))
  .catch((err) => {
    console.log(`Não foi possível conectar com o banco de dados`, err)
    process.exit(1)
  })

export const query = (text, params) => db.query(text, params)
