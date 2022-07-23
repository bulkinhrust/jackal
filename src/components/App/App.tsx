import React from 'react';

import classes from './App.module.scss';
import Cell from '../Cell';
import { useIslandContext } from '../../context/IslandContext';

const App: React.FC = () => {
  const {
    island, pirates, availablePaths,
    movePirate, handleSetActivePirate,
  } = useIslandContext();

  return (
    <div className={classes.component}>
      {island.map((cell) => (
        <Cell
          key={cell.place}
          cell={cell}
          pirates={pirates.filter(({ location }) => location === cell.place)}
          isAvailable={availablePaths.includes(cell.place)}
          movePirate={movePirate}
          handleSetActivePirate={handleSetActivePirate}
        />
      ))}
    </div>
  );
}

export default App;
