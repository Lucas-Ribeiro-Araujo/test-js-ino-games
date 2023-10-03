type GameConfig = {
  columns: number;
}

type AnticipatorConfig = {
  columnSize: number;
  minToAnticipate: number;
  maxToAnticipate: number;
  anticipateCadence: number;
  defaultCadence: number;
};

type SlotCoordinate = {
  column: number;
  row: number;
};

type SpecialSymbol = { specialSymbols: Array<SlotCoordinate> };

type RoundsSymbols = {
  roundOne: SpecialSymbol;
  roundTwo: SpecialSymbol;
  roundThree: SpecialSymbol;
  roundFour: SpecialSymbol;
};

type SlotCadence = Array<number>;

type RoundsCadences = {
  roundOne: SlotCadence;
  roundTwo: SlotCadence;
  roundThree: SlotCadence;
  roundFour: SlotCadence;
};

/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has.
 * @param minToAnticipate It's the minimum number of symbols to start anticipation.
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation.
 * @param anticipateCadence It's the cadence value when has anticipation.
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */

const gameConfig: GameConfig = {
  columns: 6,
}

const anticipatorConfig: AnticipatorConfig = {
  columnSize: 6, // number of rows
  minToAnticipate: 1, // number of symbols to start anticipation
  maxToAnticipate: 2, // number of symbols to end anticipation
  anticipateCadence: 2,
  defaultCadence: 1,
};

/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
const gameRounds: RoundsSymbols = {
  roundOne: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 1, row: 3 },
      { column: 3, row: 4 },
    ],
  },
  roundTwo: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 0, row: 3 },
    ],
  },
  roundThree: {
    specialSymbols: [
      { column: 4, row: 2 },
      { column: 4, row: 3 },
    ],
  },
  // case example from README.md
  roundFour: { 
    specialSymbols: [
      { column: 1, row: 2 },
      { column: 4, row: 3 },
    ],
  },
};

// This must be used to get all game rounds cadences.
const slotMachineCadences: RoundsCadences = { roundOne: [], roundTwo: [], roundThree: [], roundFour: [] };

/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function slotCadence(symbols: Array<SlotCoordinate>): SlotCadence {
  let final_cadence: SlotCadence = []
  let anticipate:boolean = false
  let symbol_count = 0

  // for every collumn, index = column
  for (let index = 0; index < gameConfig.columns; index++) {
    let new_candence: number = 0

    // if is not first column
    if (index != 0) {
      // check if we need to stop anticipation
      if (symbol_count >= anticipatorConfig.maxToAnticipate){
        anticipate = false
      }

      // get last cadence
      new_candence = final_cadence[index - 1] 
      new_candence += anticipate ?  anticipatorConfig.anticipateCadence : anticipatorConfig.defaultCadence
    }

    // special symbols in this column
    let special_symbols: SlotCoordinate[] = [] 
    special_symbols = symbols.filter(c => c.column == index)
    symbol_count += special_symbols.length

    // check if we can start anticipation
    if (symbol_count >= anticipatorConfig.minToAnticipate) {
      anticipate = true 
    }

    final_cadence.push(new_candence)
  }

  return final_cadence;
}

/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds: RoundsSymbols): RoundsCadences {
  slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
  slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
  slotMachineCadences.roundThree = slotCadence(rounds.roundThree.specialSymbols);
  slotMachineCadences.roundFour = slotCadence(rounds.roundFour.specialSymbols);

  return slotMachineCadences;
}

console.log('CADENCES: ', handleCadences(gameRounds));
