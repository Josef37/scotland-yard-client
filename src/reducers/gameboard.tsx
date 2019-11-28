import { TransportationType, TicketType } from "../components/Gameboard";
import { CLICK_PIECE, MOVE_PIECE, START_GAME } from "../constants";
import { Action } from "./ActionInterface";

export interface IStation {
  number: number;
  x: number;
  y: number;
}

export interface IConnection {
  station1Number: number;
  station2Number: number;
  type: TransportationType;
}

export interface IPiece {
  id: number;
  stationNumber: number;
  color: string;
  tickets: Map<TicketType, number>;
  isMrX: boolean;
}

export interface GameboardState {
  stations: Array<IStation>;
  connections: Array<IConnection>;
  pieces: Array<IPiece>;
  ownPieceIds: Array<number>;
  selectedPieceId?: number;
}

const initialState = {
  stations: [],
  connections: [],
  pieces: [],
  ownPieceIds: []
};

export const gameboard = (
  state: GameboardState = initialState,
  action: Action
) => {
  switch (action.type) {
    case START_GAME:
      return action.payload;
    case CLICK_PIECE: {
      const pieceId = action.payload;
      if (!state.ownPieceIds.includes(pieceId)) return state;
      return { ...state, selectedPieceId: pieceId };
    }
    case MOVE_PIECE: {
      const { pieceId, stationNumber } = action.payload;
      const pieces = state.pieces.map(piece =>
        piece.id === pieceId ? { ...piece, stationNumber } : piece
      );
      return { ...state, pieces, selectedPieceId: undefined };
    }
    default:
      return state;
  }
};
