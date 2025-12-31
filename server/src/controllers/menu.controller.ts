import { Request, Response } from 'express'
import prisma from '../config/prisma'
import { Categoria } from '@prisma/client'

export const getAllMenuItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: [
        { categoria: 'asc' },
        { nombre: 'asc' }
      ]
    })
    res.json(items)
  } catch (error) {
    console.error('Error al obtener items del menú:', error)
    res.status(500).json({ message: 'Error al obtener items del menú', error })
  }
}

export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const item = await prisma.menuItem.findUnique({
      where: { id: req.params.id }
    })

    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' })
    }

    res.json(item)
  } catch (error) {
    console.error('Error al obtener item:', error)
    res.status(500).json({ message: 'Error al obtener item', error })
  }
}

export const getMenuItemsByCategoria = async (req: Request, res: Response) => {
  try {
    const categoria = req.params.categoria.toUpperCase() as Categoria

    const items = await prisma.menuItem.findMany({
      where: { categoria },
      orderBy: { nombre: 'asc' }
    })

    res.json(items)
  } catch (error) {
    console.error('Error al obtener items por categoría:', error)
    res.status(500).json({ message: 'Error al obtener items por categoría', error })
  }
}

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const data = {
      ...req.body,
      categoria: req.body.categoria?.toUpperCase()
    }

    const newItem = await prisma.menuItem.create({
      data
    })

    res.status(201).json(newItem)
  } catch (error) {
    console.error('Error al crear item:', error)
    res.status(400).json({ message: 'Error al crear item', error })
  }
}

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const data = req.body.categoria
      ? { ...req.body, categoria: req.body.categoria.toUpperCase() }
      : req.body

    const updatedItem = await prisma.menuItem.update({
      where: { id: req.params.id },
      data
    })

    res.json(updatedItem)
  } catch (error) {
    console.error('Error al actualizar item:', error)
    res.status(400).json({ message: 'Error al actualizar item', error })
  }
}

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    await prisma.menuItem.delete({
      where: { id: req.params.id }
    })

    res.json({ message: 'Item eliminado exitosamente' })
  } catch (error) {
    console.error('Error al eliminar item:', error)
    res.status(500).json({ message: 'Error al eliminar item', error })
  }
}
