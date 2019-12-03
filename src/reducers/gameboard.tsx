import { TransportationType, TicketType } from "../constants";
import {
  CLICK_PIECE,
  MOVE_PIECE,
  START_GAME,
  CLICK_STATION
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
  playerName: string;
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
}

const initialState = {
  stations: [],
  connections: [],
  pieces: [],
  ownPieceIds: [],
  move: {}
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
      if (state.ownPieceIds.length === 1)
        return {
          ...state,
          move: { ...state.move, stationNumber, pieceId: state.ownPieceIds[0] }
        };
      else return { ...state, move: { ...state.move, stationNumber } };
    }
    case MOVE_PIECE: {
      const { pieceId, stationNumber, ticketType } = action.payload;
      const pieces = state.pieces.map(piece =>
        piece.id === pieceId
          ? movePiece(piece, stationNumber, ticketType)
          : piece
      );
      return { ...state, pieces, move: {} }; // BUG: This reset can be triggered by other peoples moves
    }
    default:
      return state;
  }
};

const movePiece = (
  piece: IPiece,
  stationNumber: number,
  ticketType: TicketType
) => {
  const tickets = new Map(
    piece.tickets.set(ticketType, piece.tickets.get(ticketType)! - 1)
  );
  return { ...piece, stationNumber, tickets };
};
