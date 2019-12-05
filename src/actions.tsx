import io from "socket.io-client";
import {
  CLICK_PIECE,
  LOAD_LOBBY,
  LOGIN,
  MOVE_PIECE,
  SET_SOCKET,
  START_GAME,
  CLICK_STATION,
  MR_X_TICKET,
  MR_X_TURN,
  MR_X_DOUBLE,
  MR_X_WON,
  DETECTIVES_WON,
  EXIT_GAME,
  STOP_SEARCHING,
  START_SEARCHING
} from "./constants";
import { GameboardState } from "./reducers/gameboard";
import { LobbyData } from "./reducers/lobby";
import { TicketType } from "./constants";

export const clickPiece = (pieceId: number) => {
  return { type: CLICK_PIECE, payload: pieceId };
};

export const clickStation = (stationNumber: number) => {
  return { type: CLICK_STATION, payload: stationNumber };
};

export const selectTicket = (ticketType: TicketType) => (
  dispatch: any,
  getState: any
) => {
  const { socket, gameboard } = getState();
  const { pieceId, stationNumber } = gameboard.move;
  if (!pieceId || !stationNumber || !socket) return;
  socket.emit("move", {
    pieceId,
    stationNumber,
    ticketType
  });
};

export const login = (name: string) => (dispatch: any) => {
  dispatch({ type: LOGIN, payload: name });
  setupSocket(dispatch, name);
};

export const leaveGame = () => (dispatch: any, getState: any) => {
  const { socket } = getState();
  socket.emit("leave game");
  dispatch({ type: EXIT_GAME });
};

export const toggleSearch = () => (dispatch: any, getState: any) => {
  const { lobby, socket } = getState();
  const { isSearching } = lobby;
  if (isSearching) {
    socket.emit("stop searching", (success: boolean) => {
      if (success) dispatch({ type: STOP_SEARCHING });
    });
  } else {
    socket.emit("start searching", (success: boolean) => {
      if (success) dispatch({ type: START_SEARCHING });
    });
  }
};

const setupSocket = (dispatch: any, name: string) => {
  const socket = io("http://localhost:80/");

  socket.on("load lobby", (lobby: LobbyData) => {
    dispatch({ type: LOAD_LOBBY, payload: lobby });
  });

  socket.on("start game", (gameboardState: GameboardState) => {
    // deserialize Ticket map
    gameboardState.pieces = gameboardState.pieces.map(piece => ({
      ...piece,
      tickets: new Map(piece.tickets)
    }));
    dispatch({ type: START_GAME, payload: { ...gameboardState, move: {} } });
  });

  socket.on(
    "move",
    (move: {
      pieceId: number;
      stationNumber: number;
      ticketType: TicketType;
    }) => dispatch({ type: MOVE_PIECE, payload: move })
  );

  socket.on("mr x ticket", (ticketType: TicketType) => {
    if (ticketType === TicketType.Double) {
      dispatch({ type: MR_X_DOUBLE });
    } else {
      dispatch({ type: MR_X_TICKET, payload: ticketType });
    }
  });

  socket.on("mr x done", () => {
    dispatch({ type: MR_X_TURN, payload: false });
  });
  socket.on("detectives done", () => {
    dispatch({ type: MR_X_TURN, payload: true });
  });

  socket.on("mr x won", () => {
    dispatch({ type: MR_X_WON });
  });
  socket.on("detectives won", () => {
    dispatch({ type: DETECTIVES_WON });
  });

  dispatch({ type: SET_SOCKET, payload: socket });
  socket.emit("set name", name);
};
