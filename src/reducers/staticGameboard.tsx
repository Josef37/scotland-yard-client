import { TransportationType } from "../constants";
import { START_GAME } from "../constants";
import { Action } from "./ActionInterface";

export interface Station {
  number: number;
  x: number;
  y: number;
}

export interface Connection {
  station1Number: number;
  station2Number: number;
  type: TransportationType;
}

export interface GameboardState {
  stations: Array<Station>;
  connections: Array<Connection>;
}

const initialState = {
  stations: [],
  connections: []
};

export const staticGameboard = (
  state: GameboardState = initialState,
  action: Action
) => {
  switch (action.type) {
    case START_GAME:
      const { stations, connections } = action.payload;
      return { stations, connections };
    default:
      return state;
  }
};
