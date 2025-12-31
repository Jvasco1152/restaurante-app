import { Router } from 'express'
import {
  getAllMenuItems,
  getMenuItemById,
  getMenuItemsByCategoria,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menu.controller'

const router = Router()

router.get('/', getAllMenuItems)
router.get('/:id', getMenuItemById)
router.get('/categoria/:categoria', getMenuItemsByCategoria)
router.post('/', createMenuItem)
router.put('/:id', updateMenuItem)
router.delete('/:id', deleteMenuItem)

export default router
