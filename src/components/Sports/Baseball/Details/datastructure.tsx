export const BaseballAll = {
    "gameLines": {
        marketname: "Game Lines",
        suspend: "0",
        header: ["", "Home", "Away"],
        rows: [
            [{ title: "Run Line", value: null, suspend: "0" }, { title: "+3.5", value: "2.50", suspend: "0" }, { title: "-3.5", value: "1.50", suspend: "0" }],
            [{ title: "Total", value: null, suspend: "0" }, { title: "O 9.5", value: "1.71", suspend: "0" }, { title: "U 9.5", value: "2.00", suspend: "0" }],
            [{ title: "Money Line", value: null, suspend: "0" }, { title: "", value: "17.00", suspend: "0" }, { title: "", value: "1.005", suspend: "0" }],
        ]
    },
    "alternativeRunLine": {
        marketname: "Alternative Run Line",
        suspend: "0",
        header: ["Home", "Away"],
        rows: [
            [{ title: "-1.5", value: "23.00", suspend: "0" }, { title: "+1.5", value: "1.002", suspend: "0" }],
            [{ title: "+1.5", value: "8.75", suspend: "0" }, { title: "-1.5", value: "1.044", suspend: "0" }],
            [{ title: "+2.5", value: "4.40", suspend: "0" }, { title: "-2.5", value: "1.18", suspend: "0" }],
            [{ title: "+4.5", value: "1.36", suspend: "0" }, { title: "-4.5", value: "3.00", suspend: "0" }],
            [{ title: "+5.5", value: "1.13", suspend: "0" }, { title: "-5.5", value: "5.25", suspend: "0" }],
            [{ title: "+6.5", value: "1.03", suspend: "0" }, { title: "-6.5", value: "10.00", suspend: "0" }],
        ]
    },
    "alternativeGameTotal": {
        marketname: "Alternative Game Total",
        suspend: "0",
        header: ["", "Over", "Under"],
        rows: [
            [{ title: "8.5", value: null, suspend: "0" }, { title: "", value: "1.23", suspend: "0" }, { title: "", value: "3.85", suspend: "0" }],
            [{ title: "10.5", value: null, suspend: "0" }, { title: "", value: "2.75", suspend: "0" }, { title: "", value: "1.40", suspend: "0" }],
            [{ title: "11.5", value: null, suspend: "0" }, { title: "", value: "4.50", suspend: "0" }, { title: "", value: "1.16", suspend: "0" }],
            [{ title: "12.5", value: null, suspend: "0" }, { title: "", value: "7.00", suspend: "0" }, { title: "", value: "1.083", suspend: "0" }],
        ]
    },
    "aRunScoredHomeInning8": {
        marketname: "A Run Scored - Home Inning 8",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Yes", value: "2.50", suspend: "0" }, { title: "No", value: "1.50", suspend: "0" }],
        ]
    },
    "nthInningLines": {
        marketname: "8th Inning Lines",
        suspend: "0",
        header: ["Home", "Away", "Tie"],
        rows: [
            [{ title: "Winner", value: null, suspend: "0" }, { title: "", value: "3.75", suspend: "0" }, { title: "", value: "2.45", suspend: "0" }, { title: "", value: "2.35", suspend: "0" }],
        ]
    },
    "nthInningRuns": {
        marketname: "8th Inning Runs",
        suspend: "0",
        header: ["Score"],
        rows: [
            [{ title: "Yes", value: "1.40", suspend: "0" }, { title: "No", value: "2.75", suspend: "0" }],
        ]
    },
    "runsInThe8thInning": {
        marketname: "Runs in the 8th Inning",
        suspend: "0",
        header: ["", "Over", "Under"],
        rows: [
            [{ title: "0.5", value: null, suspend: "0" }, { title: "", value: "1.40", suspend: "0" }, { title: "", value: "2.75", suspend: "0" }],
            [{ title: "1.5", value: null, suspend: "0" }, { title: "", value: "2.10", suspend: "0" }, { title: "", value: "1.66", suspend: "0" }],
            [{ title: "2.5", value: null, suspend: "0" }, { title: "", value: "3.85", suspend: "0" }, { title: "", value: "1.23", suspend: "0" }],
            [{ title: "3.5", value: null, suspend: "0" }, { title: "", value: "7.00", suspend: "0" }, { title: "", value: "1.083", suspend: "0" }],
        ]
    },
}

export const BaseballBetBuilder = {
    "moneyLine": {
        marketname: "Money Line",
        suspend: "0",
        header: ["", "Home", "Tie", "Away"],
        rows: [
            [{ title: "Match", value: null, suspend: "0" }, { title: "", value: "1.57", suspend: "0" }, { title: "", value: null, suspend: "0" }, { title: "", value: "2.25", suspend: "0" }],
            [{ title: "Inning 5", value: null, suspend: "0" }, { title: "", value: null, suspend: "0" }, { title: "", value: "1.18", suspend: "0" }, { title: "", value: "4.40", suspend: "0" }],
            [{ title: "Inning 6", value: null, suspend: "0" }, { title: "", value: "4.75", suspend: "0" }, { title: "", value: "1.55", suspend: "0" }, { title: "", value: "3.80", suspend: "0" }],
        ]
    },
    "runLine":{
        marketname: "Run Line",
        suspend: "0",
        subtabs: ["Match"],
        "Match":[
            [{title: "2", value: "2.10", suspend: "0"}, {title: "2.5", value: "2.3", suspend: "0"}]
        ],
        "Match header": ["home", "away"]
    },
    "inningsProps": {
        marketname: "Innings Props",
        suspend: "0",
        header: ["Yes", "No"],
        rows: [
            [{ title: "A Run in Inning 5", value: null, suspend: "0" }, { title: "", value: "4.40", suspend: "0" }, { title: "", value: "1.18", suspend: "0" }],
            [{ title: "A Run in Inning 6", value: null, suspend: "0" }, { title: "", value: "2.20", suspend: "0" }, { title: "", value: "1.62", suspend: "0" }],
            [{ title: "A Run in Away Inning 5", value: null, suspend: "0" }, { title: "", value: "4.40", suspend: "0" }, { title: "", value: "1.18", suspend: "0" }],
            [{ title: "A Run in Home Inning 6", value: null, suspend: "0" }, { title: "", value: "4.00", suspend: "0" }, { title: "", value: "1.22", suspend: "0" }],
        ]
    },
    "leadAfter": {
        marketname: "Lead After",
        suspend: "0",
        header: ["", "Home", "Away", "Tie"],
        rows: [
            [{ title: "6 Innings", value: null, suspend: "0" }, { title: "", value: "1.50", suspend: "0" }, { title: "", value: "4.50", suspend: "0" }, { title: "", value: "4.50", suspend: "0" }],
            [{ title: "7 Innings", value: null, suspend: "0" }, { title: "", value: "1.66", suspend: "0" }, { title: "", value: "3.70", suspend: "0" }, { title: "", value: "4.50", suspend: "0" }],
        ]
    },
    "bothTeamsToScore": {
        marketname: "Both Teams to Score",
        suspend: "0",
        header: ["", "Yes", "No"],
        rows: [
            [{ title: "2 Runs", value: null, suspend: "0" }, { title: "", value: "2.60", suspend: "0" }, { title: "", value: "1.45", suspend: "0" }],
            [{ title: "3 Runs", value: null, suspend: "0" }, { title: "", value: "5.25", suspend: "0" }, { title: "", value: "1.13", suspend: "0" }],
            [{ title: "4 Runs", value: null, suspend: "0" }, { title: "", value: "9.50", suspend: "0" }, { title: "", value: "1.035", suspend: "0" }],
            [{ title: "5 Runs", value: null, suspend: "0" }, { title: "", value: "16.00", suspend: "0" }, { title: "", value: "1.006", suspend: "0" }],
            [{ title: "6 Runs", value: null, suspend: "0" }, { title: "", value: "23.00", suspend: "0" }, { title: "", value: "1.002", suspend: "0" }],
        ]
    },
    "extraInnings": {
        marketname: "Exra Innings",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Yes", value: null, suspend: "0" }, { title: "", value: "5.00", suspend: "0" }],
            [{ title: "No", value: null, suspend: "0" }, { title: "", value: "1.14", suspend: "0" }],
        ]
    },
}


export const BaseballMains = {
    "gameLines": {
        marketname: "Game Lines",
        suspend: "0",
        header: ["", "Home", "Away"],
        rows: [
            [{ title: "Run Line", value: null, suspend: "0" }, { title: "-1.5", value: "2.50", suspend: "0" }, { title: "+1.5", value: "1.50", suspend: "0" }],
            [{ title: "Total", value: null, suspend: "0" }, { title: "O 5.5", value: "2.00", suspend: "0" }, { title: "U 5.5", value: "1.71", suspend: "0" }],
            [{ title: "Money Line", value: null, suspend: "0" }, { title: "", value: "1.71", suspend: "0" }, { title: "", value: "2.00", suspend: "0" }],
        ]
    },
    "alternativeRunLine": {
        marketname: "Alternative Run Line",
        suspend: "0",
        header: ["Home", "Away"],
        rows: [
            [{ title: "-3.5", value: "5.75", suspend: "0" }, { title: "+3.5", value: "1.11", suspend: "0" }],
            [{ title: "-2.5", value: "3.85", suspend: "0" }, { title: "+2.5", value: "1.23", suspend: "0" }],
            [{ title: "-0.52", value: "1.76", suspend: "0" }, { title: "+0.5", value: "1.90", suspend: "0" }],
            [{ title: "+0.5", value: "1.66", suspend: "0" }, { title: "-0.5", value: "2.10", suspend: "0" }],
            [{ title: "+1.5", value: "1.26", suspend: "0" }, { title: "-1.5", value: "3.65", suspend: "0" }],
            [{ title: "+2.5", value: "1.13", suspend: "0" }, { title: "-2.5", value: "5.25", suspend: "0" }],
        ]
    },
    "alternativeGameTotal": {
        marketname: "Alternative Game Total",
        suspend: "0",
        header: ["", "Over", "Under"],
        rows: [
            [{ title: "2.5", value: null, suspend: "0" }, { title: "", value: "1.071", suspend: "0" }, { title: "", value: "7.50", suspend: "0" }],
            [{ title: "3.5", value: null, suspend: "0" }, { title: "", value: "1.28", suspend: "0" }, { title: "", value: "3.50", suspend: "0" }],
            [{ title: "4.5", value: null, suspend: "0" }, { title: "", value: "1.52", suspend: "0" }, { title: "", value: "2.40", suspend: "0" }],
            [{ title: "6.5", value: null, suspend: "0" }, { title: "", value: "2.60", suspend: "0" }, { title: "", value: "1.45", suspend: "0" }],
            [{ title: "7.5", value: null, suspend: "0" }, { title: "", value: "3.75", suspend: "0" }, { title: "", value: "1.25", suspend: "0" }],
            [{ title: "8.5", value: null, suspend: "0" }, { title: "", value: "4.50", suspend: "0" }, { title: "", value: "1.16", suspend: "0" }],
        ]
    },
    "moneyLineAndTotal": {
        marketname: "Money Line and Total",
        suspend: "0",
        header: ["Home", "Away"],
        rows: [
            [{ title: "Over 4.5", value: "2.90", suspend: "0" }, { title: "Under 4.5", value: "3.60", suspend: "0" }, { title: "Over 5.5", value: "3.80", suspend: "0" }, { title: "Under 5.5", value: "3.80", suspend: "0" }],
        ]
    },
    "alternativeMoneyLineAndTotal": {
        marketname: "Alternative Money Line and Total",
        suspend: "0",
        header: ["Home", "Away"],
        rows: [
            [{ title: "Over 3.5", value: "2.45", suspend: "0" }, { title: "Under 3.5", value: "4.75", suspend: "0" }, { title: "Over 4.5", value: "2.80", suspend: "0" }, { title: "Under 4.5", value: "6.00", suspend: "0" }],
            [{ title: "Over 5.5", value: "3.80", suspend: "0" }, { title: "Under 5.5", value: "2.90", suspend: "0" }, { title: "Over 6.5", value: "4.75", suspend: "0" }, { title: "Under 6.5", value: "3.20", suspend: "0" }],
        ]
    },
    "runLineAndTotal": {
        marketname: "Run Line and Total",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Home +1.5 & Over 4.5", value: "2.20", suspend: "0" }, { title: "Home +1.5 & Under 4.5", value: "2.65", suspend: "0" }],
            [{ title: "Away -1.5 & Over 5.5", value: "2.20", suspend: "0" }, { title: "Away -1.5 & Under 5.5", value: "2.65", suspend: "0" }],
        ]
    },
}


export const BaseballInnings = {
    "aRunScored": {
        marketname: "A Run Scored",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Yes", value: "1.71", suspend: "0" }, { title: "No", value: "2.00", suspend: "0" }],
        ]
    },
    "nthInningLines": {
        marketname: "8th Inning Lines",
        suspend: "0",
        header: ["", "Home", "Away", "Tie"],
        rows: [
            [{ title: "Winner", value: null, suspend: "0" }, { title: "", value: "2.35", suspend: "0" }, { title: "", value: "3.00", suspend: "0" }, { title: "", value: "2.80", suspend: "0" }],
        ]
    },
    "nthInningRuns": {
        marketname: "8th Inning Runs",
        suspend: "0",
        header: ["Score"],
        rows: [
            [{ title: "Yes", value: "1.25", suspend: "0" }, { title: "No", value: "3.75", suspend: "0" }],
        ]
    },
    "runsInThenthInning": {
        marketname: "Runs in the 8th Inning",
        suspend: "0",
        header: ["", "Over", "Under"],
        rows: [
            [{ title: "0.5", value: null, suspend: "0" }, { title: "", value: "1.25", suspend: "0" }, { title: "", value: "3.75", suspend: "0" }],
            [{ title: "1.5", value: null, suspend: "0" }, { title: "", value: "1.62", suspend: "0" }, { title: "", value: "2.20", suspend: "0" }],
            [{ title: "2.5", value: null, suspend: "0" }, { title: "", value: "2.60", suspend: "0" }, { title: "", value: "1.45", suspend: "0" }],
            [{ title: "3.5", value: null, suspend: "0" }, { title: "", value: "4.40", suspend: "0" }, { title: "", value: "1.18", suspend: "0" }],
        ]
    },
    "aRunScoredAwayInning8": {
        marketname: "A Run Scored - Away Inning 8",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Yes", value: "1.86", suspend: "0" }, { title: "No", value: "1.80", suspend: "0" }],
        ]
    },
}


export const BaseballTeam = {
    "teamAlternativeTotals": {
        marketname: "Team Alternative Totals",
        suspend: "0",
        header: ["Home", "Away"],
        rows: [
            [{ title: "Over 0.5", value: "1.25", suspend: "0" }, { title: "Under 0.5", value: "4.10", suspend: "0" }, { title: "Over 0.5", value: "1.13", suspend: "0" }, { title: "Under 0.5", value: "6.00", suspend: "0" }],
            [{ title: "Over 1.5", value: "1.62", suspend: "0" }, { title: "Under 1.5", value: "2.20", suspend: "0" }, { title: "Over 1.5", value: "1.42", suspend: "0" }, { title: "Under 1.5", value: "2.90", suspend: "0" }],
            [{ title: "Over 2.5", value: "2.35", suspend: "0" }, { title: "Under 2.5", value: "1.60", suspend: "0" }, { title: "Over 2.5", value: "1.86", suspend: "0" }, { title: "Under 2.5", value: "1.80", suspend: "0" }],
            [{ title: "Over 3.5", value: "3.40", suspend: "0" }, { title: "Under 3.5", value: "1.31", suspend: "0" }, { title: "Over 3.5", value: "3.00", suspend: "0" }, { title: "Under 3.5", value: "1.40", suspend: "0" }],
            [{ title: "Over 4.5", value: "5.25", suspend: "0" }, { title: "Under 4.5", value: "1.16", suspend: "0" }, { title: "Over 4.5", value: "4.60", suspend: "0" }, { title: "Under 4.5", value: "1.20", suspend: "0" }],
            [{ title: "Over 5.5", value: "7.50", suspend: "0" }, { title: "Under 5.5", value: "1.095", suspend: "0" }, { title: "Over 5.5", value: "6.75", suspend: "0" }, { title: "Under 5.5", value: "1.11", suspend: "0" }],
            [{ title: "Over 6.5", value: "11.75", suspend: "0" }, { title: "Under 6.5", value: "1.05", suspend: "0" }, { title: "Over 6.5", value: "11.25", suspend: "0" }, { title: "Under 6.5", value: "1.055", suspend: "0" }],
            [{ title: "Over 7.5", value: "15.50", suspend: "0" }, { title: "Under 7.5", value: "1.028", suspend: "0" }, { title: "Over 7.5", value: "15.50", suspend: "0" }, { title: "Under 7.5", value: "1.028", suspend: "0" }],
            [{ title: "Over 8.5", value: "17.00", suspend: "0" }, { title: "Under 8.5", value: "1.015", suspend: "0" }, { title: "Over 8.5", value: "17.00", suspend: "0" }, { title: "Under 8.5", value: "1.015", suspend: "0" }],
        ]
    },
    "bothTeamsToScoreXRuns": {
        marketname: "Both Teams to Score X Runs",
        suspend: "0",
        header: ["", "Yes", "No"],
        rows: [
            [{ title: "2", value: null, suspend: "0" }, { title: "", value: "2.60", suspend: "0" }, { title: "", value: "1.45", suspend: "0" }],
            [{ title: "3", value: null, suspend: "0" }, { title: "", value: "4.50", suspend: "0" }, { title: "", value: "1.16", suspend: "0" }],
            [{ title: "4", value: null, suspend: "0" }, { title: "", value: "8.25", suspend: "0" }, { title: "", value: "1.055", suspend: "0" }],
            [{ title: "5", value: null, suspend: "0" }, { title: "", value: "11.50", suspend: "0" }, { title: "", value: "1.016", suspend: "0" }],
            [{ title: "6", value: null, suspend: "0" }, { title: "", value: "18.00", suspend: "0" }, { title: "", value: "1.004", suspend: "0" }],
        ]
    },
    "teamTotals": {
        marketname: "Team Totals",
        suspend: "0",
        header: ["Home", "Away"],
        rows: [
            [{ title: "Over 1.5", value: "1.62", suspend: "0" }, { title: "Under 1.5", value: "2.20", suspend: "0" }, { title: "Over 2.5", value: "1.86", suspend: "0" }, { title: "2.5", value: "1.80", suspend: "0" }],
        ]
    },
}
