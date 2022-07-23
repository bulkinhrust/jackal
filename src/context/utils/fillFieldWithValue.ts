import { CellType } from '../../types/Cell';

const fillFieldWithValue = (fieldsNumber: number, value: number, fieldArray: CellType[], size: number) => {
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

export default fillFieldWithValue;