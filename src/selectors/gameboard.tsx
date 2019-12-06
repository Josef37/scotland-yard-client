import { Station } from "../reducers/staticGameboard";

interface BoundingBox {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export function getBoundingBox(stations: Array<Station>): BoundingBox {
  return stations.reduce(
    (box, station) => ({
      top: Math.min(box.top, station.y),
      right: Math.max(box.right, station.x),
      bottom: Math.max(box.bottom, station.y),
      left: Math.min(box.left, station.x)
    }),
    {
      top: Infinity,
      right: -Infinity,
      bottom: -Infinity,
      left: Infinity
    }
  );
}

export function translateStations(
  stations: Array<Station>,
  width: number,
  height: number,
  boundingBox: BoundingBox
): Array<Station> {
  return stations.map(station => ({
    number: station.number,
    x:
      ((station.x - boundingBox.left) /
        (boundingBox.right - boundingBox.left)) *
      width,
    y:
      ((station.y - boundingBox.top) / (boundingBox.bottom - boundingBox.top)) *
      height
  }));
}
