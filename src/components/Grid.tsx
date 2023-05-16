import React, { useState } from 'react';

function randomizeArrays(arr: any[]) {
  const newArr = [...arr];
  const result: Array<any[]> = [[], [], [], []];

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  for (let i = 0; i < newArr.length; i++) {
    const row = Math.floor(i / 4);
    result[row].push(newArr[i]);
  }

  return result;
}

interface Animal {
  id: number;
  name: string;
  number: number;
}

const animals = [
  { id: 1, name: 'Lion', number: 0 },
  { id: 2, name: 'Elephant', number: 1 },
  { id: 3, name: 'Giraffe', number: 2 },
  { id: 4, name: 'Zebra', number: 3 },
  { id: 5, name: 'Hippo', number: 4 },
  { id: 6, name: 'Crocodile', number: 5 },
  { id: 7, name: 'Kangaroo', number: 6 },
  { id: 8, name: 'Koala', number: 7 },
  { id: 9, name: 'Penguin', number: 8 },
  { id: 10, name: 'Panda', number: 9 },
  { id: 11, name: 'Gorilla', number: 10 },
  { id: 12, name: 'Toucan', number: 11 },
  { id: 13, name: 'Flamingo', number: 12 },
  { id: 14, name: 'Kookaburra', number: 13 },
  { id: 15, name: 'Kangaroo Rat', number: 14 },
  { id: 16, name: 'Red Panda', number: 15 }
];

const Grid = () => {
  const [grid, setGrid] = useState(() => {
    const initialGrid = randomizeArrays(animals);
    console.log(initialGrid);

    return initialGrid;
  });
  const [lastClicked, setLastClicked] = useState<{ row: number; col: number } | null>(null);

  const handleClick = (row: number, col: number) => {
    if (lastClicked?.row === row && lastClicked?.col === col) {
      setLastClicked(null);
    }

    if (lastClicked === null) {
      // First square clicked
      setLastClicked({ row, col });
    } else {
      const firstValue = grid[lastClicked.row][lastClicked.col];
      const secondValue = grid[row][col];
      console.log({ firstValue, secondValue });

      if (firstValue.number < secondValue.number) {
        return;
      }

      // Second square clicked, check if adjacent
      const isAdjacent = Math.abs(row - lastClicked.row) + Math.abs(col - lastClicked.col) === 1;

      if (isAdjacent) {
        const numberDiff = firstValue.number - secondValue.number;
        console.log({ numberDiff });

        if (numberDiff <= 3) {
          setGrid((prevGrid) => {
            const newGrid = JSON.parse(JSON.stringify(prevGrid));
            newGrid[lastClicked.row][lastClicked.col] = { ...secondValue, number: -1, name: '' };
            newGrid[row][col] = { ...firstValue };

            setLastClicked(null);
            return newGrid;
          });
        }
      } else {
        // Squares are not adjacent, do nothing or show an error message
        console.log('Squares are not adjacent.');
      }
    }
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="row">
          {row.map(({ id, name, number }, colIndex) => {
            if (number < 0) {
              return (
                <div
                  key={`square-${id}`}
                  className="square"
                  style={{
                    width: '124px',
                    height: '180px'
                  }}
                ></div>
              );
            } else {
              return (
                <div
                  key={`square-${id}`}
                  className="square"
                  style={{
                    width: '124px',
                    height: '180px',
                    color: grid[lastClicked?.row]?.[lastClicked?.col].id === id ? 'red' : 'black'
                  }}
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {number} - {name}
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
