
// "toWin":{
//     marketname: "To Win",
//     suspend: "0",
//     header : ["string", "string" , "string"],
//     rows: [
//         [{title, value, suspend}, {title, value, suspend}, {title, value, suspend}],
//         [{title, value, suspend}, {title, value, suspend}, {title, value, suspend}]
//     ]
// }

export const tennisAll = {
    "toWin": {
        marketname: "To Win",
        suspend: "0",
        header: ["", "Home", "Away"],
        rows: [
            [{ title: "Match", value: null, suspend: "0" }, { title: "", value: "3.5", suspend: "0" }, { title: "", value: "3.1", suspend: "0" }],
            [{ title: "Set 1", value: null, suspend: "0" }, { title: "", value: "1.5", suspend: "0" }, { title: "", value: "2.1", suspend: "0" }],
        ]
    },
    "pointBetting": {
        marketname: "Point Betting",
        suspend: "0",
        header: ["", "Home", "Away"],
        rows: [
            [{ title: "5", value: null, suspend: "0" }, { title: "", value: "1.5", suspend: "0" }, { title: "", value: "1.1", suspend: "0" }],
            [{ title: "6", value: null, suspend: "0" }, { title: "", value: "2.5", suspend: "0" }, { title: "", value: "2.1", suspend: "0" }],
            [{ title: "7", value: null, suspend: "0" }, { title: "", value: "3.5", suspend: "0" }, { title: "", value: "2.5", suspend: "0" }],
        ]
    },
    "nthGameWinner": {
        marketname: "17th Game Winner",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Home", value: "1.9", suspend: "0" }, { title: "Away", value: "1.2", suspend: "0" }],
        ]
    },
    "nthGameToDeuce": {
        marketname: "18th Game to Deuce",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Yes", value: "1.9", suspend: "0" }, { title: "No", value: "1.2", suspend: "0" }],
        ]
    },
    "nthGameScore": {
        marketname: "18th Game Score",
        suspend: "0",
        header: ["", "Home", "Away"],
        rows: [
            [{ title: "to love", value: null, suspend: "0" }, { title: "", value: "1.5", suspend: "0" }, { title: "", value: "1.1", suspend: "0" }],
            [{ title: "5", value: null, suspend: "0" }, { title: "", value: "5.0", suspend: "0" }, { title: "", value: "5.1", suspend: "0" }],
            [{ title: "6", value: null, suspend: "0" }, { title: "", value: "5.4", suspend: "0" }, { title: "", value: "12.5", suspend: "0" }],
            [{ title: "7", value: null, suspend: "0" }, { title: "", value: "3.5", suspend: "0" }, { title: "", value: "9.5", suspend: "0" }],
            [{ title: "8", value: null, suspend: "0" }, { title: "", value: "6.25", suspend: "0" }, { title: "", value: "7.15", suspend: "0" }],
        ]
    },
    "iPointWinnerNthGame": {
        marketname: "1st Point Winner 18th Game",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Home", value: "6.3", suspend: "0" }, { title: "Away", value: "4.5", suspend: "0" }],
         ]
    },
    "nthGameScoreAfteriPoints": {
        marketname: "19th Game Score After 2nd Points",
        suspend: "0",
        header: ["Home", "Tie", "Away"],
        rows: [
            [{ title: "30-0", value: "5.50", suspend: "0" }, { title: "15-15", value: "1.9", suspend: "0" }, { title: "0-30", value: "2.50", suspend: "0" }],
         ]
    },
    "nthGameScoreAfterjPoints": {
        marketname: "19th Game Score After 3rd Points",
        suspend: "0",
        header: ["Home", "Away"],
        rows: [
            [{ title: "30-15", value: "5.50", suspend: "0" }, { title: "15-30", value: "1.9", suspend: "0" }],
            [{ title: "40-0", value: "13.50", suspend: "0" }, { title: "0-40", value: "4.0", suspend: "0" }],
        ]
    },
    "nthGameScoreAfterkPoints": {
        marketname: "19th Game Score After 4th Points",
        suspend: "0",
        header: ["Home", "Tie", "Away"],
        rows: [
            [{ title: "Win to Love", value: "30.50", suspend: "0" }, { title: "30-30", value: "2.6", suspend: "0" }, { title: "Win to Love", value: "6.60", suspend: "0" }],
            [{ title: "40-15", value: "5.50", suspend: "0" }, { title: "", value: "", suspend: "0" }, { title: "15-40", value: "2.50", suspend: "0" }],
        ]
    },
    "goTheDistance?": {
        marketname: "Go The Distance?",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Yes", value: "1.10", suspend: "0" }, { title: "No", value: "2.72", suspend: "0"}]
        ],
    },
    "totalSets": {
        marketname: "Total Sets",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "3 Sets", value: "17.10", suspend: "0" }, { title: "4 Sets", value: "5.72", suspend: "0"}],
            [{ title: "5 Sets", value: "1.10", suspend: "0" }]

        ],
    },
    "playerGamesWon": {
        marketname: "Player Games Won",
        suspend: "0",
        header: [ "Home", "Away"],
        rows: [
            [{ title: "Over 14.5", value: "1.80", suspend: "0" }, { title: "Under 14.5", value: "1.72", suspend: "0"} , { title: "Over 16.5", value: "6.7", suspend: "0" },{ title: "Under 1.5", value: "2.8", suspend: "0" },]
        ],
    },
    "matchTotalGamesEven/Odd": {
        marketname: "Player Games Won",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Odd", value: "1.80", suspend: "0" }, { title: "Even", value: "1.72", suspend: "0"}]
        ],
    },
    "totalGamesInSet2": {
        marketname: "Total Game in Set 2",
        suspend: "0",
        header: ["", "Over", "Under"],
        rows: [
            [{ title: "8.5", value: "", suspend: "0" }, { title: "", value: "1.5", suspend: "0" }, { title: "", value: "1.22", suspend: "0" }],
            [{ title: "9.5", value: "", suspend: "0" }, { title: "", value: "2.74", suspend: "0" }, { title: "", value: "2.50", suspend: "0" }],
            [{ title: "10.5", value: "", suspend: "0" }, { title: "", value: "3.74", suspend: "0" }, { title: "", value: "4.50", suspend: "0" }],
            [{ title: "12.5", value: "", suspend: "0" }, { title: "", value: "4.74", suspend: "0" }, { title: "", value: "5.50", suspend: "0" }],
        ]
    },

}


export const tennisBetBuilder = {
    "match/SetWinner": {
        marketname: "Match/Set Winner",
        suspend: "0",
        header: ["", "Home", "Away"],
        rows: [
            [{ title: "Match", value: "", suspend: "0" }, { title: "", value: "1.5", suspend: "0" }, { title: "", value: "1.22", suspend: "0" }],
            [{ title: "Set 3", value: "", suspend: "0" }, { title: "", value: "2.74", suspend: "0" }, { title: "", value: "2.50", suspend: "0" }],
            [{ title: "Set 4", value: "", suspend: "0" }, { title: "", value: "3.74", suspend: "0" }, { title: "", value: "4.50", suspend: "0" }],
        ]
    },
    "nextGameScoreAfterPoint": {
        marketname: "Next Game - Score After Point",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Point 2", value: "", suspend: "0" }],
            [{ title: "Home", value: "", suspend: "0" }, { title: "", value: "30-0", suspend: "0" }],
            [{ title: "Tie", value: "", suspend: "0" }, { title: "", value: "15-15", suspend: "0" }],
            [{ title: "Away", value: "", suspend: "0" }, { title: "", value: "0-30", suspend: "0" }],
            [{ title: "Point 3", value: "", suspend: "0" }],
            [{ title: "Home", value: "", suspend: "0" }, { title: "", value: "40-0", suspend: "0" }],
            [{ title: "Home", value: "", suspend: "0" }, { title: "", value: "30-15", suspend: "0" }],
            [{ title: "Away", value: "", suspend: "0" }, { title: "", value: "15-30", suspend: "0" }],
            [{ title: "Away", value: "", suspend: "0" }, { title: "", value: "0-40", suspend: "0" }],
        ]
    },
    "nextGameWinner": {
        marketname: "Next Game Winner",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Home", value: "", suspend: "0" }, { title: "", value: "2", suspend: "0" }],
            [{ title: "Away", value: "", suspend: "0" }, { title: "", value: "5.0", suspend: "0" }],
        ]
    },
    "nextGameMarkets": {
        marketname: "Next Game Markets",
        suspend: "0",
        header: [],
        subtabs:["Server Handicap", "Total Points", "Break Point"],
        "Server Handicap":[
            [{ title: "Home to Love or 15", value: "", suspend: "0" }, { title: "", value: "2.20", suspend: "0" }],
            [{ title: "Home to Love or 15, 30", value: "", suspend: "0" }, { title: "", value: "2.0", suspend: "0" }],
            [{ title: "Any outcome except Love or 15", value: "", suspend: "0" }, { title: "", value: "1.6", suspend: "0" }],
            [{ title: "Any outcome except Love or 15, 30", value: "", suspend: "0" }, { title: "", value: "2.5", suspend: "0" }],
        ],
        "Total Points":[
            [{ title: "Exactly 4", value: "", suspend: "0" }, { title: "", value: "4.20", suspend: "0" }],
            [{ title: "Exactly 5", value: "", suspend: "0" }, { title: "", value: "3.0", suspend: "0" }],
            [{ title: "Exactly 6", value: "", suspend: "0" }, { title: "", value: "2.6", suspend: "0" }],
            [{ title: "Over 6", value: "", suspend: "0" }, { title: "", value: "2.5", suspend: "0" }],
        ],
        "Break Point":[
            [{ title: "Yes", value: "", suspend: "0" }, { title: "", value: "1.20", suspend: "0" }],
            [{ title: "No", value: "", suspend: "0" }, { title: "", value: "1.0", suspend: "0" }],
        ],
    },
    "nextGameToDeuce": {
        marketname: "Next Game To Deuce",
        suspend: "0"
    },
    "nextGameScore": {
        marketname: "Next Game Score",
        suspend: "0"
    },
    "nextTwoGamesWinner/EitherGameToDeuce": {
        marketname: "Next Two Games - Winner/Either Game to Deuce",
        suspend: "0"
    },
    "match/PlayerTotalGames": {
        marketname: "Match/Player Total Games",
        suspend: "0"
    },
    "totalGamesInSet": {
        marketname: "Total Games in Set",
        suspend: "0"
    },
    "setGameScore": {
        marketname: "Set Game Score",
        suspend: "0"
    },
    "match/SetHandicap(Games)": {
        marketname: "Match/Set Handicap (Games)",
        suspend: "0"
    },
    "setBetting": {
        marketname: "Set Betting",
        suspend: "0"
    },
    "playerSpecials": {
        marketname: "Player Specials",
        suspend: "0"
    },
    "matchSpecials": {
        marketname: "Match Specials",
        suspend: "0"
    },
    "breaksOfServe": {
        marketname: "Breaks of Serve",
        suspend: "0"
    },
    "current/NextSetGameScoreAnyPlayer": {
        marketname: "Current/Next Set - Game Score Any Player",
        suspend: "0"
    },
    "current/NextSetRaceTo/LeadAfter": {
        marketname: "Current/Next Set - Race To/Lead After",
        suspend: "0"
    },
    "current/NextSetScoreAfter(Games)": {
        marketname: "Current/Next Set - Score After (Games)",
        suspend: "0"
    },
    "current/NextSetCorrectScoreGroup": {
        marketname: "Current/Next Set - Correct Score Group",
        suspend: "0"
    },
    "matchTotalSets": {
        marketname: "Match Total Sets",
        suspend: "0"
    },
    "matchTotalTieBreaks": {
        marketname: "Match Total Tie Breaks",
        suspend: "0"
    },
}

export const tennisGames = {
    "21stGameWinner": {
        marketname: "21st Game Winner",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Home", value: "1.012", suspend: "0" }, { title: "Away", value: "23.00", suspend: "0" }],
        ]
    },
    "21stGameToDeuce": {
        marketname: "21st Game to Deuce",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Yes", value: "10.00", suspend: "0" }, { title: "No", value: "1.062", suspend: "0" }],
        ]
    },
    "21stGameScore": {
        marketname: "21st Game Score",
        suspend: "0",
        header: ["", "Home", "Away"],
        rows: [
            [{ title: "to Love", value: null, suspend: "0" }, { title: "", value: "1.0", suspend: "0" }, { title: "", value: "2.0", suspend: "0" }],
            [{ title: "to 15", value: null, suspend: "0" }, { title: "", value: "2.87", suspend: "0" }, { title: "", value: "3.3", suspend: "0" }],
            [{ title: "to 30", value: null, suspend: "0" }, { title: "", value: "5.50", suspend: "0" }, { title: "", value: "19.00", suspend: "0" }],
            [{ title: "to 40", value: null, suspend: "0" }, { title: "", value: "10.00", suspend: "0" }, { title: "", value: "34.00", suspend: "0" }],
        ]
    },
    "22ndGameWinner": {
        marketname: "22nd Game Winner",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Home", value: "1.14", suspend: "0" }, { title: "Away", value: "5.50", suspend: "0" }],
        ]
    },
    "22ndGameToDeuce": {
        marketname: "22nd Game to Deuce",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Yes", value: "3.75", suspend: "0" }, { title: "No", value: "1.25", suspend: "0" }],
        ]
    },
    "nextGameWinner": {
        marketname: "Next Game Winner",
        suspend: "0"
    },
    "nextGameMarkets": {
        marketname: "Next Game Markets",
        suspend: "0"
    },
    "nextGameToDeuce": {
        marketname: "Next Game To Deuce",
        suspend: "0"
    },
    "nextGameScore": {
        marketname: "Next Game Score",
        suspend: "0"
    },
    "nextTwoGamesWinner/EitherGameToDeuce": {
        marketname: "Next Two Games - Winner/Either Game to Deuce",
        suspend: "0"
    },
    "match/PlayerTotalGames": {
        marketname: "Match/Player Total Games",
        suspend: "0"
    },
    "totalGamesInSet": {
        marketname: "Total Games in Set",
        suspend: "0"
    },
    "setGameScore": {
        marketname: "Set Game Score",
        suspend: "0"
    },
    "match/SetHandicap(Games)": {
        marketname: "Match/Set Handicap (Games)",
        suspend: "0"
    },
    "setBetting": {
        marketname: "Set Betting",
        suspend: "0"
    },
    "playerSpecials": {
        marketname: "Player Specials",
        suspend: "0"
    },
    "matchSpecials": {
        marketname: "Match Specials",
        suspend: "0"
    },
    "breaksOfServe": {
        marketname: "Breaks of Serve",
        suspend: "0"
    },
    "current/NextSetGameScoreAnyPlayer": {
        marketname: "Current/Next Set - Game Score Any Player",
        suspend: "0"
    },
    "current/NextSetRaceTo/LeadAfter": {
        marketname: "Current/Next Set - Race To/Lead After",
        suspend: "0"
    },
    "current/NextSetScoreAfter(Games)": {
        marketname: "Current/Next Set - Score After (Games)",
        suspend: "0"
    },
    "current/NextSetCorrectScoreGroup": {
        marketname: "Current/Next Set - Correct Score Group",
        suspend: "0"
    },
    "matchTotalSets": {
        marketname: "Match Total Sets",
        suspend: "0"
    },
    "matchTotalTieBreaks": {
        marketname: "Match Total Tie Breaks",
        suspend: "0"
    },
}

export const tennisPlayer = {
    "21stGameWinner": {
        marketname: "21st Game Winner",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Home", value: "1.012", suspend: "0" }, { title: "Away", value: "23.00", suspend: "0" }],
        ]
    },
    "21stGameToDeuce": {
        marketname: "21st Game to Deuce",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Yes", value: "10.00", suspend: "0" }, { title: "No", value: "1.062", suspend: "0" }],
        ]
    },
    "21stGameScore": {
        marketname: "21st Game Score",
        suspend: "0",
        header: ["", "Home", "Away"],
        rows: [
            [{ title: "to Love", value: null, suspend: "0" }, { title: "", value: "1.9", suspend: "0" }, { title: "", value: "2.0", suspend: "0" }],
            [{ title: "to 15", value: null, suspend: "0" }, { title: "", value: "2.87", suspend: "0" }, { title: "", value: "3.0", suspend: "0" }],
            [{ title: "to 30", value: null, suspend: "0" }, { title: "", value: "5.50", suspend: "0" }, { title: "", value: "10.00", suspend: "0" }],
            [{ title: "to 40", value: null, suspend: "0" }, { title: "", value: "10.00", suspend: "0" }, { title: "", value: "34.00", suspend: "0" }],
        ]
    },
    "22ndGameWinner": {
        marketname: "22nd Game Winner",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Home", value: "1.14", suspend: "0" }, { title: "Away", value: "5.50", suspend: "0" }],
        ]
    },
    "22ndGameToDeuce": {
        marketname: "22nd Game to Deuce",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Yes", value: "3.75", suspend: "0" }, { title: "No", value: "1.25", suspend: "0" }],
        ]
    },
    "match/SetWinner": {
        marketname: "Match/Set Winner",
        suspend: "0"
    },
    "nextGameScoreAfterPoint": {
        marketname: "Next Game -Score After Point",
        suspend: "0"
    },
    "nextGameWinner": {
        marketname: "Next Game Winner",
        suspend: "0"
    },
    "nextGameMarkets": {
        marketname: "Next Game Markets",
        suspend: "0"
    },
    "nextGameToDeuce": {
        marketname: "Next Game To Deuce",
        suspend: "0"
    },
    "nextGameScore": {
        marketname: "Next Game Score",
        suspend: "0"
    },
    "nextTwoGamesWinner/EitherGameToDeuce": {
        marketname: "Next Two Games - Winner/Either Game to Deuce",
        suspend: "0"
    },
    "match/PlayerTotalGames": {
        marketname: "Match/Player Total Games",
        suspend: "0"
    },
    "totalGamesInSet": {
        marketname: "Total Games in Set",
        suspend: "0"
    },
    "setGameScore": {
        marketname: "Set Game Score",
        suspend: "0"
    },
    "match/SetHandicap(Games)": {
        marketname: "Match/Set Handicap (Games)",
        suspend: "0"
    },
    "setBetting": {
        marketname: "Set Betting",
        suspend: "0"
    },
    "playerSpecials": {
        marketname: "Player Specials",
        suspend: "0"
    },
    "matchSpecials": {
        marketname: "Match Specials",
        suspend: "0"
    },
    "breaksOfServe": {
        marketname: "Breaks of Serve",
        suspend: "0"
    },
    "current/NextSetGameScoreAnyPlayer": {
        marketname: "Current/Next Set - Game Score Any Player",
        suspend: "0"
    },
    "current/NextSetRaceTo/LeadAfter": {
        marketname: "Current/Next Set - Race To/Lead After",
        suspend: "0"
    },
    "current/NextSetScoreAfter(Games)": {
        marketname: "Current/Next Set - Score After (Games)",
        suspend: "0"
    },
    "current/NextSetCorrectScoreGroup": {
        marketname: "Current/Next Set - Correct Score Group",
        suspend: "0"
    },
    "matchTotalSets": {
        marketname: "Match Total Sets",
        suspend: "0"
    },
    "matchTotalTieBreaks": {
        marketname: "Match Total Tie Breaks",
        suspend: "0"
    },
}

export const tennisSet = {
    "set3Winner": {
        marketname: "Set 3 Winner",
        suspend: "0",
        header: [],
        rows: [
            [{ title: "Home", value: "1.70", suspend: "0" }, { title: "Away", value: "2.05", suspend: "0" }],
        ]
    },
    "totalGamesInSet3": {
        marketname: "Total Games in Set 3",
        suspend: "0",
        header: ["", "Over", "Under"],
        rows: [
            [{ title: "7.5", value: null, suspend: "0" }, { title: "", value: "1.02", suspend: "0" }, { title: "", value: "19.00", suspend: "0" }],
            [{ title: "8.5", value: null, suspend: "0" }, { title: "", value: "1.10", suspend: "0" }, { title: "", value: "7.00", suspend: "0" }],
            [{ title: "9.5", value: null, suspend: "0" }, { title: "", value: "1.44", suspend: "0" }, { title: "", value: "2.62", suspend: "0" }],
            [{ title: "10.5", value: null, suspend: "0" }, { title: "", value: "2.37", suspend: "0" }, { title: "", value: "1.53", suspend: "0" }],
            [{ title: "12.5", value: null, suspend: "0" }, { title: "", value: "3.25", suspend: "0" }, { title: "", value: "1.33", suspend: "0" }],
        ]
    },
    "set3RaceTo": {
        marketname: "Set 3 Race to",
        suspend: "0",
        header: ["", "Home", "Away"],
        rows: [
            [{ title: "2", value: null, suspend: "0" }, { title: "", value: "1.05", suspend: "0" }, { title: "", value: "11.00", suspend: "0" }],
            [{ title: "3", value: null, suspend: "0" }, { title: "", value: "1.14", suspend: "0" }, { title: "", value: "5.50", suspend: "0" }],
            [{ title: "4", value: null, suspend: "0" }, { title: "", value: "1.22", suspend: "0" }, { title: "", value: "4.00", suspend: "0" }],
            [{ title: "5", value: null, suspend: "0" }, { title: "", value: "1.28", suspend: "0" }, { title: "", value: "3.50", suspend: "0" }],
        ]
    },
    "set3LeadAfter": {
        marketname: "Set 3 Lead after",
        suspend: "0",
        header: ["", "Home", "Away", "Tie"],
        rows: [
            [{ title: "4", value: null, suspend: "0" }, { title: "", value: "5.00", suspend: "0" }, { title: "", value: "13.00", suspend: "0" }, { title: "", value: "1.22", suspend: "0" }],
            [{ title: "6", value: null, suspend: "0" }, { title: "", value: "3.40", suspend: "0" }, { title: "", value: "6.00", suspend: "0" }, { title: "", value: "1.57", suspend: "0" }],
        ]
    },
    "set3ScoreAfter4Games": {
        marketname: "Set 3 Score after 4 Games",
        suspend: "0",
        header: ["", "Home", "", "Away"],
        rows: [
            [{ title: "3-1", value: null, suspend: "0" }, { title: "", value: "5.00", suspend: "0" }, { title: "", value: null, suspend: "0" }, { title: "", value: "13.00", suspend: "0" }],
            [{ title: "2-2", value: null, suspend: "0" }, { title: "", value: null, suspend: "0" }, { title: "", value: "1.22", suspend: "0" }, { title: "", value: null, suspend: "0" }],
        ]
    },
    "set2Winner": {
        marketname: "Set 2 Winner",
        suspend: "0"
    },

    "totalGamesInSet2": {
        marketname: "Total Games in Set 2",
        suspend: "0"
    },
    "set2RaceTo": {
        marketname: "Set 2 Race to",
        suspend: "0"
    },
    "set2LeadAfter": {
        marketname: "Set 2 Lead after",
        suspend: "0"
    },
    "set2ScoreAfter4Games": {
        marketname: "Set 2 Score after 4 Games",
        suspend: "0"
    },
    "set2ScoreAfter6Games": {
        marketname: "Set 2 Score after 6 Games",
        suspend: "0"
    },
    "set2Score": {
        marketname: "Set 2 Score",
        suspend: "0"
    },
    "set2CorrectScoreGroup": {
        marketname: "Set 2 Correct Score Group",
        suspend: "0"
    },
    "set2CorrectScoreAnyPlayer": {
        marketname: "Set 2 Correct Score Any Player",
        suspend: "0"
    },
    "set2Handicap": {
        marketname: "Set 2 Handicap",
        suspend: "0"
    },
    "set2ToBreakServe": {
        marketname: "Set 2 to Break Serve",
        suspend: "0"
    },
    "setBetting": {
        marketname: "Set Betting",
        suspend: "0"
    },
}
