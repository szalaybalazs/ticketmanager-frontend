export type status = 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'COMPLETED'

export interface iTicket {
  title: string
  id: string
  index: number
  status: status | null
}