import React from 'react';

import classes from './App.module.scss';
import Cell from '../Cell';
import SeaCell from '../SeaCell';
import { useIslandContext } from '../../context/IslandContext';

const App: React.FC = () => {
  const { island, sea } = useIslandContext();

  return (
    <div className={classes.component}>
      {sea[0].map((cell) => (
        <SeaCell cell={cell} />
      ))}
      {island.map((cell) => (
        <Cell
          key={cell.coordinate}
          cell={cell}
        />
      ))}
      {sea[1].map((cell) => (
        <SeaCell cell={cell} />
      ))}
    </div>
  );
}

export default App;
