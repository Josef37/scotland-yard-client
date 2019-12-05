import {
  TicketType,
  CLICK_PIECE,
  CLICK_STATION,
  MOVE_PIECE,
  START_GAME
} from "../constants";
import { Action } from "./ActionInterface";

export interface Move {
  pieceId?: number;
  stationNumber?: number;
  ticketType?: TicketType;
}

export interface Piece {
  id: number;
  stationNumber: number;
  color: string;
  tickets: Map<TicketType, number>;
  isMrX: boolean;
  playerName: string;
  isOwn: boolean;
}

export interface DynamicGameboardState {
  move: Move;
  pieces: Array<Piece>;
}

const initialState = {
  move: {},
  pieces: []
};

export const dynamicGameboard = (
  state: DynamicGameboardState = initialState,
  action: Action
) => {
  switch (action.type) {
    case START_GAME: {
      const { pieces } = action.payload;
      return { move: {}, pieces };
    }
    case CLICK_PIECE: {
      const piece = state.pieces.find(piece => piece.id === action.payload);
      if (!piece || !piece.isOwn) return state;
      return { ...state, move: { ...state.move, pieceId: piece.id } };
    }
    case CLICK_STATION: {
      const stationNumber = action.payload;
      return { ...state, move: { ...state.move, stationNumber } };
    }
    case MOVE_PIECE: {
      const { pieceId, stationNumber, ticketType } = action.payload;
      const pieces = state.pieces.map(piece =>
        piece.id === pieceId
          ? movePiece(piece, stationNumber, ticketType)
          : piece
      );
      return { ...state, pieces, move: {} };
    }
    default:
      return state;
  }
};

const movePiece = (
  piece: Piece,
  stationNumber: number,
  ticketType: TicketType
) => {
  const tickets = new Map(
    piece.tickets.set(ticketType, (piece.tickets.get(ticketType) || 0) - 1)
  );
  return { ...piece, stationNumber, tickets };
};
