import { useState } from "react";
import "./index.css";
import { polygonType, ResultType } from "./types";
import { useCoordinate } from "./useCoordinate";
import { isEmptyString } from "./utils";

function App() {
  const { calcCoordinates, addToCoordinates } = useCoordinate();
  const [result, setResult] = useState<ResultType | undefined>(undefined);
  const [coordinatesList, setCoordinatesList] = useState<polygonType>([]);
  const [lastCoordinate, setLastCoordinate] = useState({
    long: "",
    lat: "",
  });

  const handleAddNewCoordinate = () => {
    addToCoordinates(
      coordinatesList,
      [lastCoordinate.long, lastCoordinate.lat],
      setCoordinatesList
    );
    setLastCoordinate({
      long: "",
      lat: "",
    });
  };

  const handleReset = () => {
    setResult(undefined);
    setCoordinatesList([]);
  };

  // [-122.4194, 37.7749] [-122.4185 ,37.7750] [-122.4195, 37.7755] [-122.4180 ,37.7745]

  return (
    <div className=" flex flex-col items-center mt-8">
      <div className="  w-80 flex flex-col gap-2 border border-gray-300 p-6 rounded-2xl">
        <p className="text-md text-gray-800 self-start">Longitude (X):</p>
        <input
          type="number"
          className="bg-white border outline-none border-gray-300 h-12 rounded-2xl py-3 px-4 focus:border-purple-800"
          value={lastCoordinate.long}
          onChange={(e) =>
            setLastCoordinate((prev) => ({
              lat: prev.lat,
              long: e.target.value,
            }))
          }
        />
        <p className="text-md text-gray-800 self-start mt-2">Latitude (Y):</p>
        <input
          type="number"
          className="bg-white border outline-none border-gray-300 h-12 rounded-2xl py-3 px-4 focus:border-purple-800"
          value={lastCoordinate.lat}
          onChange={(e) =>
            setLastCoordinate((prev) => ({
              long: prev.long,
              lat: e.target.value,
            }))
          }
        />
        <div className="flex items-center gap-2  mt-8">
          <button
            className="bg-purple-800 text-white py-3 px-4 rounded-2xl w-full disabled:bg-gray-400"
            onClick={handleAddNewCoordinate}
            disabled={
              isEmptyString(lastCoordinate.lat) ||
              isEmptyString(lastCoordinate.long)
            }
          >
            Add
          </button>
          <button
            className="bg-yellow-800 text-white py-3 px-4 rounded-2xl w-full disabled:bg-gray-400"
            onClick={() => calcCoordinates(coordinatesList, setResult)}
            disabled={coordinatesList.length < 3}
          >
            Calculate
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-10">
        {coordinatesList.map((coord, i) => (
          <p key={i}>
            [ <span>{coord[0]}</span> ,<span>{coord[1]}</span> ]
          </p>
        ))}
      </div>
      {result && (
        <div className="flex flex-col gap-2">
          <p className="text-3xl mt-8">Result: {JSON.stringify(result)}</p>
          <button
            className="bg-red-800 text-white py-3 px-4 rounded-2xl w-full mt-8"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
