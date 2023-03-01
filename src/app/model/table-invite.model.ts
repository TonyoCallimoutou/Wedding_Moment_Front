interface TableInvite {
  eventId: number,
  planTableId: number,
  inviteId?: number,
  tableName: string,
  inviteName?: string
}

interface PlanTable {
  eventId: number,
  planTableId?: number,
  tableName: string,
}

interface Invite {
  inviteId?: number,
  eventId: number,
  planTableId: number,
  inviteName: string,
}

