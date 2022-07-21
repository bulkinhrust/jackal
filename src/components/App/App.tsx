import React, { useEffect, useState } from 'react';

import classes from './App.module.scss';
import Cell from '../Cell';
import { CellType } from '../../types/Cell';
import { useIslandContext } from '../../context/IslandContext';

const TREASURE = 8; // 1
const CANNIBAL = 2; // -1

const fillByValue = (fieldsNumber: number, value: number, fieldArray: CellType[], size: number) => {
  for (let i = 0; i < fieldsNumber;) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const key = y * size + x;
    if (fieldArray[key].value !== 0) {
      continue;
    }
    fieldArray[key] = {
      ...fieldArray[key],
      value,
    };
    ++i;
  }
  return fieldArray;
};

const App: React.FC = () => {
  const [island, setIsland] = useState<CellType[]>([]);
  const { size } = useIslandContext();

  useEffect(() => {
    let result: CellType[] = new Array(size * size).fill(0).map((_, key) => ({
      place: key,
      value: 0,
      isClosed: true,
    }));
    // наполнение поля сокровищами
    fillByValue(TREASURE, 1, result, size);
    // наполнение поля людоедами
    fillByValue(CANNIBAL, -1, result, size);
    setIsland(result);
  }, []); // eslint-disable react-hooks/exhaustive-deps

  return (
    <div className={classes.component}>
      {island.map((cell) => (
        <Cell key={cell.place} cell={cell}/>
      ))}
    </div>
  );
}

export default App;
