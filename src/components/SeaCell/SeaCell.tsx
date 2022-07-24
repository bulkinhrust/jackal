import React from 'react';
import clsx from 'clsx';

import SeaCellType from '../../types/SeaCell';
import classes from './SeaCell.module.scss';
import { useIslandContext } from '../../context/IslandContext';
import Pirate from '../Pirate';

type Props = {
  cell: SeaCellType;
};

const SeaCell: React.FC<Props> = (props) => {
  const { cell, cell: { coordinate, withShip } } = props;
  const { availablePaths, pirates, movePirate, handleSetActivePirate } = useIslandContext();

  const isAvailable = availablePaths.includes(coordinate);
  const piratesHere = pirates.filter((pirate) => pirate.location === coordinate);

  const handleClick = () => {
    if (isAvailable) {
      movePirate(cell);
    }
    handleSetActivePirate(undefined);
  }

  return (
    <div
      id={coordinate}
      onClick={handleClick}
      className={clsx(classes.component, classes[isAvailable ? 'active' : ''])}
    >
      {withShip && <svg className={classes.ship} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 72H95L73.4375 95H26.5625L5 72Z" fill="#644427"/>
        <path d="M50 8L83 63.7627L50 70V8Z" fill="white"/>
      </svg>}

      {piratesHere.length > 0 && <div className={classes[`pirates_${piratesHere.length}`]}>
        {piratesHere.map((pirate) => <Pirate key={pirate.name} pirate={pirate} />)}
      </div>}
    </div>
  );
};

export default SeaCell;
