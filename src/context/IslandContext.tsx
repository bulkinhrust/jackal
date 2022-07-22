import React, { useContext, useState } from 'react';

import { PirateType } from '../types/Pirate';

type ContextType = {
  size: number;
  activePirate?: string;
  pirates: PirateType[];
  availablePaths: number[];
  handleSetActivePirate: (pirate?: PirateType) => void;
  setPirates: (pirates: PirateType[]) => void;
};

const IslandContext = React.createContext<ContextType>({} as ContextType);

type Props = React.PropsWithChildren;

const getAvailablePaths = (currentCell: number, size: number): number[] => { // 12, 5
  const x = currentCell % size; // 2
  const y = Math.floor(currentCell / size); // 2
  const availablePaths: number[] = [];

  const cell = (x: number, y: number) => {
    if (x >= 0 && y >= 0 && x < size && y < size) {
      availablePaths.push(y * size + x);
    }
  }

  cell(x-1, y-1);
  cell(x, y-1);
  cell(x+1, y-1);
  cell(x-1, y);
  cell(x+1, y);
  cell(x-1, y+1);
  cell(x, y+1);
  cell(x+1, y+1);

  return availablePaths;
}

export const IslandProvider: React.FC<Props> = ({ children }) => {
  const size = 5;
  const [activePirate, setActivePirate] = useState<string>();
  const [pirates, setPirates] = useState<PirateType[]>([
    { name: 'Jon', location: 0 },
    { name: 'Jane', location: 24 },
  ]);
  const [availablePaths, setAvailablePaths] = useState<number[]>([]);

  const handleSetActivePirate = (pirate?: PirateType) => {
    if (!pirate || activePirate === pirate.name) {
      setActivePirate(undefined);
      setAvailablePaths([]);
    } else {
      setActivePirate(pirate.name);
      setAvailablePaths(getAvailablePaths(pirate.location, size))
    }
  }

  const value = {
    size,
    activePirate,
    pirates,
    availablePaths,
    handleSetActivePirate,
    setPirates,
  }
  return (<IslandContext.Provider value={value}>
    {children}
  </IslandContext.Provider>)
};

export const useIslandContext = () => useContext(IslandContext);