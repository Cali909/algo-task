import { MAP_MAX_ZOOM } from "./config";
import { numericPolygonType, polygonType, ResultType } from "./types";

function getTargetTile(lon: number, lat: number, zoom: number) {
  const scale = 1 << zoom;
  const x = Math.floor(((lon + 180) / 360) * scale);
  const y = Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      scale
  );
  return { x, y };
}

export function getTileByCoordinates(
  polygon: polygonType | numericPolygonType
) {
  const numericPolygon = polygon.map(([lon, lat]) => [+lon, +lat]);

  let minZoom = 0;
  let maxZoom = MAP_MAX_ZOOM;
  let result: ResultType = {
    zoom: minZoom,
    tile_x: 0,
    tile_y: 0,
  };

  while (minZoom <= maxZoom) {
    const zoom = Math.floor((minZoom + maxZoom) / 2);
    const tiles = numericPolygon.map(([lon, lat]) =>
      getTargetTile(lon, lat, zoom)
    );

    const seperatedAxis = {
      x_coords: tiles.map((tile) => tile.x),
      y_coords: tiles.map((tile) => tile.y),
    };

    const minX = Math.min(...seperatedAxis.x_coords);
    const minY = Math.min(...seperatedAxis.y_coords);
    const maxX = Math.max(...seperatedAxis.x_coords);
    const maxY = Math.max(...seperatedAxis.y_coords);

    if (minX === maxX && minY === maxY) {
      result = { zoom, tile_x: minX, tile_y: minY };
      minZoom = zoom + 1;
    } else {
      maxZoom = zoom - 1;
    }
  }

  return result;
}

export function isEmptyString(str: string) {
  return str.trim() === "";
}
