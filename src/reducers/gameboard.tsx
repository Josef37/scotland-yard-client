import { TransportationType, TicketType } from "../components/Gameboard";
import { CLICK_PIECE, MOVE_PIECE, START_GAME } from "../constants";

export interface IAction {
  type: string;
  payload?: any;
}

export interface IStation {
  number: number;
  x: number;
  y: number;
}

export interface IConnection {
  station1: number;
  station2: number;
  type: TransportationType;
}

export interface IPiece {
  id: number;
  station: number;
  color: string;
  tickets: Map<TicketType, number>;
  isMrX: boolean;
}

export interface GameboardState {
  stations: Array<IStation>;
  connections: Array<IConnection>;
  pieces: Array<IPiece>;
  ownPieceIds: Array<number>;
  selectedPiece?: number;
}

const initialState = {
  stations: [],
  connections: [],
  pieces: [],
  ownPieceIds: []
};

export const gameboard = (
  state: GameboardState = initialState,
  action: IAction
) => {
  switch (action.type) {
    case START_GAME:
      return action.payload;
    case CLICK_PIECE:
      const pieceId = action.payload;
      if (!state.ownPieceIds.includes(pieceId)) return state;
      return { ...state, selectedPiece: pieceId };
    case MOVE_PIECE:
      const { piece, station } = action.payload;
      const pieces = state.pieces.map(p => {
        if (p.id === piece) return { ...p, station };
        return p;
      });
      return { ...state, pieces };
    default:
      return state;
  }
};
