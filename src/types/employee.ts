type Gender = "male" | "female" | "other";

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  title?: string;
  phone: string;
  email: string;
  gender: Gender;
  birth_date: Date;
  date_of_employment?: Date;
  termination_date?: Date;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relation?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  image_url?: string;
  has_permanent_position?: boolean;
  emoji?: string;
  role?: string;
  bio?: string;
}

export type Employees = Employee[];
