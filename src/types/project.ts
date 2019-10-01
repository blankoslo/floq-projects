export type Billable = "billable" | "nonbillable" | "unavailable";

export interface Project {
  id: string;
  name: string;
  billable: Billable;
  customer: string; // Customer["id"]
  responsible?: number; // Employee["id"]
  active: boolean;
  deductable?: boolean;
}

export type Projects = Project[];
