'use client';
import React from "react";

const findIdByName = (data:any, name:string) => {
    const odds = data?.odds;

    for(var odd_id in odds){
        var odd_obj = odds[odd_id];
        if(odd_obj.name == name){
            return odd_obj.id
        }
    }
    // not found
    return -1;
}
export const getSetTitle = (data:any, prevString: string) =>{

    var current_set = data?.info?.period;

    var new_string = prevString.replace("Set X", current_set);
    return new_string;
}

export const getGameTitle = (data:any, prevString: string) =>{
    var games_string = ""
    var stats = data?.stats;
    const set_regex = new RegExp('S(\\d+)', 'gm')
    var total_games = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            total_games += parseInt(s.home) + parseInt(s.away);
        }
    }
    total_games += 1;
    if(total_games == 1){
        games_string = total_games.toString() + "st";
    }
    if(total_games == 2){
        games_string = total_games.toString() + "nd";
    }
    if(total_games == 3){
        games_string = total_games.toString() + "rd";
    }
    if(total_games >= 4){
        games_string = total_games.toString() + "th";
    }


    var new_string = prevString.replace("nth Game", games_string + " Game" )
    return new_string;
}

export const getNextGameTitle = (data:any, prevString: string) =>{
    var games_string = ""
    var stats = data?.stats;
    const set_regex = new RegExp('S(\\d+)', 'gm')
    var total_games = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            total_games += parseInt(s.home) + parseInt(s.away);
        }
    }
    total_games += 2;
    if(total_games == 1){
        games_string = total_games.toString() + "st";
    }
    if(total_games == 2){
        games_string = total_games.toString() + "nd";
    }
    if(total_games == 3){
        games_string = total_games.toString() + "rd";
    }
    if(total_games >= 4){
        games_string = total_games.toString() + "th";
    }

    var new_string = prevString.replace("nth Game", games_string + " Game" )
    return new_string;
}

export const toWin = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    const current_set_winner_string = current_period + " Winner"
    const odd_id_current_set_winner = findIdByName(data, current_set_winner_string);

    var odds_final_winner = data?.odds[67];
    if(odds_final_winner !== undefined){
        var arr = [] as any;
        var title_row_obj = {title:"Match", value:null, suspend:"0"}
        arr.push(title_row_obj)
        const participants = odds_final_winner?.participants;
        var home = _getParticipantsFieldWithoutHandicap(participants, "Home");
        var away = _getParticipantsFieldWithoutHandicap(participants, "Away");
        if(home !== null){
            home.title = ""
            arr.push(home)

        }
        if(away !== null){
            away.title = ""
            arr.push(away)

        }
        base_arr.push(arr);
    }

    if(odd_id_current_set_winner != -1){
        var arr = [] as any;
        const odd_obj = data?.odds[odd_id_current_set_winner];
        const participants = odd_obj.participants;
        var title_row_obj = {title:current_period, value:null, suspend:"0"}
        arr.push(title_row_obj);
        var home = _getParticipantsFieldWithoutHandicap(participants, "Home");
        var away = _getParticipantsFieldWithoutHandicap(participants, "Away");
        if(home !== null){
            home.title = ""
            arr.push(home)
        }
        if(away !== null){
            away.title = ""
            arr.push(away)
        }
        base_arr.push(arr);

    }
    console.log(current_set_winner_string, base_arr)
    return {rows:base_arr, suspend:odds_final_winner.suspend};

}


export const pointBetting = (data:any) =>{
    if (!data && !data.odds) {
        return [];
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    const current_set_winner_string = current_period + " Winner"
    const odd_id_current_set_winner = findIdByName(data, current_set_winner_string);

    var odds = data?.odds[7889152];


    console.log(current_set_winner_string, base_arr)
    return base_arr;

}

export const gameWinner = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=1;

    const _current_set_winner_string = "Game Winner"
    const _odd_id_current_set_winner = findIdByName(data, _current_set_winner_string);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};

    }



    var participants = odds.participants;
    var arr = [] as any;
        
    var home = _getParticipantsField(participants, "Home", current_game);
    var away = _getParticipantsField(participants, "Away", current_game);
    if(home){
        home.title = data?.team_info?.home?.name
    }
    if(away){
        away.title = data?.team_info?.away?.name
    }
    arr.push(home);
    arr.push(away);
    
    var suspend_value = '0'
    if(home && home.suspend === "1" && away && away?.suspend === "1"){
        suspend_value = "1"
    }

    base_arr.push(arr);
    console.log(_current_set_winner_string, base_arr)
    return {rows:base_arr, suspend:suspend_value};
}



export const gameToDeuce = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=1;

    const current_set_winner_string = "Game Deuce"
    const odd_id_current_set_winner = findIdByName(data, current_set_winner_string);

    var odds = data?.odds[odd_id_current_set_winner];
    if(odds == undefined){
        return {rows:[], suspend:"0"};

    }

    var participants = odds.participants;
    var arr = [] as any;
        
    var yes = _getParticipantsField(participants, "Yes", current_game);
    var no = _getParticipantsField(participants, "No", current_game);
    if(yes !== null && no !== null){
        arr.push(yes)
        arr.push(no)
        base_arr.push(arr);

    }

    var suspended_value = allSuspendedForHandicap(participants, current_game).toString();
    console.log("susp value", suspended_value);
    
    console.log(current_set_winner_string, base_arr)
    return {rows:base_arr, suspend:suspended_value};
    // return base_arr;

}

const _gameScoreCreateRow = (participants:any, scorePoint:string, handicap:any) => {
    var arr = [] as any;
    var away_score_string = "W-"+ scorePoint;
    var home_score_string = scorePoint+"-W";
    for(var participant_id in participants){
        var participant_obj = participants[participant_id];
        if(participant_obj.name == home_score_string && parseInt(participant_obj.handicap) === parseInt(handicap)){
            var obj = {title: "", value: participant_obj.value_eu, suspend: participant_obj.suspend}
            arr.push(obj)
        }
        if(participant_obj.name == away_score_string && parseInt(participant_obj.handicap) === parseInt(handicap)){
            var obj = {title: "", value: participant_obj.value_eu, suspend: participant_obj.suspend}
            arr.push(obj)
        }
        
    }
    return arr;

}

export const gameScore = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=1;

    const odd_id_game_score = findIdByName(data, "Game Score");

    var odds = data?.odds[odd_id_game_score];
    if(odds == undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    var rows_of_0 = [{ title: "to love", value: null, suspend: "0" }].concat(_gameScoreCreateRow(participants, "0", current_game));
    var rows_of_15 = [{ title: "to 15", value: null, suspend: "0" }].concat(_gameScoreCreateRow(participants, "15", current_game));
    var rows_of_30 = [{ title: "to 30", value: null, suspend: "0" }].concat(_gameScoreCreateRow(participants, "30", current_game));
    var rows_of_40 = [{ title: "to 40", value: null, suspend: "0" }].concat(_gameScoreCreateRow(participants, "40", current_game));
    if(rows_of_0.length > 1 && rows_of_15.length > 1 && rows_of_30.length > 1 && rows_of_40.length > 1){
        base_arr.push(rows_of_0);
        base_arr.push(rows_of_15);
        base_arr.push(rows_of_30);
        base_arr.push(rows_of_40);
    }

    console.log("Game Score", base_arr)
    var suspended_value = allSuspendedForHandicap(participants, current_game);
    return {rows:base_arr, suspend:suspended_value};

}

export const nextGameWinner = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=2;

    const _current_set_winner_string = "Game Winner"
    const _odd_id_current_set_winner = findIdByName(data, _current_set_winner_string);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var arr = [] as any;
        
    for(var participant_id in participants){
        var title = '';
        var suspend = '0'
        var value = '';
        const participant_obj = participants[participant_id];
        if(participant_obj.name === "Home" && parseInt(participant_obj.handicap) === current_game){
            title = data?.team_info?.home?.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            arr.push(obj);
        }
        if(participant_obj.name === "Away" && parseInt(participant_obj.handicap) == current_game){
            title = data?.team_info?.away?.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            arr.push(obj)
        }

    }
    
    console.log(_current_set_winner_string, base_arr)
    base_arr.push(arr);
    return {rows:base_arr, suspend:odds.suspend};

}



export const nextGameToDeuce = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=2;

    const current_set_winner_string = "Game Deuce"
    const odd_id_current_set_winner = findIdByName(data, current_set_winner_string);

    var odds = data?.odds[odd_id_current_set_winner];
    if(odds == undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    var arr = [] as any;
        
    for(var participant_id in participants){
        var title = '';
        var suspend = '0'
        var value = '';
        const participant_obj = participants[participant_id];
        if(parseInt(participant_obj.handicap) === current_game && participant_obj.name == "Yes"){
            title = participant_obj.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            arr.push(obj);
        }
        if(parseInt(participant_obj.handicap) == current_game && participant_obj.name == "No"){
            title = participant_obj.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            arr.push(obj)
        }
        // not sure if this is the best solution
        if(arr.length == 2){
            break;
        }
    }
    
    console.log(current_set_winner_string, base_arr)
    base_arr.push(arr);
    
    return {rows:base_arr, suspend:odds.suspend};

}

function allSuspendedForHandicap(participants: any, targetHandicap: number): string {
    const filteredParticipants = Object.values(participants).filter((participant:any) => parseInt(participant.handicap) === targetHandicap);
    var result = filteredParticipants.every((participant:any) => participant.suspend === "1");
    if(result){
        return "1";
    }
    return "0"
}


export const nextGameScore = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=2;

    const odd_id_game_score = findIdByName(data, "Game Score");

    var odds = data?.odds[odd_id_game_score];
    if(odds == undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    var rows_of_0 = [{ title: "to love", value: null, suspend: "0" }].concat(_gameScoreCreateRow(participants, "0", current_game).reverse());
    var rows_of_15 = [{ title: "to 15", value: null, suspend: "0" }].concat(_gameScoreCreateRow(participants, "15", current_game).reverse());
    var rows_of_30 = [{ title: "to 30", value: null, suspend: "0" }].concat(_gameScoreCreateRow(participants, "30", current_game).reverse());
    var rows_of_40 = [{ title: "to 40", value: null, suspend: "0" }].concat(_gameScoreCreateRow(participants, "40", current_game).reverse());
    if(rows_of_0.length > 1 && rows_of_15.length > 1 && rows_of_30.length > 1 && rows_of_40.length > 1){
        base_arr.push(rows_of_0);
        base_arr.push(rows_of_15);
        base_arr.push(rows_of_30);
        base_arr.push(rows_of_40);
    }
    
    var suspended_value = allSuspendedForHandicap(participants, current_game);

    console.log("Game Score", base_arr)
    return {rows:base_arr, suspend:suspended_value};
    // return base_arr;

}

export const pointWinner = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=1;

    const _current_set_winner_string = "Point Winner"
    const _odd_id_current_set_winner = findIdByName(data, _current_set_winner_string);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var arr = [] as any;
        
    for(var participant_id in participants){
        var title = '';
        var suspend = '0'
        var value = '';
        const participant_obj = participants[participant_id];
        if(participant_obj.name === "Home" && parseInt(participant_obj.handicap) === current_game){
            title = data?.team_info?.home?.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            arr.push(obj);
        }
        if(participant_obj.name === "Away" && parseInt(participant_obj.handicap) == current_game){
            title = data?.team_info?.away?.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            arr.push(obj)
        }

    }
    
    console.log(_current_set_winner_string, base_arr)
    base_arr.push(arr);
    
    return {rows:base_arr, suspend:odds.suspend};
}

export const nextPointWinner = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=2;

    const _current_set_winner_string = "Point Winner"
    const _odd_id_current_set_winner = findIdByName(data, _current_set_winner_string);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var arr = [] as any;
        
    for(var participant_id in participants){
        var title = '';
        var suspend = '0'
        var value = '';
        const participant_obj = participants[participant_id];
        if(participant_obj.name === "Home" && parseInt(participant_obj.handicap) === current_game){
            title = data?.team_info?.home?.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            arr.push(obj);
        }
        if(participant_obj.name === "Away" && parseInt(participant_obj.handicap) == current_game){
            title = data?.team_info?.away?.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            arr.push(obj)
        }

    }
    
    console.log(_current_set_winner_string, base_arr)
    base_arr.push(arr);
    return {rows:base_arr, suspend:odds.suspend};
}


export const gameScoreAfter2Points = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=1;

    const _odd_id_current_set_winner = findIdByName(data, "Game Score after 2 points");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var arr = [] as any;
        
    for(var participant_id in participants){
        var title = '';
        var suspend = '0'
        var value = '';
        const participant_obj = participants[participant_id];
        if(parseInt(participant_obj.handicap) == current_game){
            title = participant_obj.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            arr.push(obj)
        }

    }
    
    base_arr.push(arr);
    
    console.log(_odd_id_current_set_winner, base_arr)
    return {rows:base_arr, suspend:odds.suspend};
    // return base_arr;

}

export const nextGameScoreAfter2Points = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=2;

    const _odd_id_current_set_winner = findIdByName(data, "Game Score after 2 points");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    const arr = [] as any;
        
    for(var participant_id in participants){
        var title = '';
        var suspend = '0'
        var value = '';
        const participant_obj = participants[participant_id];
        if(parseInt(participant_obj.handicap) == current_game){
            title = participant_obj.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            arr.push(obj)
        }
    }
    
    base_arr.push(arr);
    
    return {rows:base_arr, suspend:odds.suspend};

}


const _getParticipantsField = (participants:any, line:string, handicap:number) => {
    for(var participant_id in participants){
        var title = '';
        var suspend = '0'
        var value = '';
        const participant_obj = participants[participant_id];
        if(parseInt(participant_obj.handicap) === handicap && participant_obj.name === line){
            title = participant_obj.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            return obj;
        }
    }
    return null;

}

const _getParticipantsFieldWithoutHandicap = (participants:any, line:string) => {
    for(var participant_id in participants){
        var title = '';
        var suspend = '0'
        var value = '';
        const participant_obj = participants[participant_id];
        if(participant_obj.name === line){
            title = participant_obj.name;
            suspend = participant_obj?.suspend;
            value = participant_obj.value_eu;
            var obj = {title:title, value:value, suspend:suspend}
            return obj;
        }
    }
    return null;

}



export const gameScoreAfter3Points = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=1;

    const _odd_id_current_set_winner = findIdByName(data, "Game Score after 3 points");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var firstRow = [_getParticipantsField(participants, "30-15", current_game), _getParticipantsField(participants, "15-30", current_game)];
    var secondRow = [_getParticipantsField(participants, "40-0", current_game), _getParticipantsField(participants, "0-40", current_game)];
    if(firstRow.includes(null) == false && secondRow.includes(null) == false){
        base_arr.push(firstRow);
        base_arr.push(secondRow);
    }

    return {rows:base_arr, suspend:odds.suspend};

}

export const nextGameScoreAfter3Points = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=2;

    const _odd_id_current_set_winner = findIdByName(data, "Game Score after 3 points");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var firstRow = [_getParticipantsField(participants, "30-15", current_game), _getParticipantsField(participants, "15-30", current_game)];
    var secondRow = [_getParticipantsField(participants, "40-0", current_game), _getParticipantsField(participants, "0-40", current_game)];
    if(firstRow.includes(null) == false && secondRow.includes(null) == false){
        base_arr.push(firstRow);
        base_arr.push(secondRow);
    }
    
    return {rows:base_arr, suspend:odds.suspend};
}



export const gameScoreAfter4Points = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=1;

    const _odd_id_current_set_winner = findIdByName(data, "Game Score after 4 points");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var firstRow = [_getParticipantsField(participants, "W-0", current_game), _getParticipantsField(participants, "30-30", current_game),  _getParticipantsField(participants, "0-W", current_game)];
    var secondRow = [_getParticipantsField(participants, "40-15", current_game), {title:"", value:"", suspend: "0"}, _getParticipantsField(participants, "15-40", current_game)];
    if(firstRow.includes(null) == false && secondRow.includes(null) == false){
        base_arr.push(firstRow);
        base_arr.push(secondRow);
    }

    console.log('GAME SCORE AFTER 4', base_arr);
    return {rows:base_arr, suspend:odds.suspend};
}



export const nextGameScoreAfter4Points = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=2;

    const _odd_id_current_set_winner = findIdByName(data, "Game Score after 4 points");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var firstRow = [_getParticipantsField(participants, "W-0", current_game), _getParticipantsField(participants, "30-30", current_game),  _getParticipantsField(participants, "0-W", current_game)];
    var secondRow = [_getParticipantsField(participants, "40-15", current_game), {title:"", value:"", suspend: "0"}, _getParticipantsField(participants, "15-40", current_game)];
    if(firstRow.includes(null) == false && secondRow.includes(null) == false){
        base_arr.push(firstRow);
        base_arr.push(secondRow);
    }

    console.log('GAME SCORE AFTER 4', base_arr);
    return {rows:base_arr, suspend:odds.suspend};
}



export const gameTotalPoints = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=1;

    const _odd_id_current_set_winner = findIdByName(data, "Game Total Points");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var firstRow = [_getParticipantsField(participants, "4 Points", current_game), _getParticipantsField(participants, "5 Points", current_game)];
    var secondRow = [_getParticipantsField(participants, "6 Points", current_game), _getParticipantsField(participants, "Over 6 points", current_game)];
    if(firstRow.includes(null) == false && secondRow.includes(null) == false){
        base_arr.push(firstRow);
        base_arr.push(secondRow);
    }

    console.log('Game Total Points', base_arr);
    return {rows:base_arr, suspend:odds.suspend};
}




export const nextGameTotalPoints = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=2;

    const _odd_id_current_set_winner = findIdByName(data, "Game Total Points");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var firstRow = [_getParticipantsField(participants, "4 Points", current_game), _getParticipantsField(participants, "5 Points", current_game)];
    var secondRow = [_getParticipantsField(participants, "6 Points", current_game), _getParticipantsField(participants, "Over 6 points", current_game)];
    if(firstRow.includes(null) == false && secondRow.includes(null) == false){
        base_arr.push(firstRow);
        base_arr.push(secondRow);
    }

    console.log('Game Total Points', base_arr);
    return {rows:base_arr, suspend:odds.suspend};
}

export const nextGameToHaveBreakpoint = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    const set_regex = new RegExp('S(\\d+)', 'gm')
    var stats = data?.stats;
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=2;

    const _odd_id_current_set_winner = findIdByName(data, "Game to Have Break Point");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var firstRow = [_getParticipantsField(participants, "Yes", current_game), _getParticipantsField(participants, "No", current_game)];
    if(firstRow.includes(null) == false ){
        base_arr.push(firstRow);
    }

    console.log('Game To Have Break Point', base_arr);
    return {rows:base_arr, suspend:odds.suspend};
}

export const nextToGamesEitherGameToDeuce = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    const _odd_id_current_set_winner = findIdByName(data, "Next Two Games - Either Game to Deuce");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }



    var participants = odds.participants;
    var firstRow = [_getParticipantsFieldWithoutHandicap(participants, "Yes"), _getParticipantsFieldWithoutHandicap(participants, "No")];
    if(firstRow.includes(null) == false ){
        base_arr.push(firstRow);
    }

    console.log('Next Two Games - Either Game to Deuce', base_arr);
    return {rows:base_arr, suspend:odds.suspend};
}


export const nextTwoGamesWinner = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    const _odd_id_current_set_winner = findIdByName(data, "Next Two Games - Winner");
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    var home = _getParticipantsFieldWithoutHandicap(participants, "Home");
    var away = _getParticipantsFieldWithoutHandicap(participants, "Away");
    var tie = _getParticipantsFieldWithoutHandicap(participants, "Tie");
    if(home !== null && away !== null && tie != null){
        home.title = data?.team_info?.home.name;
        away.title = data?.team_info?.away.name;
    }
    var firstRow = [home, away, tie];
    if(firstRow.includes(null) == false ){
        base_arr.push(firstRow);
    }

    console.log('Next Two Games - Winner', base_arr);
    return {rows:base_arr, suspend:odds.suspend};
}


function groupParticipantsByHandicapAndName(participants: any) {
    const groupedParticipants = {} as any;

    for (const id in participants) {
        const participant = participants[id];
        const { handicap, name } = participant;

        if (!groupedParticipants[handicap]) {
            groupedParticipants[handicap] = {};
        }

        if (!groupedParticipants[handicap][name]) {
            groupedParticipants[handicap][name] = [];
        }

        groupedParticipants[handicap][name].push(participant);
    }

    // Convert handicap keys to an array of floats and sort them
    const sortedHandicaps = Object.keys(groupedParticipants)
        .map(parseFloat)
        .sort((a, b) => a - b);

    // Create a new object with sorted groups
    const sortedGroups = {} as any;
    for (const handicap of sortedHandicaps) {
        sortedGroups[handicap] = groupedParticipants[handicap];
    }

    return sortedGroups;
}

export const totalGamesInCurrentSet = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    var current_set = data?.info?.period;
    var search_line = "Total Games in " + current_set;
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    const groupedParticipants = groupParticipantsByHandicapAndName(participants);
    for(var handicap in groupedParticipants){
        var grouped_obj = groupedParticipants[handicap];
        
        var arr = [] as any;
        var title_obj = {title: handicap, value: "", suspend:"0"};
        arr.push(title_obj)

        var over_obj = {title: "", value: grouped_obj["Over"][0].value_eu, suspend: grouped_obj["Over"][0].suspend}
        var under_obj = {title: "", value: grouped_obj["Under"][0].value_eu, suspend: grouped_obj["Under"][0].suspend}
        
        arr.push(over_obj)
        arr.push(under_obj)
        base_arr.push(arr);

    }
    return {rows:base_arr, suspend:odds.suspend};
}


export const overUnderCurrentSet = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    var current_period = data?.info?.period;
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    var search_line = "Over/Under by Games (" + current_period_str + " Set)";
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    const groupedParticipants = groupParticipantsByHandicapAndName(participants);
    for(var handicap in groupedParticipants){
        var grouped_obj = groupedParticipants[handicap];
        
        var arr = [] as any;
        var title_obj = {title: handicap, value: "", suspend:"0"};
        arr.push(title_obj)

        var over_obj = {title: "", value: grouped_obj["Over"][0].value_eu, suspend: grouped_obj["Over"][0].suspend}
        var under_obj = {title: "", value: grouped_obj["Under"][0].value_eu, suspend: grouped_obj["Under"][0].suspend}
        
        arr.push(over_obj)
        arr.push(under_obj)
        base_arr.push(arr);

    }
    return {rows:base_arr, suspend:odds.suspend};
}


export const raceToGamesCurrentSet = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    var current_period = data?.info?.period;
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    var search_line = "Race to Games ("+current_period_str+" Set)";
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    const groupedParticipants = groupParticipantsByHandicapAndName(participants);
    console.log("TODO RACE GAMES");
    // for(var handicap in groupedParticipants){
    //     var grouped_obj = groupedParticipants[handicap];
        
    //     var arr = [] as any;
    //     var title_obj = {title: handicap, value: "", suspend:"0"};
    //     arr.push(title_obj)

    //     var home_obj = {title: "", value: grouped_obj["1"][0].value_eu, suspend: grouped_obj["1"][0].suspend}
    //     var away_obj = {title: "", value: grouped_obj["2"][0].value_eu, suspend: grouped_obj["2"][0].suspend}
        
    //     arr.push(home_obj)
    //     arr.push(away_obj)
    //     base_arr.push(arr);

    // }
    return {rows:base_arr, suspend:odds.suspend};
}

export const raceToCurrentSet = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    var current_set = data?.info?.period;
    var search_line = current_set + " Race to";
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    const groupedParticipants = groupParticipantsByHandicapAndName(participants);
    for(var handicap in groupedParticipants){
        var grouped_obj = groupedParticipants[handicap];
        
        var arr = [] as any;
        var title_obj = {title: handicap, value: "", suspend:"0"};
        arr.push(title_obj)

        var home_obj = {title: "", value: grouped_obj["Home"][0].value_eu, suspend: grouped_obj["Home"][0].suspend}
        var away_obj = {title: "", value: grouped_obj["Away"][0].value_eu, suspend: grouped_obj["Away"][0].suspend}
        
        arr.push(home_obj)
        arr.push(away_obj)
        base_arr.push(arr);

    }
    return {rows:base_arr, suspend:odds.suspend};
}


export const leadAfterCurrentSet = (data:any) =>{
    const current_period = data?.info?.period as string;
    
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }

    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    var search_line = 'Lead after (' + current_period_str + " Set)";
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    const groupedParticipants = groupParticipantsByHandicapAndName(participants);
    for(var handicap in groupedParticipants){
        var grouped_obj = groupedParticipants[handicap];
        
        var arr = [] as any;

        var title_obj = {title: handicap, value: "", suspend:"0"};

        arr.push(title_obj)

        var home_obj = {title: "", value: grouped_obj["1"][0].value_eu, suspend: grouped_obj["1"][0].suspend}
        var away_obj = {title: "", value: grouped_obj["2"][0].value_eu, suspend: grouped_obj["2"][0].suspend}
        var tie_obj = {title: "", value: grouped_obj["X"][0].value_eu, suspend: grouped_obj["X"][0].suspend}
        
        arr.push(home_obj)
        arr.push(away_obj)
        arr.push(tie_obj)
        base_arr.push(arr);

    }
    return {rows:base_arr, suspend:odds.suspend};
}

function groupParticipantsBySymmetricScore(participants: any) {
    const groupedParticipants = {} as any;

    for (const participantId in participants) {
        const participant = participants[participantId];
        const [homeScore, awayScore] = participant.name.split('-').map(Number);
        const scoreKey = [homeScore, awayScore].sort().join('-');

        if (!groupedParticipants[scoreKey]) {
            groupedParticipants[scoreKey] = [];
        }

        groupedParticipants[scoreKey].push(participant);
    }

    return groupedParticipants;
}


function groupAndFilterParticipants(participants:any, threshold:number) {
    const groupedAndFilteredParticipants = {} as any;

    for (const participantId in participants) {
        const participant = participants[participantId];
        var [homeScore, awayScore] = participant.name.split('-');
        homeScore = parseInt(homeScore);
        awayScore = parseInt(awayScore);

        
        if (homeScore >= threshold && awayScore >= threshold) {
            const scoreKey = [homeScore, awayScore].sort().reverse().join('-');

            if (!groupedAndFilteredParticipants[scoreKey]) {
                groupedAndFilteredParticipants[scoreKey] = [];
            }

            groupedAndFilteredParticipants[scoreKey].push(participant);
        }
    }

    return groupedAndFilteredParticipants;
}




export const correctScoreCurrentSet = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    var current_period = data?.info?.period;
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }
    

    var search_line = "Correct Score ("+current_period_str+" Set)";
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    var participants = odds.participants;

    var current_set_stats = data?.stats[Object.keys(data?.stats).length - 1];
    var least_game = current_set_stats.home > current_set_stats.away ? current_set_stats.away  : current_set_stats.home;
    console.log('stats', data?.stats)
    console.log('lenght', Object.keys(data?.stats).length - 1);
    console.log('ll least game', least_game)
    const grouped_participants =  groupAndFilterParticipants(participants, least_game);
    for(var group in grouped_participants){
        var arr = [] as any;
        var group_obj = grouped_participants[group];
        var title_obj = {title: group, value: "", suspend:"0"};
        var home_obj = {title: "", value: group_obj[0].value_eu, suspend: group_obj[0].suspend}
        var away_obj = {title: "", value: group_obj[1].value_eu, suspend: group_obj[1].suspend}
        arr.push(title_obj, home_obj, away_obj)
        base_arr.push(arr);
    }
    return {rows:base_arr, suspend:odds.suspend};
}


export const correctScoreCurrentSetAnyPlayer = (data:any) =>{
    try{

        if (!data && !data.odds) {
            return {rows:[], suspend:"0"};
        }

        const base_arr = [] as any;

        var current_period = data?.info?.period;
        var current_period_str = "";
        const period_regex = new RegExp('Set (\\d+)')
        var _matching = current_period.match(period_regex);
        if(_matching){
            var set_number = parseInt(_matching[1])
            if(set_number == 1){
                current_period_str = set_number.toString() + "st"
            }
            if(set_number == 2){
                current_period_str = set_number.toString() + "nd"
            }
            if(set_number == 3){
                current_period_str = set_number.toString() + "rd"
            }
            if(set_number > 3){
                current_period_str = set_number.toString() + "th"
            }
        }
        

        var search_line = current_period + " Correct Score Any Player";
        const _odd_id_current_set_winner = findIdByName(data, search_line);
        var odds = data?.odds[_odd_id_current_set_winner];
        if(odds === undefined){
            return {rows:[], suspend:"0"};
        }
        var participants = odds.participants;

        var current_set_stats = data?.stats[Object.keys(data?.stats).length - 1];
        var least_game = current_set_stats.home > current_set_stats.away ? current_set_stats.away  : current_set_stats.home;
        const grouped_participants =  groupAndFilterParticipants(participants, parseInt(least_game));
        for(var group in grouped_participants){
            var arr = [] as any;
            var group_obj = grouped_participants[group];
            console.log("gg", group_obj);
            var title_obj = {title: group, value: "", suspend:"0"};
            var home_obj = {title: "", value: group_obj[0].value_eu, suspend: group_obj[0].suspend}
            var away_obj = {title: "", value: group_obj[1].value_eu, suspend: group_obj[1].suspend}
            console.log('hh', home_obj)
            console.log('ii', away_obj)
            arr.push(title_obj, home_obj, away_obj)
            base_arr.push(arr);
        }

        return {rows:base_arr, suspend:odds.suspend};

    }catch(err){
        return {rows:[], suspend:"0"};
    }
}


// Very dummy but odds feed bring 2 different odd types on the same odd id, wtf right?
export const correctScoreCurrentSetAnyPlayerDrawBack = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    var current_period = data?.info?.period;
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }
    

    //var search_line = current_period + " Correct Score Any Player";
    var search_line = "Correct Score Any Player (" + current_period_str+ " Set)"

    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    var participants = odds.participants;

    var current_set_stats = data?.stats[Object.keys(data?.stats).length - 1];
    var least_game = current_set_stats.home > current_set_stats.away ? current_set_stats.away  : current_set_stats.home;
    const grouped_participants =  groupAndFilterParticipants(participants, parseInt(least_game));
    console.log('gg', grouped_participants);

    const groupedParticipants = [];

    const keys = Object.keys(participants);
    for (let i = 0; i < keys.length; i += 2) {
        const group = [];
        if (i < keys.length) {
            if (participants[keys[i]].suspend !== "1") {
                const participant_obj = participants[keys[i]];
                var element = {title: participant_obj.name, value:participant_obj.value_eu, suspend:participant_obj.suspend}
                group.push(element);
                // group.push(participants[keys[i]]);
            }
        }
        if (i + 1 < keys.length) {
            if (participants[keys[i + 1]].suspend !== "1") {
                const participant_obj = participants[keys[i + 1]];
                var element = {title: participant_obj.name, value:participant_obj.value_eu, suspend:participant_obj.suspend}
                group.push(element);
            }
        }
        if (group.length > 0) {
            base_arr.push(group);
        }
    }
    return {rows:base_arr, suspend:odds.suspend};
}


export const currentSetToBreakServe = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    var base_arr = [] as any;

    var current_period = data?.info?.period;
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }
    

    var search_line = current_period + " to Break Serve";

    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    var participants = odds.participants;

    var home_yes = _getParticipantsFieldWithoutHandicap(participants, "1/Yes");
    var away_yes = _getParticipantsFieldWithoutHandicap(participants, "2/Yes");
    var home_no = _getParticipantsFieldWithoutHandicap(participants, "1/No");
    var away_no = _getParticipantsFieldWithoutHandicap(participants, "2/No");
    
    if(home_yes !== null && home_no !== null && away_yes !== null && away_no !== null){
        home_yes.title = "";
        home_no.title = "";
        away_yes.title = "";
        away_no.title = "";
    }

    var home_title = {title:data?.team_info?.home.name, value:"", suspend:"0"}
    var away_title = {title:data?.team_info?.away.name, value:"", suspend:"0"}
    var row_1 = [home_title, home_yes, home_no]
    var row_2 = [away_title, away_yes, away_no]
    base_arr.push(row_1)
    base_arr.push(row_2)
    base_arr = base_arr.filter((arr:any) => !(arr[1].suspend === "1" && arr[2].suspend === "1"));

    return {rows:base_arr, suspend:odds.suspend};
}

export const goTheDistance = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;


    var search_line = "Go The Distance?";

    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    var participants = odds.participants;

    var yes = _getParticipantsFieldWithoutHandicap(participants, "Yes");
    var no = _getParticipantsFieldWithoutHandicap(participants, "No");
    
    var row_1 = [yes, no]
    base_arr.push(row_1)

    return {rows:base_arr, suspend:odds.suspend};
}

export const matchOddEven = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;


    var search_line = "Odd/Even";

    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    var participants = odds.participants;

    var odd = _getParticipantsFieldWithoutHandicap(participants, "Odd");
    var even = _getParticipantsFieldWithoutHandicap(participants, "Even");
    
    var row_1 = [odd, even]
    base_arr.push(row_1)

    return {rows:base_arr, suspend:odds.suspend};
}


function groupSymmetricPairs(participants: any) {
    const symmetricPairs = [] as any;
    const reverseGroupMap = {} as any;

    for (const groupId in participants) {
        const participant = participants[groupId];
        const groupName = participant.name;
        const scores = groupName.split(',').map((score: string) => score.trim());;
        const reverseScores = scores.map((score:string) => {
            const [home, away] = score.split('-');
            return away.toString() + "-" + home.toString();
        });

        const scoreGroupName = scores.join(',');
        const reverseGroupName = reverseScores.join(',');
        if (reverseGroupMap[reverseGroupName]) {
            symmetricPairs.push([participant, reverseGroupMap[reverseGroupName]]);
            delete reverseGroupMap[reverseGroupName];
        } else {
            reverseGroupMap[scoreGroupName] = participant;
        }
    }

    return symmetricPairs;
}

export const currectSetCorrectScoreGroup = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    var current_period = data?.info?.period;
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }
    

    var search_line = "Correct Score Group (" + current_period_str + " Set)";
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    var participants = odds.participants;
    const group = groupSymmetricPairs(participants);
    for(var pair in group){
        var arr = [] as any;
        var group_obj = group[pair];
        var title_obj = {title: group_obj[1].name, value: "", suspend: ""}
        // if(group_obj[0].suspend !== "1" && group_obj[1].suspend !== "1"){

            var first_group = {title: "", value: group_obj[1].value_eu, suspend: group_obj[1].suspend}
            var second_group = {title: "", value: group_obj[0].value_eu, suspend: group_obj[0].suspend}
            arr.push(title_obj);
            arr.push(first_group);
            arr.push(second_group);
            base_arr.push(arr);
        // }
    }

    return {rows:base_arr, suspend:odds.suspend};
}

export const currentSetScoreAfter4Games = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    var current_period = data?.info?.period;
    var current_period_str = "";
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_period.match(period_regex);
    if(_matching){
        var set_number = parseInt(_matching[1])
        if(set_number == 1){
            current_period_str = set_number.toString() + "st"
        }
        if(set_number == 2){
            current_period_str = set_number.toString() + "nd"
        }
        if(set_number == 3){
            current_period_str = set_number.toString() + "rd"
        }
        if(set_number > 3){
            current_period_str = set_number.toString() + "th"
        }
    }
    

    var search_line = "Score after 4 Games (" + current_period_str + " Set)";
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    var participants = odds.participants;
    const group = groupParticipantsBySymmetricScore(participants);
    for(var pair in group){
        var arr = [] as any;
        var group_obj = group[pair];

        var obj = group_obj[0];
        if(obj.suspend === "1"){
            continue;
        }
        var title_obj = {title: obj.name, value: "", suspend: obj.suspend}
        arr.push(title_obj);
        for(var i=0; i<group_obj.length;i++){

            var obj = group_obj[i];
            console.log("ass>?", obj)
            if(obj.suspend !== "1"){
                
                
                var value_obj = {title: "", value: obj.value_eu, suspend: obj.suspend}
                arr.push(value_obj)

            }
        }
        base_arr.push(arr);
        // if(group_obj[0].suspend !== "1" && group_obj[1].suspend !== "1"){

        //     var title_obj = {title: pair, value: "", suspend: ""}
        //     var first_group = {title: "", value: group_obj[1].value_eu, suspend: group_obj[1].suspend}
        //     var second_group = {title: "", value: group_obj[0].value_eu, suspend: group_obj[0].suspend}
        //     arr.push(title_obj);
        //     arr.push(first_group);
        //     arr.push(second_group);
        //     base_arr.push(arr);
        // }
    }

    return {rows:base_arr, suspend:odds.suspend};
}