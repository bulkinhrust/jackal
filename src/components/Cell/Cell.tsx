import React from 'react';
import clsx from 'clsx';

import classes from './Cell.module.scss';
import { Field } from '../../types/Field';

type Props = {
  field: Field,
};

const style: { [key: string]: string } = {
  '-1': 'crocodile',
  '0': 'none',
  '1': 'treasure'
};

const Cell: React.FC<Props> = (props) => {
  const {
    field: { place, value, isClosed },
  } = props;

  return (
    <div
      key={place}
      id={place}
      className={clsx(
        classes[style[`${value}`]],
        classes[isClosed ? 'closed' : ''],
      )}
    >
      {isClosed ? '' : value}
    </div>
  );
};

export default Cell;
