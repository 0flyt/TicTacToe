import { useState } from 'react';

export function TicTacToe() {
  const winnerCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const board = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const [p1Turns, setP1Turns] = useState<number[]>([]);
  const [p2Turns, setP2Turns] = useState<number[]>([]);

  const whosTurn = p1Turns.length == p2Turns.length;

  function turnAction(boardIndex: number) {
    if (p1Turns.includes(boardIndex) || p2Turns.includes(boardIndex)) return;
    const updateTurn = whosTurn
      ? setP1Turns([...p1Turns, boardIndex])
      : setP2Turns([...p2Turns, boardIndex]);

    return updateTurn;
  }

  function boardSymbol(boardIndex: number) {
    if (p1Turns.includes(boardIndex)) return 'X';

    if (p2Turns.includes(boardIndex)) return 'O';

    return '';
  }

  const draw = p1Turns.length == 5 || p2Turns.length == 5;

  const lastPlayer = p1Turns.length > p2Turns.length ? 1 : 2;
  const lastPlayerTurns = p1Turns.length > p2Turns.length ? p1Turns : p2Turns;
  const winner = winnerCombos.some((row) =>
    row.every((r) => lastPlayerTurns.includes(r)),
  );

  function resetGame() {
    setP1Turns([]);
    setP2Turns([]);
  }

  return (
    <>
      <h2>TicTacToe</h2>
      <div
        style={winner ? { pointerEvents: 'none' } : { pointerEvents: 'unset' }}
      >
        {board.map((row, index) => (
          <div
            style={{ display: 'flex', margin: '2px', gap: '2px' }}
            key={index}
          >
            {row.map((i) => (
              <div
                key={i}
                style={{
                  height: '50px',
                  width: '50px',
                  border: '1px solid black',
                  alignContent: 'center',
                  fontSize: '24px',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => turnAction(i)}
              >
                {boardSymbol(i)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p>
        {winner
          ? `Player ${lastPlayer} won`
          : draw
            ? 'Draw'
            : `Player ${whosTurn ? '1' : '2'}'s turn`}
      </p>
      {(winner || draw) && (
        <button onClick={() => resetGame()}>Spela igen</button>
      )}
    </>
  );
}
