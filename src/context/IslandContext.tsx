import React, {useContext, useEffect, useState} from 'react';

import { PirateType } from '../types/Pirate';
import getAvailablePaths from './utils/getAvailablePaths';
import fillFieldWithValue from './utils/fillFieldWithValue';
import {CellType} from '../types/Cell';

type ContextType = {
  island: CellType[];
  size: number;
  activePirate?: string;
  pirates: PirateType[];
  availablePaths: number[];
  handleSetActivePirate: (pirate?: PirateType) => void;
  setPirates: (pirates: PirateType[]) => void;
  movePirate: (cell: CellType) => void;
};

const IslandContext = React.createContext<ContextType>({} as ContextType);

const initialPirates = [
  { name: 'Jon', location: 0, color: '#200772' },
  { name: 'Jane', location: 24, color: '#A64B00' },
];

const TREASURE = 8; // 1
const CANNIBAL = 2; // -1

export const IslandProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const size = 5;
  const [island, setIsland] = useState<CellType[]>([]);
  const [activePirate, setActivePirate] = useState<string>();
  const [pirates, setPirates] = useState<PirateType[]>(initialPirates);
  const [availablePaths, setAvailablePaths] = useState<number[]>([]);

  useEffect(() => {
    let result: CellType[] = new Array(size * size).fill(0).map((_, key) => ({
      place: key,
      value: 0,
      isClosed: true,
    }));
    // наполнение поля сокровищами
    fillFieldWithValue(TREASURE, 1, result, size);
    // наполнение поля людоедами
    fillFieldWithValue(CANNIBAL, -1, result, size);
    setIsland(result);
  }, []); // eslint-disable react-hooks/exhaustive-deps

  const handleSetActivePirate = (pirate?: PirateType) => {
    if (!pirate || activePirate === pirate.name) {
      setActivePirate(undefined);
      setAvailablePaths([]);
    } else {
      setActivePirate(pirate.name);
      setAvailablePaths(getAvailablePaths(pirate.location, size))
    }
  };

  const movePirate = (cell: CellType) => {
    setPirates(pirates.map((pirate) => (pirate.name === activePirate
      ? { ...pirate, location: cell.place }
      : pirate
    )));
    if (cell.isClosed) {
      setIsland(island.map((islandCell) => islandCell.place === cell.place
        ? { ...islandCell, isClosed: false }
        : islandCell
      ))
    }
  };

  const value = {
    island,
    size,
    activePirate,
    pirates,
    availablePaths,
    handleSetActivePirate,
    setPirates,
    movePirate,
  }
  return (<IslandContext.Provider value={value}>
    {children}
  </IslandContext.Provider>)
};

export const useIslandContext = () => useContext(IslandContext);