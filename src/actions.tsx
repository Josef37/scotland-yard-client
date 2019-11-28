import io from "socket.io-client";
import {
  CLICK_PIECE,
  LOAD_LOBBY,
  LOGIN,
  MOVE_PIECE,
  SET_SOCKET,
  START_GAME
} from "./constants";
import { GameboardState } from "./reducers/gameboard";
import { LobbyData } from "./reducers/lobby";

export const clickPiece = (pieceId: number) => {
  return { type: CLICK_PIECE, payload: pieceId };
};

export const clickStation = (stationNumber: number) => (
  dispatch: any,
  getState: any
) => {
  const { socket, gameboard } = getState();
  const { selectedPieceId } = gameboard;
  if (!selectedPieceId || !socket) return;
  socket.emit("move", {
    pieceId: selectedPieceId,
    stationNumber
  });
};

export const login = (name: string) => (dispatch: any) => {
  dispatch({ type: LOGIN, payload: name });
  setupSocket(dispatch, name);
};

const setupSocket = (dispatch: any, name: string) => {
  const socket = io("http://localhost:80/");

  socket.on("load lobby", (lobby: LobbyData) => {
    dispatch({ type: LOAD_LOBBY, payload: lobby });
  });

  socket.on("start game", (gameboardState: GameboardState) => {
    dispatch({ type: START_GAME, payload: gameboardState });
  });

  socket.on("move", (move: { pieceId: number; stationNumber: number }) =>
    dispatch({ type: MOVE_PIECE, payload: move })
  );

  socket.on("mr x done", () => console.log("mr x done"));
  socket.on("detectives done", () => console.log("detectives done"));

  socket.on("game over", (history: any) => {
    console.log(history);
  });

  dispatch({ type: SET_SOCKET, payload: socket });
  socket.emit("set name", name);
};
