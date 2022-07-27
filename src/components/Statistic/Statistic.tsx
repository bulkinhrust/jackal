import React from 'react';

import classes from './Statistic.module.scss';
import PirateType from '../../types/Pirate';

type Props = {
  pirates: PirateType[];
  gold: number;
  yourTurn: boolean;
};

const Statistic: React.FC<Props> = (props) => {
  const { pirates, gold, yourTurn } = props;

  return (
    <div className={classes.component}>
      <p className={classes.gold}>Gold: {gold}</p>
      {pirates.map((pirate) => (
        <div key={pirate.name} className={classes.pirate} style={{ border: `1px solid ${pirates[0].color}` }}>
          {pirate.name}
        </div>
      ))}
      {yourTurn && <h2 style={{ color: pirates[0].color }}>Ваш ход</h2>}
    </div>
  );
};

export default Statistic;
