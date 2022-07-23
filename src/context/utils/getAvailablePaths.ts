const getAvailablePaths = (currentCell: number, size: number): number[] => { // 12, 5
  const x = currentCell % size; // 2
  const y = Math.floor(currentCell / size); // 2
  const availablePaths: number[] = [];

  const cell = (x: number, y: number) => {
    if (x >= 0 && y >= 0 && x < size && y < size) {
      availablePaths.push(y * size + x);
    }
  }

  cell(x-1, y-1);
  cell(x, y-1);
  cell(x+1, y-1);
  cell(x-1, y);
  cell(x+1, y);
  cell(x-1, y+1);
  cell(x, y+1);
  cell(x+1, y+1);

  return availablePaths;
};

export default getAvailablePaths;