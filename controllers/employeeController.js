import { query } from '../utils/connectToDB.js'
import {
  createEmployeeTableQuery,
  createRoleQuery,
  getAllEmployeeQuery,
  createEmployeeQuery,
} from '../utils/sqlQuery.js'
import { createError } from '../utils/error.js'

export async function getAllEmployee(req, res, next) {
  try {
    const response = await query(`SELECT to_regclass('employee_details');`)
    console.log(response)
    if (!response.rows[0].to_regclass) {
      await query(createRoleQuery)
      await query(createEmployeeTableQuery)
    }

    const { rows } = await query(getAllEmployeeQuery)

    res.status(200).json(rows)
  } catch (error) {
    return next(
      createError(400, 'Não foi possível obter detalhes de empregados')
    )
  }
}

export async function createEmployee(req, res, next) {
  try {
    const { name, email, age, role, salary } = req.body
    if (!name || !email || !age || !salary) {
      return res.status(400).json({ error: 'Faltando campos obrigatórios' })
    }
    const data = await query(createEmployeeQuery, [
      name,
      email,
      age,
      role,
      salary,
    ])
    res.status(201).json(data.rows[0])
  } catch (error) {
    return next(createError(400, error.message))
  }
}

// https://www.youtube.com/watch?v=mk5EIPu21y0
// PAREI EM 43:20

export async function getEmployee(req, res) {}
export async function deleteEmployee(req, res) {}
export async function updateEmployee(req, res) {}
