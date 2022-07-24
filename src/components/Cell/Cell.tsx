import React, { useMemo } from 'react';
import clsx from 'clsx';

import classes from './Cell.module.scss';
import CellType from '../../types/Cell';
import Pirate from '../Pirate';
import { useIslandContext } from '../../context/IslandContext';

type Props = {
  cell: CellType;
};

const style: { [key: string]: string } = {
  '-1': 'crocodile',
  '0': 'none',
  '1': 'treasure'
};

const Cell: React.FC<Props> = (props) => {
  const {
    cell, cell: { coordinate, value, isClosed, coins },
  } = props;

  const {
    pirates, availablePaths,
    movePirate, handleSetActivePirate, pickUpCoin,
  } = useIslandContext();

  const piratesHere = pirates.filter(({ location }) => location === coordinate);
  const isAvailable = useMemo(() => availablePaths.includes(coordinate), [availablePaths]);

  const handleClick = () => {
    if (isAvailable) {
      movePirate(cell);
    }
    handleSetActivePirate(undefined);
  }

  const handleCoinClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    if (isAvailable) {
      handleClick();
      return;
    }
    pickUpCoin(cell);
  }

  return (
    <div
      key={coordinate}
      id={`${coordinate}`}
      onClick={handleClick}
      className={clsx(
        classes.component,
        classes[style[`${value}`]],
        classes[isClosed ? 'closed' : ''],
        classes[isAvailable ? 'available' : ''],
      )}
    >
      {piratesHere.length > 0 && <div className={classes[`pirates_${piratesHere.length}`]}>
        {piratesHere.map((pirate) => <Pirate key={pirate.name} pirate={pirate} />)}
      </div>}
      {coins > 0 && !isClosed && <div className={classes.coin} onClick={handleCoinClick}>{coins}</div>}
    </div>
  );
};

export default Cell;
