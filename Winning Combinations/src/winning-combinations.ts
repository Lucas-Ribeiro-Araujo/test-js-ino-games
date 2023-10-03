type combination = { number_symbol: number, indexes: number[] }
type WinningCombinationsResult = [number, number[]][]

/* ABOUT
winning line == 3 matching symbols, in sequence

symbols:
  wild = 0
  paying = 1,2,3,4,5,6,7,8,9
  non-paying = 10,11,12,13,14,15
*/

function call(line: number[]): WinningCombinationsResult {
  let results: WinningCombinationsResult = []
  let combinations: combination[] = []  // paying symbols that repeat
  let wild_symbol_indexes: number[] = []  // all wild symbol positions

  // Create combinations
  for (let index = 0; index < line.length; index++) {
    const number_symbol = line[index]

    // if non-paying skip
    if (number_symbol > 9) continue;

    // else if is wild symbol save it for later
    else if (number_symbol == 0) {
      wild_symbol_indexes.push(index)
      continue;
    }

    // if a combination with this symbol already exist...
    let combination = combinations.find(e => e.number_symbol == number_symbol)

    if (combination) { // add this iteration to the indexes
      combination.indexes.push(index)
    }
    else { // create new symbol combination
      combinations.push({ number_symbol: number_symbol, indexes: [index] })
    }
  }

  // Clean combinations
  combinations.forEach(c => {
    // create new sequence with the line wild symbols
    let wild_sequence: number[] = []
    wild_sequence = c.indexes.concat(wild_symbol_indexes)
    wild_sequence = wild_sequence.sort()
    wild_sequence = wild_sequence.filter((n, i) => {
      return (n + 1 === wild_sequence[i + 1] || n - 1 === wild_sequence[i - 1])
    })

    // if it makes a sequence use it
    if (is_array_sequential(wild_sequence)) {
      c.indexes = wild_sequence
    }
  })

  // edge case: if there are no combinations checks if we can make one with only wild symbols
  if (combinations.length == 0 && is_array_sequential(wild_symbol_indexes)) {
    combinations.push({ number_symbol: 0, indexes: wild_symbol_indexes })
  }

  // filter invalid combinations
  combinations = combinations.filter((combination) => {
    return (is_array_sequential(combination.indexes) && combination.indexes.length >= 3)
  })

  // map combinations object to result array
  results = combinations.map(c => [c.number_symbol, c.indexes])

  return results
}

// checks if an array is sequential with no intervals
function is_array_sequential(array: number[]): boolean {
  var is_sequence: boolean = true
  for (var i = 0; i < array.length - 1; i++) {
    if (array[i] + 1 !== array[i + 1]) {
      is_sequence = false
    }
  }
  return is_sequence
}

export const WinningCombinations = { call } 