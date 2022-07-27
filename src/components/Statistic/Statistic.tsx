import React from 'react';

import classes from './Statistic.module.scss';
import PirateType from '../../types/Pirate';

type Props = {
  pirates: PirateType[];
  gold: number;
};

const Statistic: React.FC<Props> = (props) => {
  const { pirates, gold } = props;

  return (
    <div className={classes.component}>
      <p className={classes.gold}>Gold: {gold}</p>
      {pirates.map((pirate) => (
        <div key={pirate.name} className={classes.pirate} style={{ border: `1px solid ${pirates[0].color}`}}>
          {pirate.name}
        </div>
      ))}
    </div>
  );
};

export default Statistic;
