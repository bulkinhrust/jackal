import React from 'react';
import clsx from 'clsx';

import SeaCellType from '../../types/SeaCell';
import classes from './SeaCell.module.scss';
import { useIslandContext } from '../../context/IslandContext';

type Props = {
  cell: SeaCellType;
};

const SeaCell: React.FC<Props> = (props) => {
  const { cell: { coordinate, withShip } } = props;
  const { availablePaths } = useIslandContext();

  const isAvailable = availablePaths.includes(coordinate);

  return (
    <div id={`${coordinate}`} className={clsx(classes.component, classes[isAvailable ? 'active' : ''])}>
      {withShip && <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 78H95L73.4375 95H26.5625L5 78Z" fill="#644427"/>
        <path d="M50 8L83 63.7627L50 78V8Z" fill="white"/>
      </svg>}
    </div>
  );
};

export default SeaCell;
