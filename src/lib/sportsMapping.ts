export const sportsDetailsMapping = {
  "soccer": {
    name: "Soccer",
    mainHeaderFilters: [
      { label: "Fulltime Result", value: "fulltimeResult" },
      { label: "Match Goals", value: "matchGoals" },
      { label: "Asian Handicap In-play", value: "asianHandicapInPlay" },
      { label: "Goal Line In-Play", value: "goalLineInPlay" },
    ],
  },
  "basketball": {
    name: "Basketball",
    mainHeaderFilters: [
      { label: "Game Lines", value: "gamelines" },
      { label: "Tied At End Of Regulation", value: "tiedAtEndOfRegulation" },
    ],
  },
  "tennis": {
    name: "Tennis",
    mainHeaderFilters: [
      { label: "Winner", value: "winner" },
      { label: "Next Game", value: "nextGame" },
      { label: "Current Set", value: "currentSet" },
    ],
  },
  "baseball": {
    name: "Baseball",
    mainHeaderFilters: [
      { label: "Game Lines", value: "gamelines" },
    ],
  },
  "volleyball": {
    name: "Volleyball",
    mainHeaderFilters: [
      { label: "Match Winner", value: "matchWinner" },
      { label: "Match Handicap (Sets)", value: "matchHandicapSets" },
      { label: "Match Total", value: "matchTotal" },
      { label: "Current Set", value: "currentSet" },
      { label: "Current Set Handicap", value: "currentSetHandicap" },
    ],
  },
  "esports": {
    name: "Esports",
    mainHeaderFilters: [
      { label: "Map Winner", value: "mapWinner" },
      { label: "Match Winner", value: "matchWinner" },
      { label: "Match Handicap", value: "matchHandicap" },
      { label: "Total Maps", value: "totalMaps" },
    ],
  },
  "hockey": {
    name: "Hockey",
    mainHeaderFilters: [
      { label: "Game Lines", value: "gamelines" },
      { label: "Game Lines 3-Way", value: "gamelines3way"},
      { label: "Period Lines", value: "periodlines"}
    ],
  }
};

export const categoriesMapping = {
  "fulltimeResult": "Fulltime Result",
  "matchGoals": "Match Goals",
  "asianHandicapInPlay" : "Asian Handicap",
  "goalLineInPlay": "Over/Under Line"
}

export const hockeyCategoriesMapping = {
  "gamelines": "Game Lines Line",
  "gamelines3way": "Over/Under (3 Ways)",
  "periodlines": "Game Lines Total"
}

export const defaultSubcategories={
  "soccer": "fulltimeResult",
  "tennis": "winner",
  "basketball": "gamelines",
  "volleyball": "matchWinner",
  "esports": "mapWinner",
  "baseball": "gamelines",
  "hockey": "gamelines",
}