import SeaCell from '../../types/SeaCell';

const getAvailablePaths = (currentCell: string, size: number, sea: SeaCell[][]): string[] => { // 12, 5
  const x = +currentCell % size; // 2
  const y = Math.floor(+currentCell / size); // 2
  const availablePaths: string[] = [];

  const cell = (x: number, y: number) => {
    if (x >= 0 && y >= 0 && x < size && y < size) {
      availablePaths.push(`${y * size + x}`);
    }
  }

  if (y === 0 || y === size - 1) {
    const ship = y === 0 ? 0 : 1;
    const shipCoordinate = +(sea[ship].find((seaCell) => seaCell.withShip)?.coordinate || '').split('')[2];
    if (shipCoordinate === x || shipCoordinate === x + 1 || shipCoordinate === x - 1) {
      availablePaths.push(`-${ship}${shipCoordinate}`);
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