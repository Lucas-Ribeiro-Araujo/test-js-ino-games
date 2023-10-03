import { WinningCombinations } from './winning-combinations';

test.each([
  [[1, 6, 6, 7, 2, 3], []],
  [[1, 6, 6, 7, 2, 2], []],
  [[1, 2, 6, 6, 6], [[6, [2, 3, 4]]]],
  [[3, 3, 3, 8, 6, 3], [[3, [0, 1, 2]]]],
  [[3, 3, 3, 8, 8, 8], [[3, [0, 1, 2]], [8, [3, 4, 5]]]],
  [[3, 4, 3, 3, 3, 3], [[3, [2, 3, 4, 5]]]],
  [[9, 9, 5, 9, 9], []],
  [[9, 5, 5, 9, 9], []],
  [[9, 5, 9, 5, 9], []],
  [[9, 5, 9, 5, 9], []],
  [[5, 9, 5, 9, 5], []],
  [[6, 6, 3, 0, 6], []],
  [[1, 2, 0, 0, 3, 3], [[2, [1, 2, 3]], [3, [2, 3, 4, 5]]]],
  [[1, 1, 0, 0, 3, 3], [[1, [0, 1, 2, 3]], [3, [2, 3, 4, 5]]]],
  [[0, 0, 0, 3, 3, 3], [[3, [0, 1, 2, 3, 4, 5]]]],
  [[0, 0, 2, 3, 3, 3], [[2, [0, 1, 2]], [3, [3, 4, 5]]]],
  [[2, 0, 0, 3, 3, 3], [[2, [0, 1, 2]], [3, [1, 2, 3, 4, 5]]]],
  [[4, 4, 6, 0, 2, 2], [[2, [3, 4, 5]]]],
  [[3, 5, 8, 5, 5, 0], [[5, [3, 4, 5]]]],
  [[3, 0, 3, 4, 4, 0], [[3, [0, 1, 2]], [4, [3, 4, 5]]]],
  [[0, 8, 6, 8, 8], []],
  [[8, 8, 6, 8, 0], []],
  [[0, 0, 0, 0, 8], [[8, [0, 1, 2, 3, 4]]]],
  [[8, 0, 0, 0, 0], [[8, [0, 1, 2, 3, 4]]]],
  [[0, 0, 0, 0, 0], [[0, [0, 1, 2, 3, 4]]]],
  [[1, 1, 2, 0, 0], [[2, [2, 3, 4]]]],
  [[11, 0, 0, 7, 4], [[7, [1, 2, 3]]]],
  [[3, 3, 0, 4, 4], [[3, [0, 1, 2]],[4, [2, 3 ,4 ]]]]
])
  ('when line is %j returns %j', (line, expected) => {
    const received = WinningCombinations.call(line);
    expect(received).toEqual(expected);
  });