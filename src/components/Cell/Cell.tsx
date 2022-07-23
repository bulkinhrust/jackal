import React, { memo } from 'react';
import clsx from 'clsx';

import classes from './Cell.module.scss';
import { CellType } from '../../types/Cell';
import Pirate from '../Pirate';
import { PirateType } from '../../types/Pirate';

type Props = {
  cell: CellType;
  pirates: PirateType[];
  isAvailable: boolean;
  movePirate: (cell: CellType) => void;
  handleSetActivePirate: (pirate?: PirateType) => void;
};

const style: { [key: string]: string } = {
  '-1': 'crocodile',
  '0': 'none',
  '1': 'treasure'
};

const Cell: React.FC<Props> = (props) => {
  const {
    cell, cell: { place, value, isClosed },
    pirates,
    isAvailable,
    movePirate,
    handleSetActivePirate,
  } = props;

  const handleClick = () => {
    if (isAvailable) {
      movePirate(cell);
    }
    handleSetActivePirate(undefined);
  }

  return (
    <div
      key={place}
      id={`${place}`}
      onClick={handleClick}
      className={clsx(
        classes.component,
        classes[style[`${value}`]],
        classes[isClosed ? 'closed' : ''],
        classes[isAvailable ? 'available' : ''],
      )}
    >
      {pirates.length > 0 && <div className={classes[`pirates_${pirates.length}`]}>
        {pirates.map((pirate) => <Pirate key={pirate.name} pirate={pirate} />)}
      </div>}
    </div>
  );
};

const isEqual = (prev: Props, next: Props) => (
  prev.isAvailable === next.isAvailable && prev.pirates?.length === next.pirates?.length
);

export default memo(Cell, isEqual);
