export interface Project {
  id: string;
  name: string;
  billable: boolean;
  customer: string; // Customer["id"]
  responible?: number; // Employee["id"]
  active: boolean;
  deductable?: boolean;
}

export type Projects = Project[];
