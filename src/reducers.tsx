import { TransportationType } from "./components/Gameboard";
import {
  CLICK_STATION,
  CLICK_PIECE,
  CLICK_COMMIT,
  CLICK_UNDO
} from "./constants";

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
  selected: boolean;
  movedFromStation: number | undefined;
}

export interface IPlayer {
  id: number;
  name: string;
  pieces: Array<number>;
  commited: boolean;
}

enum GameboardState {
  NO_PIECE_SELECTED,
  PIECE_SELECTED,
  MOVES_COMITTED
}

export interface IGameboardState {
  state: GameboardState;
  stations: Array<IStation>;
  connections: Array<IConnection>;
  pieces: Array<IPiece>;
  players: Array<IPlayer>;
  currentPlayer: IPlayer;
}

const stations: Array<IStation> = [
  { number: 1, x: 0, y: 0 },
  { number: 2, x: 1, y: 0 },
  { number: 3, x: 2, y: 0 },
  { number: 4, x: 3, y: 1 },
  { number: 5, x: 1, y: 2 },
  { number: 6, x: 2, y: 2 },
  { number: 7, x: 3, y: 2 }
];

const connections: Array<IConnection> = [
  { station1: 1, station2: 2, type: TransportationType.Taxi },
  { station1: 2, station2: 3, type: TransportationType.Taxi },
  { station1: 3, station2: 4, type: TransportationType.Taxi },
  { station1: 4, station2: 7, type: TransportationType.Taxi },
  { station1: 7, station2: 6, type: TransportationType.Taxi },
  { station1: 6, station2: 5, type: TransportationType.Taxi },
  { station1: 5, station2: 1, type: TransportationType.Taxi },
  { station1: 1, station2: 6, type: TransportationType.Bus },
  { station1: 6, station2: 4, type: TransportationType.Bus },
  { station1: 4, station2: 3, type: TransportationType.Bus },
  { station1: 3, station2: 1, type: TransportationType.Bus },
  { station1: 1, station2: 4, type: TransportationType.Underground }
];

const pieces: Array<IPiece> = [
  {
    id: 1,
    station: 3,
    color: "red",
    selected: false,
    movedFromStation: undefined
  },
  {
    id: 2,
    station: 4,
    color: "blue",
    selected: false,
    movedFromStation: undefined
  }
];

const players: Array<IPlayer> = [
  { id: 1234, name: "Name", pieces: [1, 2], commited: false }
];

const currentPlayer: IPlayer = players[0];

const inititalStateGameboard: IGameboardState = {
  state: GameboardState.NO_PIECE_SELECTED,
  stations,
  connections,
  pieces,
  players,
  currentPlayer
};

export const gameboard = (state = inititalStateGameboard, action: IAction) => {
  switch (state.state) {
    case GameboardState.NO_PIECE_SELECTED:
      switch (action.type) {
        case CLICK_PIECE:
          return togglePieceSelected(state, action.payload);
        case CLICK_COMMIT:
          return commitMoves(state);
        default:
          return state;
      }
    case GameboardState.PIECE_SELECTED:
      switch (action.type) {
        case CLICK_STATION:
          return moveSelectedPiece(state, action.payload);
        case CLICK_PIECE:
          return togglePieceSelected(state, action.payload);
        case CLICK_UNDO:
          return undoSelectedPieceMove(state);
        case CLICK_COMMIT:
          return commitMoves(state);
        default:
          return state;
      }
    default:
      return state;
  }
};

function togglePieceSelected(state: IGameboardState, pieceId: number) {
  let selected;
  const newPieces = state.pieces.map(piece => {
    selected = !piece.selected;
    if (piece.id === pieceId) return { ...piece, selected };
    return { ...piece, selected: false };
  });
  if (selected === undefined) return state;
  return {
    ...state,
    state: selected
      ? GameboardState.PIECE_SELECTED
      : GameboardState.NO_PIECE_SELECTED,
    pieces: newPieces
  };
}

function moveSelectedPiece(state: IGameboardState, stationNumber: number) {
  const stationTo = stationNumber;
  const selectedPiece = state.pieces.find(piece => piece.selected);
  if (!selectedPiece) return state;
  if (selectedPiece.movedFromStation !== undefined) {
    if (stationTo !== selectedPiece.movedFromStation) return state;
    else {
      const newPieces = undoPiece(state.pieces, selectedPiece);
      return {
        ...state,
        state: GameboardState.NO_PIECE_SELECTED,
        pieces: newPieces
      };
    }
  }
  const stationFrom = selectedPiece.station;
  const connection = findConnection(state.connections, stationFrom, stationTo);
  if (!connection) return state;
  const newPieces = movePiece(state.pieces, selectedPiece, stationTo);
  return {
    ...state,
    state: GameboardState.NO_PIECE_SELECTED,
    pieces: newPieces
  };
}

function undoSelectedPieceMove(state: IGameboardState) {
  const selectedPiece = state.pieces.find(piece => piece.selected);
  if (!selectedPiece || selectedPiece.movedFromStation === undefined)
    return state;
  const newPieces = undoPiece(state.pieces, selectedPiece);
  return {
    ...state,
    state: GameboardState.NO_PIECE_SELECTED,
    pieces: newPieces
  };
}

function commitMoves(state: IGameboardState) {
  if (
    getPiecesByIds(state.pieces, state.currentPlayer.pieces).some(
      piece => piece.movedFromStation === undefined
    )
  ) {
    return state;
  }
  let newPieces = state.pieces.map(piece => ({
    ...piece,
    selected: false,
    movedFromStation: undefined
  }));
  return { ...state, state: GameboardState.MOVES_COMITTED, pieces: newPieces };
}

function movePiece(
  pieces: Array<IPiece>,
  selectedPiece: IPiece,
  stationNumber: number
) {
  if (isPieceAt(pieces, stationNumber)) return pieces;
  return pieces.map(piece => {
    if (piece === selectedPiece)
      return {
        ...piece,
        station: stationNumber,
        selected: false,
        movedFromStation: piece.station
      };
    return piece;
  });
}

function undoPiece(pieces: Array<IPiece>, selectedPiece: IPiece) {
  if (isPieceAt(pieces, selectedPiece.movedFromStation as number))
    return pieces;
  return pieces.map(piece => {
    if (piece === selectedPiece)
      return {
        ...piece,
        station: piece.movedFromStation as number,
        selected: false,
        movedFromStation: undefined
      };
    return piece;
  });
}

function isPieceAt(pieces: Array<IPiece>, stationNumber: number) {
  return pieces.some(piece => piece.station === stationNumber);
}

function findConnection(
  connections: Array<IConnection>,
  station1: number,
  station2: number
) {
  return connections.find(
    connection =>
      (connection.station1 === station1 && connection.station2 === station2) ||
      (connection.station1 === station2 && connection.station2 === station1)
  );
}

function getPiecesByIds(pieces: Array<IPiece>, pieceIds: Array<number>) {
  return pieces.filter(piece => pieceIds.includes(piece.id));
}
