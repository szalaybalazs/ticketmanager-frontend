export type status = 'TODO' | 'INPROGRESS' | 'COMPLETED'

export interface iTicket {
  title: string
  id: string
  status: status | null
}