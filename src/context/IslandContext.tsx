import React, {useContext, useEffect, useState} from 'react';

import PirateType from '../types/Pirate';
import getAvailablePaths from './utils/getAvailablePaths';
import fillFieldWithValue from './utils/fillFieldWithValue';
import { initialPirates } from './constants';
import CellType from '../types/Cell';
import SeaCell from '../types/SeaCell';

type ContextType = {
  island: CellType[];
  sea: SeaCell[][];
  size: number;
  activePirate?: PirateType;
  pirates: PirateType[];
  availablePaths: string[];
  gold: { 1: number, 2: number };
  turn: 1 | 2;
  handleSetActivePirate: (pirate?: PirateType) => void;
  setPirates: (pirates: PirateType[]) => void;
  movePirate: (cell: CellType | SeaCell) => void;
  moveShip: (nextCell: SeaCell) => void;
  pickUpCoin: (cell: CellType) => void;
  throwCoin: (pirate: PirateType) => void;
};

const IslandContext = React.createContext<ContextType>({} as ContextType);

const TREASURE = 8; // 1
const CANNIBAL = 2; // -1

export const IslandProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const size = 5;
  const [island, setIsland] = useState<CellType[]>([]);
  const [sea, setSea] = useState<SeaCell[][]>([[], []]);
  const [activePirate, setActivePirate] = useState<PirateType>();
  const [pirates, setPirates] = useState<PirateType[]>(initialPirates);
  const [availablePaths, setAvailablePaths] = useState<string[]>([]);
  const [gold, setGold] = useState<{ 1: number, 2: number }>({ 1: 0, 2: 0 });
  const [turn, setTurn] = useState<1 | 2>(1);

  useEffect(() => {
    const result: CellType[] = new Array(size * size).fill(0).map((_, key) => ({
      coordinate: `${key}`,
      value: 0,
      isClosed: true,
      coins: 0,
    }));
    // наполнение поля сокровищами
    fillFieldWithValue(TREASURE, 1, result, size);
    // наполнение поля людоедами
    fillFieldWithValue(CANNIBAL, -1, result, size);

    const initSea = (ship: number) => new Array(size).fill(0).map((_, key) => ({
      coordinate: `-${ship}-${size * ship + key}`,
      withShip: Math.floor(size / 2) === key,
    }));

    setSea([initSea(0), initSea(size - 1)]);
    setIsland(result);
  }, []); // eslint-disable react-hooks/exhaustive-deps

  const handleSetActivePirate = (pirate?: PirateType) => {
    if (!pirate || activePirate?.name === pirate.name) {
      setActivePirate(undefined);
      setAvailablePaths([]);
    } else {
      setActivePirate(pirate);
      setAvailablePaths(getAvailablePaths(pirate, size, sea))
    }
  };

  const movePirate = (cell: CellType | SeaCell) => {
    const newPirate: Partial<PirateType> = { location: cell.coordinate };

    if (activePirate?.withCoin && (cell as SeaCell).withShip) {
      setGold({
        ...gold,
        [activePirate.team]: gold[activePirate.team] + 1,
      });
      newPirate.withCoin = false;
    }

    setPirates(pirates.map((pirate) => (pirate.name === activePirate?.name
      ? { ...pirate, ...newPirate }
      : pirate
    )));
    if ((cell as CellType).isClosed) {
      setIsland(island.map((islandCell) => islandCell.coordinate === cell.coordinate
        ? { ...islandCell, isClosed: false }
        : islandCell
      ))
    }

    setTurn(activePirate?.team === 1 ? 2 : 1);
  };

  const moveShip = (nextCell: SeaCell) => {
    const prevCellCoordinate = activePirate?.location || '';
    const ship = +prevCellCoordinate?.split('-')[1] === 0 ? 0 : 1;

    const newSeaSide = [...sea[ship]].map((seaCell) => {
      if (seaCell.coordinate === nextCell.coordinate) {
        return { ...seaCell, withShip: true };
      }
      if (seaCell.coordinate === prevCellCoordinate) {
        return { ...seaCell, withShip: false };
      }
      return seaCell;
    });

    setSea(sea.map((seaSide, key) => key === ship ? newSeaSide : seaSide));
    setPirates(pirates.map((pirate) => pirate.location === prevCellCoordinate
      ? { ...pirate, location: nextCell.coordinate }
      : pirate
    ));

    setTurn(activePirate?.team === 1 ? 2 : 1);
  }

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
    setActivePirate({ ...activePirate, withCoin: true });
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
    gold,
    turn,
    handleSetActivePirate,
    setPirates,
    movePirate,
    moveShip,
    pickUpCoin,
    throwCoin,
  }
  return (<IslandContext.Provider value={value}>
    {children}
  </IslandContext.Provider>)
};

export const useIslandContext = () => useContext(IslandContext);