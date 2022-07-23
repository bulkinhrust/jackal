import React, { useContext, useState } from 'react';

import { PirateType } from '../types/Pirate';
import getAvailablePaths from './utils/getAvailablePaths';

type ContextType = {
  size: number;
  activePirate?: string;
  pirates: PirateType[];
  availablePaths: number[];
  handleSetActivePirate: (pirate?: PirateType) => void;
  setPirates: (pirates: PirateType[]) => void;
  movePirate: (cell: number) => void;
};

const IslandContext = React.createContext<ContextType>({} as ContextType);

const initialPirates = [
  { name: 'Jon', location: 0, color: '#200772' },
  { name: 'Jane', location: 24, color: '#A64B00' },
];

export const IslandProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const size = 5;
  const [activePirate, setActivePirate] = useState<string>();
  const [pirates, setPirates] = useState<PirateType[]>(initialPirates);
  const [availablePaths, setAvailablePaths] = useState<number[]>([]);

  const handleSetActivePirate = (pirate?: PirateType) => {
    if (!pirate || activePirate === pirate.name) {
      setActivePirate(undefined);
      setAvailablePaths([]);
    } else {
      setActivePirate(pirate.name);
      setAvailablePaths(getAvailablePaths(pirate.location, size))
    }
  };

  const movePirate = (cell: number) => {
    setPirates(pirates.map((pirate) => (pirate.name === activePirate
      ? { ...pirate, location: cell }
      : pirate
    )));
  };

  const value = {
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