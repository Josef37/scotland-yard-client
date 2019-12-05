import { combineReducers } from "redux";
import { staticGameboard } from "./staticGameboard";
import { dynamicGameboard } from "./dynamicGameboard";
import { lobby } from "./lobby";
import { location } from "./location";
import { socket } from "./socket";
import { ticketHistory } from "./ticketHistory";
import { turn } from "./turn";
import { builder } from "./builder";

export default combineReducers({
  staticGameboard,
  dynamicGameboard,
  lobby,
  location,
  socket,
  ticketHistory,
  turn,
  builder
});
