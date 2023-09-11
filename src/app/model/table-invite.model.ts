export interface TableInvite {
  eventId: number,
  planTableId: number,
  inviteId?: number,
  tableName: string,
  inviteName?: string
}

export interface PlanTable {
  eventId: number,
  planTableId?: number,
  tableName: string,
}

export interface Invite {
  inviteId?: number,
  eventId: number,
  planTableId: number,
  inviteName: string,
}

export interface TableInfos {
  key: PlanTable,
  value: Invite[],
}

