export interface SDGEvent {
  event_id: number;
  event_type: string;
  created_at: string;
  caused_by: number;
  project: string;
  goal: number;
}

export type SDGEvents = SDGEvent[];
