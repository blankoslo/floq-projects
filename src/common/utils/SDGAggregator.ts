import { SDGEvent } from "types/SDGEvent";

export const getSDGAggregate = (events: SDGEvent[]): number[] => {
  return events
    .reduce((state: number[], event: SDGEvent) => {
      switch (event.event_type) {
        case "added":
          return [...state, event.goal];
        case "ended":
          return state.filter(g => g !== event.goal);
        default:
          return state;
      }
    }, [])
    .sort((a, b) => a - b);
};

export const diffSDGStates = (
  state: number[],
  newState: number[]
): { ended: number[]; added: number[] } => {
  const ended = state.filter(g => !newState.includes(g));
  const added = newState.filter(g => !state.includes(g));

  return { ended, added };
};
