import CellType from '../../types/Cell';
import Content from '../../types/Content';

const fillFieldWithValue = (content: Content, fieldArray: CellType[], size: number) => {
  for (let i = 0; i < content.count;) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const key = y * size + x;
    if (fieldArray[key].value !== 0) {
      continue;
    }
    fieldArray[key] = {
      ...fieldArray[key],
      value: content.value,
      coins: content.value === 1 ? 1 : 0,
    };
    ++i;
  }
  return fieldArray;
};

export default fillFieldWithValue;