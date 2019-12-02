import { TransportationType, TicketType } from "../components/Gameboard";
import {
  CLICK_PIECE,
  MOVE_PIECE,
  START_GAME,
  CLICK_STATION,
  MR_X_TURN
} from "../constants";
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

export interface IMove {
  pieceId?: number;
  stationNumber?: number;
  ticketType?: TicketType;
}

export interface GameboardState {
  stations: Array<IStation>;
  connections: Array<IConnection>;
  pieces: Array<IPiece>;
  ownPieceIds: Array<number>;
  move: IMove;
  mrXTurn: boolean;
}

const initialState = {
  stations: [],
  connections: [],
  pieces: [],
  ownPieceIds: [],
  move: {},
  mrXTurn: false
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
      return { ...state, move: { ...state.move, pieceId } };
    }
    case CLICK_STATION: {
      const stationNumber = action.payload;
      return { ...state, move: { ...state.move, stationNumber } };
    }
    case MOVE_PIECE: {
      const { pieceId, stationNumber } = action.payload;
      const pieces = state.pieces.map(piece =>
        piece.id === pieceId ? { ...piece, stationNumber } : piece
      );
      return { ...state, pieces, move: {} }; // BUG: This reset can be triggered by other peoples moves
    }
    case MR_X_TURN: {
      return { ...state, mrXTurn: action.payload };
    }
    default:
      return state;
  }
};
