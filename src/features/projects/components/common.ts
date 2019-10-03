import { Billable } from "types/Project";

export type CustomerOption = { value: string; label: string; tag: string };
export type EmployeeOption = { value: number; label: string };
export type BillableOption = { value: Billable; label: string };
export const billableElements: BillableOption[] = [
  { value: "billable", label: "Fakturerbar" },
  { value: "nonbillable", label: "Ikke-fakturerbar" },
  { value: "unavailable", label: "Utilgjengelig tid" },
];
