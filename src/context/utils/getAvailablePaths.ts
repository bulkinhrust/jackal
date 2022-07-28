import SeaCell from '../../types/SeaCell';
import Pirate from '../../types/Pirate';
import Cell from '../../types/Cell';

const getAvailablePaths = (pirate: Pirate, size: number, island: Cell[], sea: SeaCell[][]): string[] => { // 12, 5
  const currentCell = pirate.location;
  const availablePaths: string[] = [];

  if (currentCell.split('')[0] === '-') {
    const coords = currentCell.split('-');
    availablePaths.push(`-${coords[1]}-${+coords[2] - 1}`);
    availablePaths.push(`-${coords[1]}-${+coords[2] + 1}`);
    availablePaths.push(coords[2]);
    return availablePaths;
  }

  const x = +currentCell % size; // 2
  const y = Math.floor(+currentCell / size); // 2

  const cell = (x: number, y: number) => {
    if (pirate.withCoin && island[y * size + x]?.isClosed) {
      return;
    }
    if (x >= 0 && y >= 0 && x < size && y < size) {
      availablePaths.push(`${y * size + x}`);
    }
  }

  if ((y === 0 && pirate.team === 1) || (y === size - 1 && pirate.team === 2)) {
    const key = y === 0 ? 0 : 1;
    const ship = sea[key].find((seaCell) => seaCell.withShip) as SeaCell;
    const shipCoordinate = ship?.coordinate.split('-')[2];
    if (shipCoordinate === currentCell || +shipCoordinate === +currentCell + 1 || +shipCoordinate === +currentCell - 1) {
      availablePaths.push(ship.coordinate);
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