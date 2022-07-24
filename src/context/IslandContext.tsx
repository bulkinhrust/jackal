import React, {useContext, useEffect, useState} from 'react';

import PirateType from '../types/Pirate';
import getAvailablePaths from './utils/getAvailablePaths';
import fillFieldWithValue from './utils/fillFieldWithValue';
import CellType from '../types/Cell';
import SeaCell from '../types/SeaCell';

type ContextType = {
  island: CellType[];
  sea: SeaCell[][];
  size: number;
  activePirate?: PirateType;
  pirates: PirateType[];
  availablePaths: (number | string)[];
  handleSetActivePirate: (pirate?: PirateType) => void;
  setPirates: (pirates: PirateType[]) => void;
  movePirate: (cell: CellType) => void;
  pickUpCoin: (cell: CellType) => void;
  throwCoin: (pirate: PirateType) => void;
};

const IslandContext = React.createContext<ContextType>({} as ContextType);

const initialPirates = [
  { name: 'Jon', location: 0, color: '#200772' },
  { name: 'Jane', location: 24, color: '#A64B00' },
  { name: 'Jack', location: 11, color: '#006363' },
];

const TREASURE = 8; // 1
const CANNIBAL = 2; // -1

export const IslandProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const size = 5;
  const [island, setIsland] = useState<CellType[]>([]);
  const [sea, setSea] = useState<SeaCell[][]>([[], []]);
  const [activePirate, setActivePirate] = useState<PirateType>();
  const [pirates, setPirates] = useState<PirateType[]>(initialPirates);
  const [availablePaths, setAvailablePaths] = useState<(number | string)[]>([]);

  useEffect(() => {
    const result: CellType[] = new Array(size * size).fill(0).map((_, key) => ({
      coordinate: key,
      value: 0,
      isClosed: true,
      coins: 0,
    }));
    // наполнение поля сокровищами
    fillFieldWithValue(TREASURE, 1, result, size);
    // наполнение поля людоедами
    fillFieldWithValue(CANNIBAL, -1, result, size);

    const initSea = (ship: number) => new Array(size).fill(0).map((_, key) => ({
      coordinate: `${ship}${key}`,
      withShip: Math.floor(size / 2) === key,
    }));

    setSea([initSea(0), initSea(1)]);
    setIsland(result);
  }, []); // eslint-disable react-hooks/exhaustive-deps

  const handleSetActivePirate = (pirate?: PirateType) => {
    if (!pirate || activePirate?.name === pirate.name) {
      setActivePirate(undefined);
      setAvailablePaths([]);
    } else {
      setActivePirate(pirate);
      setAvailablePaths(getAvailablePaths(pirate.location, size, sea))
    }
  };

  const movePirate = (cell: CellType) => {
    setPirates(pirates.map((pirate) => (pirate.name === activePirate?.name
      ? { ...pirate, location: cell.coordinate }
      : pirate
    )));
    if (cell.isClosed) {
      setIsland(island.map((islandCell) => islandCell.coordinate === cell.coordinate
        ? { ...islandCell, isClosed: false }
        : islandCell
      ))
    }
  };

  const pickUpCoin = (cell: CellType) => {
    if (!activePirate || activePirate.withCoin) {
      return;
    }
    if (activePirate.location !== cell.coordinate) {
      setActivePirate(undefined);
      return;
    }
    setPirates(pirates.map((pirate) => pirate.name === activePirate.name
      ? { ...pirate, withCoin: true }
      : pirate
    ));
    setIsland(island.map((islandCell) => islandCell.coordinate === cell.coordinate
      ? { ...islandCell, coins: islandCell.coins - 1 }
      : islandCell
    ));
  }

  const throwCoin = (currentPirate: PirateType) => {
    setPirates(pirates.map((pirate) => pirate.name === currentPirate.name
      ? { ...pirate, withCoin: false }
      : pirate
    ));
    setIsland(island.map((islandCell) => islandCell.coordinate === currentPirate.location
      ? { ...islandCell, coins: islandCell.coins + 1 }
      : islandCell
    ));
  }

  const value = {
    island,
    sea,
    size,
    activePirate,
    pirates,
    availablePaths,
    handleSetActivePirate,
    setPirates,
    movePirate,
    pickUpCoin,
    throwCoin,
  }
  return (<IslandContext.Provider value={value}>
    {children}
  </IslandContext.Provider>)
};

export const useIslandContext = () => useContext(IslandContext);