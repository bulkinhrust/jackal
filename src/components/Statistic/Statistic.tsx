import React from 'react';
import clsx from 'clsx';

import classes from './Statistic.module.scss';
import PirateType from '../../types/Pirate';

type Props = {
  pirates: PirateType[];
  gold: number;
  yourTurn: boolean;
  activePirateName?: string;
};

const Statistic: React.FC<Props> = (props) => {
  const { pirates, gold, yourTurn, activePirateName } = props;

  return (
    <div className={classes.component}>
      <p className={classes.gold}>Gold: {gold}</p>
      {pirates.map((pirate) => (
        <div
          key={pirate.name}
          className={clsx(classes.pirate, pirate.location === 'dead' ? classes.dead : '')}
          style={{ border: `${activePirateName === pirate.name ? 3 : 1}px solid ${pirates[0].color}` }}
        >
          {pirate.name}
        </div>
      ))}
      {yourTurn && <h2 style={{ color: pirates[0].color }}>Ваш ход</h2>}
    </div>
  );
};

export default Statistic;
