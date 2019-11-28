import {
  CLICK_PIECE,
  LOGIN,
  SET_SOCKET,
  LOAD_LOBBY,
  START_GAME,
  MOVE_PIECE
} from "./constants";
import { LobbyData } from "./reducers/lobby";
import { GameboardState } from "./reducers/gameboard";
import io from "socket.io-client";

export const clickPiece = (pieceId: number) => {
  return { type: CLICK_PIECE, payload: pieceId };
};

export const clickStation = (stationNumber: number) => (
  dispatch: any,
  getState: any
) => {
  const { socket, gameboard } = getState();
  const { selectedPiece, currentPlayer } = gameboard;
  if (!selectedPiece) return;
  socket.emit("move", {
    piece: selectedPiece,
    station: stationNumber
  });
};

export const login = (name: string) => (dispatch: any) => {
  dispatch({ type: LOGIN, payload: name });
  setupSocket(dispatch, name);
};

const setupSocket = (dispatch: any, name: string) => {
  const socket = io("http://localhost:80/");

  socket.emit("set name", name);

  socket.on("load lobby", (lobby: LobbyData) => {
    dispatch({ type: LOAD_LOBBY, payload: lobby });
  });

  socket.on("start game", (gameboardState: GameboardState) => {
    dispatch({ type: START_GAME, payload: gameboardState });
  });

  socket.on("move", (move: { piece: number; station: number }) =>
    dispatch({ type: MOVE_PIECE, payload: move })
  );

  socket.on("mr x done", () => console.log("mr x done"));
  socket.on("detectives done", () => console.log("detectives done"));

  socket.on("gameover", (history: any) => {
    console.log(history);
  });

  dispatch({ type: SET_SOCKET, payload: socket });
};
