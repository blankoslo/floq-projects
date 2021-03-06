/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const SDGEvent = t.iface([], {
  event_id: "number",
  event_type: "string",
  created_at: "string",
  caused_by: "number",
  project: "string",
  goal: "number",
});

export const SDGEvents = t.array("SDGEvent");

const exportedTypeSuite: t.ITypeSuite = {
  SDGEvent,
  SDGEvents,
};
export default exportedTypeSuite;
