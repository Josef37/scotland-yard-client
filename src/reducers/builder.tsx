import { Station, Connection } from "./staticGameboard";
import { Action } from "./ActionInterface";
import {
  CREATE_STATION,
  CLICK_STATION_BUILD,
  SWITCH_BUILD_MODE,
  TransportationType,
  SUBMISSION_SUCCESSFUL
} from "../constants";

export type BuildMode =
  | { mode: "connection"; item: TransportationType }
  | { mode: "startingPosition"; item: "mrx" | "detective" };

interface BuilderState {
  stations: Array<Station>;
  connections: Array<Connection>;
  startingPositions: { mrX: Array<number>; detective: Array<number> };
  buildMode: BuildMode;
  selectedStation?: number;
  saved: boolean;
}

const initialState: BuilderState = {
  stations: [],
  connections: [],
  startingPositions: { mrX: [], detective: [] },
  buildMode: { mode: "connection", item: TransportationType.Taxi },
  saved: false
};

export const builder = (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_STATION:
      const { x, y } = action.payload;
      return {
        ...state,
        stations: state.stations.concat({
          number: state.stations.length + 1,
          x,
          y
        }),
        saved: false
      };
    case CLICK_STATION_BUILD:
      const stationNumber = action.payload;
      switch (state.buildMode.mode) {
        case "connection": {
          if (!state.selectedStation)
            return { ...state, selectedStation: action.payload };
          const connection: Connection = {
            station1Number: state.selectedStation,
            station2Number: stationNumber,
            type: state.buildMode.item
          };
          return {
            ...state,
            selectedStation: undefined,
            connections: state.connections.concat(connection),
            saved: false
          };
        }
        case "startingPosition": {
          const { mrX, detective } = state.startingPositions;
          const newStartingPositions =
            state.buildMode.item === "mrx"
              ? { mrX: mrX.concat(stationNumber), detective }
              : { mrX, detective: detective.concat(stationNumber) };
          return {
            ...state,
            startingPositions: newStartingPositions,
            saved: false
          };
        }
        default:
          return state;
      }
    case SWITCH_BUILD_MODE:
      return { ...state, buildMode: action.payload };
    case SUBMISSION_SUCCESSFUL:
      return { ...state, saved: true };
    default:
      return state;
  }
};
