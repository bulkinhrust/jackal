import React, { useEffect, useState } from 'react';

import classes from './App.module.scss';
import Cell from '../Cell';
import { Field } from '../../types/Field';

const SIZE = 5;
const TREASURE = 8; // 1
const CANNIBAL = 2; // -1

const fillByValue = (fieldsNumber: number, value: number, fieldArray: Field[]) => {
  for (let i = 0; i < fieldsNumber;) {
    const x = Math.floor(Math.random() * SIZE);
    const y = Math.floor(Math.random() * SIZE);
    const key = y * SIZE + x;
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
  const [map, setMap] = useState<Field[]>([]);

  useEffect(() => {
    let result: Field[] = new Array(SIZE * SIZE).fill(0).map((_, key) => ({
      place: `${key}`,
      value: 0,
      isClosed: true,
    }));
    // наполнение поля сокровищами
    fillByValue(TREASURE, 1, result);
    // наполнение поля людоедами
    fillByValue(CANNIBAL, -1, result);
    setMap(result);
  }, []);

  return (
    <div className={classes.component}>
      {map.map((field) => (
        <Cell key={field.place} field={field} />
      ))}
    </div>
  );
}

export default App;
