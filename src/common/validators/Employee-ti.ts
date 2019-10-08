/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const Gender = t.union(t.lit("male"), t.lit("female"), t.lit("other"));

export const Employee = t.iface([], {
  id: "number",
  first_name: "string",
  last_name: "string",
  title: t.opt(t.union("string", "null")),
  phone: "string",
  email: "string",
  gender: "Gender",
  birth_date: "string",
  date_of_employment: t.opt(t.union("string", "null")),
  termination_date: t.opt(t.union("string", "null")),
  emergency_contact_name: t.opt(t.union("string", "null")),
  emergency_contact_phone: t.opt(t.union("string", "null")),
  emergency_contact_relation: t.opt(t.union("string", "null")),
  address: t.opt(t.union("string", "null")),
  postal_code: t.opt(t.union("string", "null")),
  city: t.opt(t.union("string", "null")),
  image_url: t.opt(t.union("string", "null")),
  has_permanent_position: t.opt(t.union("boolean", "null")),
  emoji: t.opt(t.union("string", "null")),
  role: t.opt(t.union("string", "null")),
  bio: t.opt(t.union("string", "null")),
});

export const Employees = t.array("Employee");

const exportedTypeSuite: t.ITypeSuite = {
  Gender,
  Employee,
  Employees,
};
export default exportedTypeSuite;
