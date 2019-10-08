type Gender = "male" | "female" | "other";

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  title?: string | null;
  phone: string;
  email: string;
  gender: Gender;
  birth_date: string; // Date
  date_of_employment?: string | null; // Date
  termination_date?: string | null; // Date
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  emergency_contact_relation?: string | null;
  address?: string | null;
  postal_code?: string | null;
  city?: string | null;
  image_url?: string | null;
  has_permanent_position?: boolean | null;
  emoji?: string | null;
  role?: string | null;
  bio?: string | null;
}

export type Employees = Employee[];
