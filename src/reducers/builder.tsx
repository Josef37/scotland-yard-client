import { IStation, IConnection } from "./gameboard";
import { Action } from "./ActionInterface";
import {
  CREATE_STATION,
  CLICK_STATION_BUILD,
  SWITCH_BUILD_MODE,
  TransportationType
} from "../constants";

export type BuildMode =
  | { mode: "connection"; item: TransportationType }
  | { mode: "startingPosition"; item: "mrx" | "detective" };

interface BuilderState {
  stations: Array<IStation>;
  connections: Array<IConnection>;
  startingPositions: { mrX: Array<number>; detective: Array<number> };
  buildMode: BuildMode;
  selectedStation?: number;
}

const initialState: BuilderState = {
  stations: [],
  connections: [],
  startingPositions: { mrX: [], detective: [] },
  buildMode: { mode: "connection", item: TransportationType.Taxi }
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
        })
      };
    case CLICK_STATION_BUILD:
      const stationNumber = action.payload;
      switch (state.buildMode.mode) {
        case "connection": {
          if (!state.selectedStation)
            return { ...state, selectedStation: action.payload };
          const connection: IConnection = {
            station1Number: state.selectedStation,
            station2Number: stationNumber,
            type: state.buildMode.item
          };
          return {
            ...state,
            selectedStation: undefined,
            connections: state.connections.concat(connection)
          };
        }
        case "startingPosition": {
          const { mrX, detective } = state.startingPositions;
          const newStartingPositions =
            state.buildMode.item === "mrx"
              ? { mrX: mrX.concat(stationNumber), detective }
              : { mrX, detective: detective.concat(stationNumber) };
          return { ...state, startingPositions: newStartingPositions };
        }
        default:
          return state;
      }
    case SWITCH_BUILD_MODE:
      return { ...state, buildMode: action.payload };
    default:
      return state;
  }
};
