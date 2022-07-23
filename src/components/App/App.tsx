import React from 'react';

import classes from './App.module.scss';
import Cell from '../Cell';
import { useIslandContext } from '../../context/IslandContext';

const App: React.FC = () => {
  const { island } = useIslandContext();

  return (
    <div className={classes.component}>
      {island.map((cell) => (
        <Cell
          key={cell.place}
          cell={cell}
        />
      ))}
    </div>
  );
}

export default App;
