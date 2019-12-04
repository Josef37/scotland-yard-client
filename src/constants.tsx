export const CLICK_PIECE = "CLICK_PIECE";
export const CLICK_STATION = "CLICK_STATION";
export const MOVE_PIECE = "MOVE_PIECE";
export const MR_X_TICKET = "MR_X_TICKET";
export const MR_X_DOUBLE = "MR_X_DOUBLE";
export const START_GAME = "START_GAME";
export const EXIT_GAME = "EXIT_GAME";
export const LOGIN = "LOGIN";
export const LOAD_LOBBY = "LOAD_LOBBY";
export const SET_SOCKET = "SET_SOCKET";
export const MR_X_TURN = "MR_X_TURN";
export const MR_X_WON = "MR_X_WON";
export const DETECTIVES_WON = "DETECTIVES_WON";

export enum Location {
  LOGIN,
  LOBBY,
  GAME
}

export enum TransportationType {
  Taxi = "Taxi",
  Bus = "Bus",
  Underground = "Underground",
  Ferry = "Ferry"
}

export enum TicketType {
  Taxi = "Taxi",
  Bus = "Bus",
  Underground = "Underground",
  Black = "Black",
  Double = "Double"
}

export const transportationColors = new Map([
  [TransportationType.Taxi, "#ffd843"],
  [TransportationType.Bus, "#2ec3c6"],
  [TransportationType.Underground, "#ff4d1d"],
  [TransportationType.Ferry, "#000"]
]);

export const ticketColors = new Map([
  [TicketType.Taxi, { color: "black", backgroundColor: "#ffd843" }],
  [TicketType.Bus, { color: "black", backgroundColor: "#2ec3c6" }],
  [TicketType.Underground, { color: "white", backgroundColor: "#ff4d1d" }],
  [TicketType.Black, { color: "white", backgroundColor: "#000" }],
  [TicketType.Double, { color: "black", backgroundColor: "lightblue" }]
]);
