import { query } from '../utils/connectToDB.js'

export async function getAllEmployee(req, res, next) {
  try {
    const response = await query(`
      SELECT to_regclass('employee_details');
    `)
    console.log(response)
    res.send('OK')
  } catch (error) {}
}

// https://www.youtube.com/watch?v=mk5EIPu21y0
// PAREI COM 25min

export async function getEmployee(req, res) {}
export async function deleteEmployee(req, res) {}
export async function updateEmployee(req, res) {}
export async function createEmployee(req, res) {}
