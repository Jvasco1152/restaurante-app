import { Request, Response } from 'express'
import prisma from '../config/prisma'
import { EstadoReserva } from '@prisma/client'

export const getAllReservas = async (req: Request, res: Response) => {
  try {
    const reservas = await prisma.reserva.findMany({
      orderBy: [
        { fecha: 'desc' },
        { hora: 'desc' }
      ]
    })
    res.json(reservas)
  } catch (error) {
    console.error('Error al obtener reservas:', error)
    res.status(500).json({ message: 'Error al obtener reservas', error })
  }
}

export const getReservaById = async (req: Request, res: Response) => {
  try {
    const reserva = await prisma.reserva.findUnique({
      where: { id: req.params.id }
    })

    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' })
    }

    res.json(reserva)
  } catch (error) {
    console.error('Error al obtener reserva:', error)
    res.status(500).json({ message: 'Error al obtener reserva', error })
  }
}

export const createReserva = async (req: Request, res: Response) => {
  try {
    const { fecha, ...rest } = req.body

    const newReserva = await prisma.reserva.create({
      data: {
        ...rest,
        fecha: new Date(fecha)
      }
    })

    res.status(201).json(newReserva)
  } catch (error) {
    console.error('Error al crear reserva:', error)
    res.status(400).json({ message: 'Error al crear reserva', error })
  }
}

export const updateReserva = async (req: Request, res: Response) => {
  try {
    const { fecha, estado, ...rest } = req.body

    const data: any = { ...rest }

    if (fecha) {
      data.fecha = new Date(fecha)
    }

    if (estado) {
      data.estado = estado.toUpperCase() as EstadoReserva
    }

    const updatedReserva = await prisma.reserva.update({
      where: { id: req.params.id },
      data
    })

    res.json(updatedReserva)
  } catch (error) {
    console.error('Error al actualizar reserva:', error)
    res.status(400).json({ message: 'Error al actualizar reserva', error })
  }
}

export const deleteReserva = async (req: Request, res: Response) => {
  try {
    await prisma.reserva.delete({
      where: { id: req.params.id }
    })

    res.json({ message: 'Reserva eliminada exitosamente' })
  } catch (error) {
    console.error('Error al eliminar reserva:', error)
    res.status(500).json({ message: 'Error al eliminar reserva', error })
  }
}
