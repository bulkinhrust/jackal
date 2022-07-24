import React from 'react';

import SeaCellType from '../../types/SeaCell';
import classes from './SeaCell.module.scss';

type Props = {
  cell: SeaCellType;
};

const SeaCell: React.FC<Props> = (props) => {
  const { cell: { coordinate } } = props;

  return (
    <div id={`${coordinate}`} className={classes.component}>
      SeaCell
    </div>
  );
};

export default SeaCell;
