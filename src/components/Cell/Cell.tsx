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
  movePirate: (cell: number) => void;
  handleSetActivePirate: (pirate?: PirateType) => void;
};

const style: { [key: string]: string } = {
  '-1': 'crocodile',
  '0': 'none',
  '1': 'treasure'
};

const Cell: React.FC<Props> = (props) => {
  const {
    cell: { place, value, isClosed },
    pirates,
    isAvailable,
    movePirate,
    handleSetActivePirate,
  } = props;

  const handleClick = () => {
    if (isAvailable) {
      movePirate(place);
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
      {pirates.map((pirate) => <Pirate key={pirate.name} pirate={pirate} />)}
      {isClosed ? '' : value}
    </div>
  );
};

const isEqual = (prev: Props, next: Props) => (
  prev.isAvailable === next.isAvailable && prev.pirates?.length === next.pirates?.length
);

export default memo(Cell, isEqual);
