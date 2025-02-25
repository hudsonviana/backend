import { Router } from 'express'
import * as employeeController from '../controllers/employeeController.js'

const router = Router()

router.get('/', employeeController.getAllEmployee)
router.post('/', employeeController.createEmployee)
router.get('/:id', employeeController.getEmployee)
router.delete('/:id', employeeController.deleteEmployee)
router.put('/:id', employeeController.updateEmployee)

export default router
