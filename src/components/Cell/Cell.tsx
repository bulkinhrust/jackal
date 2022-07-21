import React from 'react';
import clsx from 'clsx';

import classes from './Cell.module.scss';
import { CellType } from '../../types/Cell';
import Pirate from '../Pirate';
import {useIslandContext} from '../../context/IslandContext';

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
    cell: { place, value, isClosed },
  } = props;
  const { pirates } = useIslandContext();
  const piratesHere = pirates.filter(({ location }) => location === place);

  return (
    <div
      key={place}
      id={`${place}`}
      className={clsx(
        classes.component,
        classes[style[`${value}`]],
        classes[isClosed ? 'closed' : ''],
      )}
    >
      {piratesHere.map((pirate) => (<Pirate pirate={pirate} />))}
      {isClosed ? '' : value}
    </div>
  );
};

export default Cell;
