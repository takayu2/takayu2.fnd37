import { useState, useEffect, useRef } from 'react'; // React のフックをインポート
import Layout from '../components/Layout'; // レイアウトコンポーネントをインポート

const ROWS = 20; // フィールドの行数
const COLS = 10; // フィールドの列数
const BLOCK = '■'; // ブロックを表す文字
const EMPTY = '　'; // 空白を表す全角スペース

// 型定義
type Matrix = number[][]; // 2次元配列でブロック形状を表す
type Board = number[][]; // ゲーム盤面の型

type Tetromino = {
  shape: Matrix; // ブロックの形状
  name: string;  // ブロック名（O, I, T など）
};

// 7種類のミノ定義
const TETROMINOES: Tetromino[] = [
  { name: 'T', shape: [[0, 1, 0], [1, 1, 1]] },
  { name: 'I', shape: [[1, 1, 1, 1]] },
  { name: 'J', shape: [[1, 0, 0], [1, 1, 1]] },
  { name: 'L', shape: [[0, 0, 1], [1, 1, 1]] },
  { name: 'Z', shape: [[1, 1, 0], [0, 1, 1]] },
  { name: 'S', shape: [[0, 1, 1], [1, 1, 0]] },
  { name: 'O', shape: [[1, 1], [1, 1]] }
];

interface Block {
  shape: Matrix; // 現在のブロックの形
  x: number;     // フィールド上のX座標
  y: number;     // フィールド上のY座標
  name: string;  // ブロック名
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function rotate(shape: Matrix): Matrix {
  const height = shape.length;
  const width = shape[0].length;
  const rotated: Matrix = [];

  for (let x = 0; x < width; x++) {
    const row: number[] = [];
    for (let y = height - 1; y >= 0; y--) {
      row.push(shape[y][x]);
    }
    rotated.push(row);
  }
  return rotated;
}

function createEmptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

const GamePage: React.FC = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [block, setBlock] = useState<Block | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const tetrominoQueueRef = useRef<Tetromino[]>([]);

  function getNextTetromino(): Tetromino {
    if (tetrominoQueueRef.current.length === 0) {
      tetrominoQueueRef.current = shuffle(TETROMINOES);
    }
    return tetrominoQueueRef.current.pop()!;
  }

  function createNewBlock(): Block {
    const tetromino = getNextTetromino();
    return {
      shape: tetromino.shape,
      name: tetromino.name,
      x: Math.floor((COLS - tetromino.shape[0].length) / 2),
      y: 0
    };
  }

  useEffect(() => {
    if (!block) {
      setBlock(createNewBlock());
    }
  }, [block]);

  useEffect(() => {
    if (gameOver || !block) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'a') moveBlock(-1, 0);
      if (e.key === 'd') moveBlock(1, 0);
      if (e.key === 's') moveBlock(0, 1);
      if (e.key === 'j') rotateBlock();
    };

    document.addEventListener('keydown', handleKeyDown);
    intervalRef.current = setInterval(() => moveBlock(0, 1), 500 - (score * 2));;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [block, gameOver]);

  function isValidMove(shape: Matrix, x: number, y: number): boolean {
    return shape.every((row, rowIndex) =>
      row.every((cell, colIndex) => {
        if (!cell) return true;
        const newX = x + colIndex;
        const newY = y + rowIndex;
        return (
          newX >= 0 &&
          newX < COLS &&
          newY < ROWS &&
          (newY < 0 || board[newY][newX] === 0)
        );
      })
    );
  }

  function moveBlock(dx: number, dy: number): void {
    if (!block) return;
    const newX = block.x + dx;
    const newY = block.y + dy;

    if (isValidMove(block.shape, newX, newY)) {
      setBlock(prev => prev ? { ...prev, x: newX, y: newY } : null);
    } else if (dy === 1) {
      const newBoard = mergeBlock(board, block);
      const { board: clearedBoard, linesCleared } = clearLinesWithCount(newBoard);
      setBoard(clearedBoard);
      updateScore(linesCleared);

      const nextBlock = createNewBlock();
      if (!isValidMove(nextBlock.shape, nextBlock.x, nextBlock.y)) {
        setGameOver(true);
      } else {
        setBlock(nextBlock);
      }
    }
  }

  function rotateBlock() {
    if (!block || block.name === 'O') return;
    const rotatedShape = rotate(block.shape);
    if (isValidMove(rotatedShape, block.x, block.y)) {
      setBlock(prev => prev ? { ...prev, shape: rotatedShape } : null);
    }
  }

  function mergeBlock(board: Board, block: Block): Board {
    const newBoard = board.map(row => [...row]);
    block.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell && block.y + y >= 0) {
          newBoard[block.y + y][block.x + x] = 1;
        }
      });
    });
    return newBoard;
  }

  function clearLinesWithCount(board: Board): { board: Board; linesCleared: number } {
    const filtered = board.filter(row => !row.every(cell => cell === 1));
    const linesCleared = ROWS - filtered.length;
    const newRows = Array.from({ length: linesCleared }, () => Array(COLS).fill(0));
    return { board: [...newRows, ...filtered], linesCleared };
  }

  function updateScore(linesCleared: number) {
    const points = [0, 1, 3, 6, 10];
    setScore(prev => prev + points[linesCleared]);
  }

  function renderCell(cell: number, x: number, y: number): string {
    if (!block) return EMPTY;
    const { shape, x: bx, y: by } = block;
    const isBlock = shape.some((row, sy) =>
      row.some((val, sx) => val && bx + sx === x && by + sy === y)
    );
    return isBlock || cell ? BLOCK : EMPTY;
  }

  function handleRetry() {
    setBoard(createEmptyBoard());
    setBlock(createNewBlock());
    setScore(0);
    setGameOver(false);
  }

  return (
    <Layout>
      <div style={{ backgroundColor: 'rgba(224, 224, 224, 0.8)', width: '200px', padding: '10px 20px' }}>
        <h2 style={{ color: 'red'}}>Score: {score}</h2>
        <div style={{
          fontFamily: 'monospace',
          whiteSpace: 'pre',
          lineHeight: '1.1',
          fontSize: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          width:'200px' }}>
          {block && board.map((row, y) =>
            row.map((cell, x) => renderCell(cell, x, y)).join('') + '\n'
          )}
        </div>
        <div>操作方法</div>
        <div>←[A] ↓[S] →[D] 回転[J]</div>
        {gameOver && (
          <div>
            <h2 style={{ color: 'red' }}>Game Over</h2>
            <button onClick={handleRetry}>もう一度遊ぶ</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GamePage;