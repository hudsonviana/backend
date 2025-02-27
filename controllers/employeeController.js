import { query } from '../utils/connectToDB.js'
import {
  createEmployeeTableQuery,
  createRoleQuery,
  getAllEmployeeQuery,
  createEmployeeQuery,
  getEmployeeQuery,
  deleteEmployeeQuery,
  updateEmployeeQuery,
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

export async function getEmployee(req, res, next) {
  try {
    const { id } = req.params

    const data = await query(getEmployeeQuery, [id])

    if (!data.rows.length) {
      return next(createError(404, 'Empregado não encontrado'))
    }

    return res.json(data.rows[0])
  } catch (error) {
    return next(createError(500, error.message))
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    const { id } = req.params

    const data = await query(deleteEmployeeQuery, [id])

    if (!data.rowCount) {
      return next(createError(404, 'Empregado não encontrado'))
    }

    return res.json({ message: 'Empregado deletado com sucesso' })
  } catch (error) {
    return next(createError(500, error.message))
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const { id } = req.params
    const { name, email, age, role, salary } = req.body

    const result = await query(updateEmployeeQuery, [
      name,
      email,
      age,
      role,
      salary,
      id,
    ])

    if (result.rowCount === 0) {
      return next(createError(404, 'Empregado não encontrado'))
    }

    res.json(result.rows[0])
  } catch (error) {
    return next(createError(500, error.message))
  }
}
