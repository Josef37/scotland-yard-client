import { IConnection } from "./reducers";
import {
  CLICK_PIECE,
  CLICK_STATION,
  CLICK_CONNECTION,
  CLICK_COMMIT,
  CLICK_UNCOMMIT,
  CLICK_UNDO
} from "./constants";

export const clickStation = (stationNumber: number) => {
  return { type: CLICK_STATION, payload: stationNumber };
};

export const clickConnection = (connection: IConnection) => {
  return { type: CLICK_CONNECTION, payload: connection };
};

export const clickPiece = (pieceId: number) => {
  return { type: CLICK_PIECE, payload: pieceId };
};

export const clickCommit = () => ({ type: CLICK_COMMIT });
export const clickUncommit = () => ({ type: CLICK_UNCOMMIT });
export const clickUndo = () => ({ type: CLICK_UNDO });
