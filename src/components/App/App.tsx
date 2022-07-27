import React from 'react';

import classes from './App.module.scss';
import Cell from '../Cell';
import SeaCell from '../SeaCell';
import Statistic from '../Statistic';
import { useIslandContext } from '../../context/IslandContext';

const App: React.FC = () => {
  const { island, sea, pirates, gold } = useIslandContext();

  return (
    <div className={classes.component}>
      <Statistic pirates={pirates.filter(({ team }) => team === 1)} gold={gold[1]} />
      <div className={classes.field}>
        {sea[0].map((cell) => (
          <SeaCell key={cell.coordinate} cell={cell} />
        ))}
        {island.map((cell) => (
          <Cell key={cell.coordinate} cell={cell} />
        ))}
        {sea[1].map((cell) => (
          <SeaCell key={cell.coordinate} cell={cell} />
        ))}
      </div>
      <Statistic pirates={pirates.filter(({ team }) => team === 2)} gold={gold[2]} />
    </div>
  );
}

export default App;
