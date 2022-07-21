import React, { useContext, useState } from 'react';

import { PirateType } from '../types/Pirate';

type ContextType = {
  size: number;
  activePirate?: string;
  pirates: PirateType[],
  setActivePirate: (activePirate?: string) => void;
  setPirates: (pirates: PirateType[]) => void;
};

const IslandContext = React.createContext<ContextType>({} as ContextType);

type Props = React.PropsWithChildren;

export const IslandProvider: React.FC<Props> = ({ children }) => {
  const size = 5;
  const [activePirate, setActivePirate] = useState<string>();
  const [pirates, setPirates] = useState<PirateType[]>([
    { name: 'Jon', location: 0 },
    { name: 'Jane', location: 24 },
  ]);

  const value = {
    size,
    activePirate,
    pirates,
    setActivePirate,
    setPirates,
  }
  return (<IslandContext.Provider value={value}>
    {children}
  </IslandContext.Provider>)
};

export const useIslandContext = () => useContext(IslandContext);