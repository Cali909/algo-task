import { polygonType, ResultType } from "./types";
import { getTileByCoordinates } from "./utils";

export function useCoordinate() {
  const calcCoordinates = (
    polygon: polygonType,
    setter: (result: ResultType) => void
  ) => {
    const result = getTileByCoordinates(polygon);
    setter(result);
  };
  const addToCoordinates = (
    list: polygonType,
    newCoord: [string, string],
    setter: React.Dispatch<React.SetStateAction<polygonType>>
  ) => {
    const newList = [...list, newCoord];
    setter(newList);
  };

  return { calcCoordinates, addToCoordinates };
}
