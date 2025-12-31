import axios from 'axios'
import { MenuItem, Reserva } from '../types'

const API_URL = '/api'

export const menuAPI = {
  getAll: () => axios.get<MenuItem[]>(`${API_URL}/menu`),
  getById: (id: string) => axios.get<MenuItem>(`${API_URL}/menu/${id}`),
  getByCategoria: (categoria: string) => axios.get<MenuItem[]>(`${API_URL}/menu/categoria/${categoria}`)
}

export const reservasAPI = {
  getAll: () => axios.get<Reserva[]>(`${API_URL}/reservas`),
  getById: (id: string) => axios.get<Reserva>(`${API_URL}/reservas/${id}`),
  create: (reserva: Omit<Reserva, 'id' | 'estado' | 'createdAt' | 'updatedAt'>) =>
    axios.post<Reserva>(`${API_URL}/reservas`, reserva),
  update: (id: string, reserva: Partial<Reserva>) =>
    axios.put<Reserva>(`${API_URL}/reservas/${id}`, reserva),
  delete: (id: string) => axios.delete(`${API_URL}/reservas/${id}`)
}
