import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import classes from './App.module.scss';

type FieldParams = {
  place: string,
  value: number,
  isClosed: boolean,
};
type Field = FieldParams[];

const SIZE = 5;
const TREASURE = 8; // 1
const CROCODILE = 2; // -1

const style: { [key: string]: string } = {
  '-1': 'crocodile',
  '0': 'none',
  '1': 'treasure'
};

const fillByValue = (fieldsNumber: number, value: number, fieldArray: Field) => {
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
  const [map, setMap] = useState<Field>([]);

  useEffect(() => {
    console.log('field start');
    let result: Field = new Array(SIZE * SIZE).fill(0).map((_, key) => ({
      place: `${key}`,
      value: 0,
      isClosed: true,
    }));
    // наполнение поля сокровищами
    fillByValue(TREASURE, 1, result);
    // наполнение поля крокодилами
    fillByValue(CROCODILE, -1, result);
    setMap(result);
  }, []);

  const handleFieldOpen = (place: string) => {
    setMap(map.map((field) => field.place === place
      ? { ...field, isClosed: false }
      : field
    ));
  };

  return (
    <div className={classes.component}>
      {map.map(({ place, value, isClosed,  }) => (
        <div
          key={place}
          id={place}
          className={clsx(
            classes[style[`${value}`]],
            classes[isClosed ? 'closed' : ''],
          )}
          onClick={() => handleFieldOpen(place)}
        >
          {isClosed ? '' : value}
        </div>
      ))}
    </div>
  );
}

export default App;
