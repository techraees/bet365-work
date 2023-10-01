'use client';
import React from "react";


function areAllSuspended(data:any) {

    const base_arr_is_suspended =  data.flat().every((item:any) => item.suspend === "1");
    if(base_arr_is_suspended){
        return "1"
    }else{
        return "0"
    }

}

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

export const getNextSetTitle = (data:any, prevString: string) =>{

    var current_set = data?.info?.period;
    const period_regex = new RegExp('Set (\\d+)')
    var _matching = current_set.match(period_regex);
    var next_set_number = parseInt(_matching[1]) + 1;
    var new_string = "Set " + next_set_number.toString()

    var new_string = prevString.replace("Set X", new_string);
    return new_string;
}

export const getPlayer1Name = (data:any, prevString: string) =>{

    var player_1 = data?.team_info?.home?.name

    var new_string = prevString.replace("Player X", player_1);
    return new_string;
}

export const getPlayer2Name = (data:any, prevString: string) =>{

    var player_2 = data?.team_info?.away?.name

    var new_string = prevString.replace("Player X", player_2);
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
        var title_row_obj = {title:"Match", value:null, suspend:odds_final_winner.suspend}
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
        // var title_row_obj = {title:current_period, value:null, suspend:"1"};
        var title_row_obj: { title: string; value: null; suspend: string | any } = { title: current_period, value: null, suspend: "1" };

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
    const suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};

}


export const pointBetting = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    const current_period = data?.info?.period as string;
    var search_line = "Point Betting";

    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    var participants = odds.participants;
    var grouped = groupParticipantsByHandicapAndName(participants);
    console.log('grouped1_participants', participants)
    console.log('grouped1', grouped)
    for(var group in grouped){
        var grouped_obj = grouped[group];
        if(grouped_obj === undefined){
            continue;
        }
        if(grouped_obj["Home"] === undefined || grouped_obj["Away"] === undefined){
            continue;
        }
        console.log("ggobj1", grouped_obj)
        console.log("ggobj", grouped_obj["Home"][0])

        var arr = [] as any;
        var [game, point] = group.split(".");
        point = parseInt(point).toString();
        var home_obj = grouped_obj["Home"][0]
        var away_obj = grouped_obj["Away"][0]
        var title_obj = {title:point, value:null, suspend:home_obj.suspend}
        var home_row_obj = {title:"", value:home_obj.value_eu, suspend:home_obj.suspend};
        var away_row_obj = {title:"", value:away_obj.value_eu, suspend:away_obj.suspend};
        arr = [title_obj, home_row_obj, away_row_obj];
        base_arr.push(arr);


    }


    // var suspended_value = allParticipantsSuspended(participants).toString();
    const suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};

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
        arr.push(home);
    }
    if(away){
        away.title = data?.team_info?.away?.name
        arr.push(away);
    }
    
    base_arr.push(arr);
    const suspend_value = areAllSuspended(base_arr)
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
    
    console.log(current_set_winner_string, base_arr)
    const suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};

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
    console.log("here12", participants);
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
    // var suspended_value = allSuspendedForHandicap(participants, current_game);
    const suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};

}


const base_arr_is_suspended = (base_arr:any) =>{
        var total_suspended_values = 0;
        var total_values = 0;
        for(var sub_array of base_arr){

            for(var item of sub_array){
                if(item.suspend_value === "1"){

                    total_suspended_values++;
                }
                total_values++;
            }

        }

        if(total_suspended_values === total_values){
            return "1";
        }
        return "0";
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

    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};

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
    
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};

}

function allSuspendedForHandicap(participants: any, targetHandicap: number): string {
    const filteredParticipants = Object.values(participants).filter((participant:any) => parseInt(participant.handicap) === targetHandicap);
    var result = filteredParticipants.every((participant:any) => participant.suspend === "1");
    if(result){
        return "1";
    }
    return "0"
}

function allParticipantsSuspended(participants: any): string {
    var _participants = Object.values(participants);
    var result = _participants.every((participant:any) => participant.suspend === "1");
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
    
    console.log("Game Score", base_arr)
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
    
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
    
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};

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

const _getParticipantsFieldRaw = (participants:any, line:string) => {
    for(var participant_id in participants){
        const participant_obj = participants[participant_id];
        if(participant_obj.name === line){
            return participant_obj;
        }
    }
    return null;

}

const _getParticipantsFieldRawWithoutSuspend = (participants:any, line:string) => {
    for(var participant_id in participants){
        const participant_obj = participants[participant_id];
        if(participant_obj.name === line && participant_obj.suspend !== "1"){
            return participant_obj;
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

    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};

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
    
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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

    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
        
        if(grouped_obj["Over"] === undefined || grouped_obj["Under"] === undefined){
            continue;
        }
        var arr = [] as any;
        var title_obj = {title: handicap, value: "", suspend:grouped_obj["Over"][0].suspend};
        arr.push(title_obj)


        var over_obj = {title: "", value: grouped_obj["Over"][0].value_eu, suspend: grouped_obj["Over"][0].suspend}
        var under_obj = {title: "", value: grouped_obj["Under"][0].value_eu, suspend: grouped_obj["Under"][0].suspend}
        
        arr.push(over_obj)
        arr.push(under_obj)
        base_arr.push(arr);

    }
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
        var title_obj = {title: handicap, value: "", suspend:grouped_obj["Over"][0]};
        arr.push(title_obj)

        var over_obj = {title: "", value: grouped_obj["Over"][0].value_eu, suspend: grouped_obj["Over"][0].suspend}
        var under_obj = {title: "", value: grouped_obj["Under"][0].value_eu, suspend: grouped_obj["Under"][0].suspend}
        
        arr.push(over_obj)
        arr.push(under_obj)
        base_arr.push(arr);

    }
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
        var title_obj = {title: handicap, value: "", suspend:grouped_obj["Home"][0].suspend};
        arr.push(title_obj)

        if(grouped_obj["Home"] && grouped_obj["Away"]){

            var home_obj = {title: "", value: grouped_obj["Home"][0].value_eu, suspend: grouped_obj["Home"][0].suspend}
            var away_obj = {title: "", value: grouped_obj["Away"][0].value_eu, suspend: grouped_obj["Away"][0].suspend}
            
            arr.push(home_obj)
            arr.push(away_obj)
            base_arr.push(arr);
        }

    }
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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

        var title_obj = {title: handicap, value: "", suspend:grouped_obj["1"].suspend};

        arr.push(title_obj)

        var home_obj = {title: "", value: grouped_obj["1"][0].value_eu, suspend: grouped_obj["1"][0].suspend}
        var away_obj = {title: "", value: grouped_obj["2"][0].value_eu, suspend: grouped_obj["2"][0].suspend}
        var tie_obj = {title: "", value: grouped_obj["X"][0].value_eu, suspend: grouped_obj["X"][0].suspend}
        
        arr.push(home_obj)
        arr.push(away_obj)
        arr.push(tie_obj)
        base_arr.push(arr);

    }
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
        var title_obj = {title: group, value: "", suspend:group_obj[0].suspend};
        var home_obj = {title: "", value: group_obj[0].value_eu, suspend: group_obj[0].suspend}
        var away_obj = {title: "", value: group_obj[1].value_eu, suspend: group_obj[1].suspend}
        arr.push(title_obj, home_obj, away_obj)
        base_arr.push(arr);
    }
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
}


export const correctScoreCurrentSet2 = (data:any) =>{
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
    

    var search_line = "Double Result";
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    var participants = odds.participants;
    const namesToRemove = ["1/1", "1/2", "2/1", "2/2"];

    for (const key in participants) {
        if (participants.hasOwnProperty(key) && namesToRemove.includes(participants[key].name)) {
            delete participants[key];
        }
    }
    console.log('hahahaha', participants)
    participants = groupAndFilterParticipants(participants, 0)
    console.log('hahahaha2',participants)


    // var current_set_stats = data?.stats[Object.keys(data?.stats).length - 1];
    // var least_game = current_set_stats.home > current_set_stats.away ? current_set_stats.away  : current_set_stats.home;
    // console.log('stats', data?.stats)
    // console.log('lenght', Object.keys(data?.stats).length - 1);
    // console.log('ll least game', least_game)
    // const grouped_participants =  groupAndFilterParticipants(participants, least_game);
    // for(var group in grouped_participants){
    //     var arr = [] as any;
    //     var group_obj = grouped_participants[group];
    //     var title_obj = {title: group, value: "", suspend:"0"};
    //     var home_obj = {title: "", value: group_obj[0].value_eu, suspend: group_obj[0].suspend}
    //     var away_obj = {title: "", value: group_obj[1].value_eu, suspend: group_obj[1].suspend}
    //     arr.push(title_obj, home_obj, away_obj)
    //     base_arr.push(arr);
    // }
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
            var title_obj = {title: group, value: "", suspend:group_obj[0].suspend};
            var home_obj = {title: "", value: group_obj[0].value_eu, suspend: group_obj[0].suspend}
            var away_obj = {title: "", value: group_obj[1].value_eu, suspend: group_obj[1].suspend}
            console.log('hh', home_obj)
            console.log('ii', away_obj)
            arr.push(title_obj, home_obj, away_obj)
            base_arr.push(arr);
        }

        var suspend_value = areAllSuspended(base_arr)
        return {rows:base_arr, suspend:suspend_value};

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
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
}


export const correctScoreNextSetAnyPlayer = (data:any) =>{
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
            set_number += 1;
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
            var title_obj = {title: group, value: "", suspend:group_obj[0].suspend};
            var home_obj = {title: "", value: group_obj[0].value_eu, suspend: group_obj[0].suspend}
            var away_obj = {title: "", value: group_obj[1].value_eu, suspend: group_obj[1].suspend}
            console.log('hh', home_obj)
            console.log('ii', away_obj)
            arr.push(title_obj, home_obj, away_obj)
            base_arr.push(arr);
        }

        var suspend_value = areAllSuspended(base_arr)
        return {rows:base_arr, suspend:suspend_value};

    }catch(err){
        return {rows:[], suspend:"0"};
    }
}

export const correctScoreNextSetAnyPlayerDrawBack = (data:any) =>{
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
        set_number += 1;
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
    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
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
        var home_title = {title:data?.team_info?.home.name, value:"", suspend:home_yes.suspend}
        var away_title = {title:data?.team_info?.away.name, value:"", suspend:away_yes.suspend}
        var row_1 = [home_title, home_yes, home_no]
        var row_2 = [away_title, away_yes, away_no]
        base_arr.push(row_1)
        base_arr.push(row_2)
    }

    // base_arr = base_arr.filter((arr:any) => !(arr[1].suspend === "1" && arr[2].suspend === "1"));

    var suspend_value = areAllSuspended(base_arr)
    return {rows:base_arr, suspend:suspend_value};
}


export const nextSetToBreakServe = (data:any) =>{
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
        set_number+=1;
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
        var home_title = {title:data?.team_info?.home.name, value:"", suspend:home_yes.suspend}
        var away_title = {title:data?.team_info?.away.name, value:"", suspend:away_yes.suspend}
        var row_1 = [home_title, home_yes, home_no]
        var row_2 = [away_title, away_yes, away_no]
        base_arr.push(row_1)
        base_arr.push(row_2)
    }

    // base_arr = base_arr.filter((arr:any) => !(arr[1].suspend === "1" && arr[2].suspend === "1"));

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
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

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
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

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
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
            if(home === undefined || away === undefined){
                return;
            }
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


function groupSymmetrically(data: any) {
    let grouped = [] as any;
    let visited = {} as any;

    for (let key in data) {
        const item = data[key];
        const symmetricName = item.name.split(':').reverse().join(':');

        // Check if the symmetric pair is already processed
        if (!visited[symmetricName]) {
            const symmetricItem = Object.values(data).find((i:any) => i.name === symmetricName);

            if (symmetricItem) {
                grouped.push([item, symmetricItem]);
                visited[item.name] = true;
                visited[symmetricName] = true;
            } else {
                grouped.push([item]);
                visited[item.name] = true;
            }
        }
    }

    return grouped;
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

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const currectSetCorrectScoreGroup2 = (data:any) =>{
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
    

    var search_line = current_period + " Correct Score Group";
    // var search_line = "Correct Score Group (" + current_period_str + " Set)";
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

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const nextSetCorrectScoreGroup = (data:any) =>{
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
        set_number+=1;
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

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const nextSetCorrectScoreGroup2 = (data:any) =>{
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
        set_number+=1;
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
    

    var search_line = current_period + " Correct Score Group";
    // var search_line = "Correct Score Group (" + current_period_str + " Set)";
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

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
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
        var obj2 = group_obj[1];
        if(obj === undefined || obj2 === undefined){
            continue;
        }
        if(obj.suspend === "1" && obj2.suspend ==="1"){
            continue;
        }
        var title_obj = {title: obj.name, value: "", suspend: obj.suspend}
        arr.push(title_obj);
        for(var i=0; i<group_obj.length;i++){

            var obj = group_obj[i];
            console.log("ass>?", obj)
            var value_obj = {title: "", value: obj.value_eu, suspend: obj.suspend}
            arr.push(value_obj)

        }
        base_arr.push(arr);

    }

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const currentSetScoreAfter6Games = (data:any) =>{
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
    

    var search_line = "Score after 6 Games (" + current_period_str + " Set)";
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
        var obj2 = group_obj[1];
        if(obj === undefined || obj2 === undefined){
            continue;
        }

        if(obj.suspend === "1" && obj2.suspend === "1"){
            continue;
        }
        var title_obj = {title: obj.name, value: "", suspend: obj.suspend}
        arr.push(title_obj);
        for(var i=0; i<group_obj.length;i++){

            var obj = group_obj[i];
                var value_obj = {title: "", value: obj.value_eu, suspend: obj.suspend}
                arr.push(value_obj)
        }
        base_arr.push(arr);
    }

    // return {rows:[], suspend:0}
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const nextSetScoreAfter4Games = (data:any) =>{
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
        set_number+=1;
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

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const nextSetScoreAfter6Games = (data:any) =>{
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
        set_number+=1;
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
    

    var search_line = "Score after 6 Games (" + current_period_str + " Set)";
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    var participants = odds.participants;
    const group = groupParticipantsBySymmetricScore(participants);
    console.log('ss222', group);
    for(var pair in group){
        var arr = [] as any;
        var group_obj = group[pair];
        console.log("ppar", group_obj)

        var obj = group_obj[0];
        console.log("ppar2", obj)
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
    }

    // return {rows:[], suspend:0}
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}



export const currentSetHandicap = (data:any) =>{
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
        
        // to find the next set 
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
    
    

    var search_line = "Asian Handicap (" + current_period_str + " Set)"
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    
    var arr = [] as any;
    var participants = odds.participants;
    var home_participant = _getParticipantsFieldRaw(participants, "Home");
    var away_participant = _getParticipantsFieldRaw(participants, "Away");
    if(home_participant){
        var title = data?.team_info.home.name + " " + home_participant.handicap ;
        var value = home_participant.value_eu;
        var suspend = home_participant.suspend;
        var home_obj = {title: title, value: value, suspend: suspend}
        arr.push(home_obj)

    }
    if(away_participant){
        var title = data?.team_info.away.name + " " + away_participant.handicap ;
        var value = away_participant.value_eu;
        var suspend = away_participant.suspend;
        var away_obj = {title: title, value: value, suspend: suspend}
        arr.push(away_obj)

    }
    base_arr.push(arr);

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}




export const currentSetTieBreak = (data:any) =>{
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
        
        // to find the next set 
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
    
    

    var search_line = "Asian Handicap (" + current_period_str + " Set)"
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    
    var arr = [] as any;
    var participants = odds.participants;
    var home_participant = _getParticipantsFieldRaw(participants, "Home");
    var away_participant = _getParticipantsFieldRaw(participants, "Away");
    if(home_participant){
        var title = data?.team_info.home.name + " " + home_participant.handicap ;
        var value = home_participant.value_eu;
        var suspend = home_participant.suspend;
        var home_obj = {title: title, value: value, suspend: suspend}
        arr.push(home_obj)

    }
    if(away_participant){
        var title = data?.team_info.away.name + " " + away_participant.handicap ;
        var value = away_participant.value_eu;
        var suspend = away_participant.suspend;
        var away_obj = {title: title, value: value, suspend: suspend}
        arr.push(away_obj)

    }
    base_arr.push(arr);

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const currentSetTieBreakTotalPoints = (data:any) =>{
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
        
        // to find the next set 
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
    
    

    var search_line = "Tie Break - Total Points (" + current_period_str + " Set)"
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    
    var participants = odds.participants;
    const group = _groupParticipantsByHandicapAndName(participants) as any;

    for(var handicap in group){
        
        var arr = [] as any;
        var group_obj = group[handicap];
        if(group_obj[0] === undefined || group_obj[1] === undefined){
            continue;
        }

        var title_obj = {title:handicap, value:"", suspend:over_participant.suspend};
        arr.push(title_obj);
        var over_participant = group_obj[0]
        var under_participant = group_obj[1]
        arr.push({title:"", value: over_participant.value_eu, suspend:over_participant.suspend})
        arr.push({title:"", value: under_participant.value_eu, suspend:under_participant.suspend})
        base_arr.push(arr);
    }
    const sortedData = base_arr.sort((a: any, b: any) => {
        const titleA = a[0].title;
        const titleB = b[0].title;

        // Subtracting ensures the correct positive, negative, or zero value is returned.
        return parseFloat(titleA) - parseFloat(titleB);
    });
    console.log('sorted', sortedData);
    base_arr = sortedData;

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const currentSetTieBreakScore = (data:any) =>{
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
        
        // to find the next set 
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
    
    

    var search_line = "Tie Break Score (" + current_period_str + " Set)"
    console.log('s2_line', search_line);
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    
    var participants = odds.participants;
    var group = groupSymmetricPairs(participants)
    console.log('group 1', group);
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const currentSetTieBreakWinner = (data:any) =>{
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
        
        // to find the next set 
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
    
    

    var search_line = "Tie Break Winner (" + current_period_str + " Set)"
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    
    var participants = odds.participants;
    var home_participant = _getParticipantsFieldRaw(participants, "Home")
    var away_participant = _getParticipantsFieldRaw(participants, "Away")

    var row1 = [] as any;

    var row2 = [] as any;

    if(home_participant && away_participant){
        var home_obj = {title:data?.team_info?.home?.name, value: home_participant.value_eu, suspend: home_participant.suspend}
        var away_obj = {title:data?.team_info?.away?.name, value: away_participant.value_eu, suspend: away_participant.suspend}
        row1 = [home_obj]
        row2 = [away_obj]
        base_arr.push(row1)
        base_arr.push(row2)
    }


    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const nextSetHandicap = (data:any) =>{
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
        
        // to find the next set 
        set_number += 1;
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
    
    

    var search_line = "Asian Handicap (" + current_period_str + " Set)"
    console.log('ss line', search_line);
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    console.log('oddsszz', odds);
    
    var arr = [] as any;
    var participants = odds.participants;
    var home_participant = _getParticipantsFieldRaw(participants, "Home");
    var away_participant = _getParticipantsFieldRaw(participants, "Away");
    if(home_participant){
        var title = data?.team_info.home.name + " " + home_participant.handicap ;
        var value = home_participant.value_eu;
        var suspend = home_participant.suspend;
        var home_obj = {title: title, value: value, suspend: suspend}
        arr.push(home_obj)

    }
    if(away_participant){
        var title = data?.team_info.away.name + " " + away_participant.handicap ;
        var value = away_participant.value_eu;
        var suspend = away_participant.suspend;
        var away_obj = {title: title, value: value, suspend: suspend}
        arr.push(away_obj)

    }

    base_arr.push(arr);

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const totalSets = (data:any) =>{
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
        
        // to find the next set 
        set_number += 1;
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
    
    

    var search_line = "Total Sets"
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    
    var participants = odds.participants;
    var index = 0;
    var length = Object.keys(participants).length;

    for (var participant_id in participants) {
        if (index % 2 === 0 && index !== length - 1) {
            var arr = [];
            var first_participant = participants[participant_id];
            arr.push({
                title: first_participant.name,
                value: first_participant.value_eu,
                suspend: first_participant.suspend
            });

            // Getting the next participant
            var next_key = Object.keys(participants)[index + 1];
            var second_participant = participants[next_key];
            arr.push({
                title: second_participant.name,
                value: second_participant.value_eu,
                suspend: second_participant.suspend
            });

            base_arr.push(arr);
        }

        index++;
    }

    // If there's an odd number of participants, we add the last one to its own array
    if (length % 2 !== 0) {
        var last_participant = participants[Object.keys(participants)[length - 1]];
        base_arr.push([{
            title: last_participant.name,
            value: last_participant.value_eu,
            suspend: last_participant.suspend
        }]);
    }

    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}



export const playersOverUnder = (data:any) =>{
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
        
        // to find the next set 
        set_number += 1;
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
    
    

    var search_line = "Player 1 Over/Under by Games"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds_player_1 = data?.odds[_odd_id_current_set_winner];
    if(odds_player_1 === undefined){
        return {rows:[], suspend:"0"};
    }

    search_line = "Player 2 Over/Under by Games"
    _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds_player_2 = data?.odds[_odd_id_current_set_winner];
    if(odds_player_2 === undefined){
        return {rows:[], suspend:"0"};
    }
    
    var player_1_participants = odds_player_1.participants;
    var player_2_participants = odds_player_2.participants;

    var arr = [] as any;
    var player_1_over_participant = _getParticipantsFieldRaw(player_1_participants, "Over");
    var player_1_under_participant = _getParticipantsFieldRaw(player_1_participants, "Under");
    var player_2_over_participant = _getParticipantsFieldRaw(player_2_participants, "Over");
    var player_2_under_participant = _getParticipantsFieldRaw(player_2_participants, "Under");
    var player_1_over_obj = {title: player_1_over_participant.name + " " + player_1_over_participant.handicap, value: player_1_over_participant.value_eu, suspend: player_1_over_participant.suspend}
    var player_1_under_obj = {title: player_1_under_participant.name + " " + player_1_under_participant.handicap, value: player_1_under_participant.value_eu, suspend: player_1_under_participant.suspend}
    var player_2_over_obj = {title: player_2_over_participant.name + " " + player_2_over_participant.handicap, value: player_2_over_participant.value_eu, suspend: player_2_over_participant.suspend}
    var player_2_under_obj = {title: player_2_over_participant.name + " " + player_2_under_participant.handicap, value: player_2_under_participant.value_eu, suspend: player_2_under_participant.suspend}

    arr.push(player_1_over_obj, player_1_under_obj, player_2_over_obj, player_2_under_obj)
    base_arr.push(arr)

    var suspend_value = "0"
    if(player_1_over_participant.suspend === "1" && player_1_under_participant.suspend === "1" && player_2_over_participant.suspend === "1" && player_2_under_participant.suspend === "1"){
        suspend_value = "1"
    }
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}

interface Participant {
    id: string | number; // you can adjust this to either string or number depending on your exact requirements
    name: string;
    value_eu: number;
    // Add any other properties as needed
}

export const _groupSetBetting = (participants: { [key: string]: Participant }) => {

    const grouped: Participant[][] = [];
    const processedIds: (string | number)[] = [];

    for (let participant_id in participants) {
        const participant = participants[participant_id];
        if (!processedIds.includes(participant.id)) {
            const reversedName = participant.name.split(":").reverse().join(":");
            const symmetric = Object.values(participants).find(p => p.name === reversedName && !processedIds.includes(p.id));

            if (symmetric) {
                grouped.push([participant, symmetric]);
                processedIds.push(participant.id, symmetric.id);
            } else {
                grouped.push([participant]);
                processedIds.push(participant.id);
            }
        }
    }
    return grouped;
}

export const setBetting = (data:any) =>{
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
        
        // to find the next set 
        set_number += 1;
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
    
    

    var search_line = "Set Betting"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var arr = [] as any;
    var participants = odds.participants;
    var groups = _groupSetBetting(participants)
    for(var group_id in groups){
        var arr = [] as any;
        var group_obj = groups[group_id];
        var obj_1  = group_obj[0]
        var obj_2  = group_obj[1]
        // var title = group

    }


    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};

}

const _groupParticipantsByHandicapAndName = (participants:any) =>{

    // Convert the data object to an array of values
    const dataArray = Object.values(participants);

    // Sort the array by handicap and then by name
    dataArray.sort((a:any, b:any) => {
        if (a.handicap === b.handicap) {
            return a.name.localeCompare(b.name);
        }
        return a.handicap.localeCompare(b.handicap);
    });

    // Group the sorted array by handicap
    const groupedData = dataArray.reduce((acc:any, item:any) => {
        if (!acc[item.handicap]) {
            acc[item.handicap] = [];
        }
        acc[item.handicap].push(item);
        return acc;
    }, {});

    return groupedData;
}

export const totalGamesInMatch = (data:any) =>{
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
        
        // to find the next set 
        set_number += 1;
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
    
    

    var search_line = "Total Games in Match"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var arr = [] as any;
    var participants = odds.participants;
    var grouped = _groupParticipantsByHandicapAndName(participants) as any;
    var arr = [] as any;
    for(var handicap in grouped){
        var title = handicap;
        var over_obj = grouped[handicap][0];
        var under_obj = grouped[handicap][1];
        if(over_obj !== undefined && under_obj !== undefined){

            var _title_obj = {title:title, value:"", suspend:over_obj.suspend};
            var _over_obj = {title:"", value: over_obj.value_eu, suspend:over_obj.suspend};
            var _under_obj = {title:"", value: under_obj.value_eu, suspend:under_obj.suspend};
            arr = [_title_obj, _over_obj, _under_obj];
            base_arr.push(arr);
        }
    }
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};

}


export const player1To = (data:any) =>{
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
        
        // to find the next set 
        set_number += 1;
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
    
    

    var search_line = "Player 1 To Win in Straight Sets"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var player_1_to_win_in_straight_sets_odds = data?.odds[_odd_id_current_set_winner];
    if(player_1_to_win_in_straight_sets_odds !== undefined){
        var player_1_to_win_in_straight_sets_yes = _getParticipantsFieldRaw(player_1_to_win_in_straight_sets_odds.participants, "Yes")
        var player_1_to_win_in_straight_sets_no = _getParticipantsFieldRaw(player_1_to_win_in_straight_sets_odds.participants, "No")


        var player_1_to_win_in_straight_sets_title = {title:"Win in Straight Sets", value: "", suspend:""}
        var player_1_to_win_in_straight_sets_yes_obj = {title:"", value:player_1_to_win_in_straight_sets_yes.value_eu, suspend:player_1_to_win_in_straight_sets_yes.suspend}
        var player_1_to_win_in_straight_sets_no_obj = {title:"", value:player_1_to_win_in_straight_sets_no.value_eu, suspend:player_1_to_win_in_straight_sets_no.suspend}
        var player_1_to_win_in_straight_sets_arr = [player_1_to_win_in_straight_sets_title, player_1_to_win_in_straight_sets_yes_obj, player_1_to_win_in_straight_sets_no_obj]
        base_arr.push(player_1_to_win_in_straight_sets_arr)
        // return {rows:[], suspend:"0"};
    }

    var search_line = "Player 1 To Win a Set"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var player_1_to_win_a_set_odds = data?.odds[_odd_id_current_set_winner];
    if(player_1_to_win_a_set_odds !== undefined){
        var player_1_to_win_a_set_yes = _getParticipantsFieldRaw(player_1_to_win_a_set_odds.participants, "Yes")
        var player_1_to_win_a_set_no = _getParticipantsFieldRaw(player_1_to_win_a_set_odds.participants, "No")
        var player_1_to_win_a_set_title = {title:"Win a set", value: "", suspend:""}
        var player_1_to_win_a_set_yes_obj = {title:"", value:player_1_to_win_a_set_yes.value_eu, suspend:player_1_to_win_a_set_yes.suspend}
        var player_1_to_win_a_set_no_obj = {title:"", value:player_1_to_win_a_set_no.value_eu, suspend:player_1_to_win_a_set_no.suspend}
        var player_1_to_win_a_set_arr = [player_1_to_win_a_set_title, player_1_to_win_a_set_yes_obj, player_1_to_win_a_set_no_obj]
        base_arr.push(player_1_to_win_a_set_arr);

    }

    var search_line = "Player 1 To_Win from Behind (Sets)"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var player_1_to_win_from_behind_odds = data?.odds[_odd_id_current_set_winner];
    if(player_1_to_win_from_behind_odds !== undefined){
        var player_1_to_win_from_behind_yes = _getParticipantsFieldRaw(player_1_to_win_from_behind_odds.participants, "Yes")
        var player_1_to_win_from_behind_no = _getParticipantsFieldRaw(player_1_to_win_from_behind_odds.participants, "No")
        var player_1_to_win_from_behind_title = {title:"Win from Behind(Sets)", value: "", suspend:""}
        var player_1_to_win_from_behind_yes_obj = {title:"", value:player_1_to_win_from_behind_yes.value_eu, suspend:player_1_to_win_from_behind_yes.suspend}
        var player_1_to_win_from_behind_no_obj = {title:"", value:player_1_to_win_from_behind_no.value_eu, suspend:player_1_to_win_from_behind_no.suspend}
        var player_1_to_win_from_behind_arr = [player_1_to_win_from_behind_title, player_1_to_win_from_behind_yes_obj, player_1_to_win_from_behind_no_obj]
        base_arr.push(player_1_to_win_from_behind_arr)
    
        // return {rows:[], suspend:"0"};
    }

    if(base_arr.length > 1){
        var suspend_value = areAllSuspended(base_arr);
        return {rows:base_arr, suspend:suspend_value};
    }
    return {rows:[], suspend:"0"};

}




export const player2To = (data:any) =>{
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
        
        // to find the next set 
        set_number += 1;
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
    
    

    var search_line = "Player 2 To Win in Straight Sets"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var player_1_to_win_in_straight_sets_odds = data?.odds[_odd_id_current_set_winner];
    if(player_1_to_win_in_straight_sets_odds !== undefined){
        var player_1_to_win_in_straight_sets_yes = _getParticipantsFieldRaw(player_1_to_win_in_straight_sets_odds.participants, "Yes")
        var player_1_to_win_in_straight_sets_no = _getParticipantsFieldRaw(player_1_to_win_in_straight_sets_odds.participants, "No")


        var player_1_to_win_in_straight_sets_title = {title:"Win in Straight Sets", value: "", suspend:""}
        var player_1_to_win_in_straight_sets_yes_obj = {title:"", value:player_1_to_win_in_straight_sets_yes.value_eu, suspend:player_1_to_win_in_straight_sets_yes.suspend}
        var player_1_to_win_in_straight_sets_no_obj = {title:"", value:player_1_to_win_in_straight_sets_no.value_eu, suspend:player_1_to_win_in_straight_sets_no.suspend}
        var player_1_to_win_in_straight_sets_arr = [player_1_to_win_in_straight_sets_title, player_1_to_win_in_straight_sets_yes_obj, player_1_to_win_in_straight_sets_no_obj]
        base_arr.push(player_1_to_win_in_straight_sets_arr)
        // return {rows:[], suspend:"0"};
    }

    var search_line = "Player 2 To Win a Set"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var player_1_to_win_a_set_odds = data?.odds[_odd_id_current_set_winner];
    if(player_1_to_win_a_set_odds !== undefined){
        var player_1_to_win_a_set_yes = _getParticipantsFieldRaw(player_1_to_win_a_set_odds.participants, "Yes")
        var player_1_to_win_a_set_no = _getParticipantsFieldRaw(player_1_to_win_a_set_odds.participants, "No")
        var player_1_to_win_a_set_title = {title:"Win a set", value: "", suspend:""}
        var player_1_to_win_a_set_yes_obj = {title:"", value:player_1_to_win_a_set_yes.value_eu, suspend:player_1_to_win_a_set_yes.suspend}
        var player_1_to_win_a_set_no_obj = {title:"", value:player_1_to_win_a_set_no.value_eu, suspend:player_1_to_win_a_set_no.suspend}
        var player_1_to_win_a_set_arr = [player_1_to_win_a_set_title, player_1_to_win_a_set_yes_obj, player_1_to_win_a_set_no_obj]
        base_arr.push(player_1_to_win_a_set_arr);

    }

    var search_line = "Player 2 To_Win from Behind (Sets)"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var player_1_to_win_from_behind_odds = data?.odds[_odd_id_current_set_winner];
    if(player_1_to_win_from_behind_odds !== undefined){
        var player_1_to_win_from_behind_yes = _getParticipantsFieldRaw(player_1_to_win_from_behind_odds.participants, "Yes")
        var player_1_to_win_from_behind_no = _getParticipantsFieldRaw(player_1_to_win_from_behind_odds.participants, "No")
        var player_1_to_win_from_behind_title = {title:"Win from Behind(Sets)", value: "", suspend:""}
        var player_1_to_win_from_behind_yes_obj = {title:"", value:player_1_to_win_from_behind_yes.value_eu, suspend:player_1_to_win_from_behind_yes.suspend}
        var player_1_to_win_from_behind_no_obj = {title:"", value:player_1_to_win_from_behind_no.value_eu, suspend:player_1_to_win_from_behind_no.suspend}
        var player_1_to_win_from_behind_arr = [player_1_to_win_from_behind_title, player_1_to_win_from_behind_yes_obj, player_1_to_win_from_behind_no_obj]
        base_arr.push(player_1_to_win_from_behind_arr)
    
        // return {rows:[], suspend:"0"};
    }

    if(base_arr.length > 1){
        var suspend_value = areAllSuspended(base_arr);
        return {rows:base_arr, suspend:suspend_value};
    }
    return {rows:[], suspend:"0"};

}


export const nextSetLeadAfter= (data:any) =>{
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
        set_number+=1
        
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
    
    

    var search_line = "Lead after ("+ current_period_str+" Set)"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    var grouped = _groupParticipantsByHandicapAndName(participants) as any;
    for(var handicap in grouped){
        var arr = [] as any;
        var title = handicap;
        var obj_1 = grouped[handicap][0];
        var obj_2 = grouped[handicap][1];
        var obj_x = grouped[handicap][2];
        var _title_obj = {title:title, value:"", suspend:""};
        var _1_obj = {title:"", value: obj_1.value_eu, suspend:obj_1.suspend};
        var _2_obj = {title:"", value: obj_2.value_eu, suspend:obj_2.suspend};
        var _x_obj = {title:"", value: obj_2.value_eu, suspend:obj_x.suspend};
        arr = [_title_obj, _1_obj, _2_obj, _x_obj];
        base_arr.push(arr);
    }
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};

}


export const nextSetRaceTo= (data:any) =>{
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
        set_number+=1
        
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
    
    

    var search_line = "Race to Games ("+ current_period_str+" Set)"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var arr = [] as any;
    var participants = odds.participants;
    var grouped = _groupParticipantsByHandicapAndName(participants) as any;
    for(var handicap in grouped){
        var arr = [] as any;
        var title = handicap;
        var obj_1 = grouped[handicap][0];
        var obj_2 = grouped[handicap][1];
        var _title_obj = {title:title, value:"", suspend:""};
        var _1_obj = {title:"", value: obj_1.value_eu, suspend:obj_1.suspend};
        var _2_obj = {title:"", value: obj_2.value_eu, suspend:obj_2.suspend};
        arr = [_title_obj, _1_obj, _2_obj];
        base_arr.push(arr);
    }
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};

}

export const currentSetLeadAfter= (data:any) =>{
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
    
    

    var search_line = "Lead after ("+ current_period_str+" Set)"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;
    var grouped = _groupParticipantsByHandicapAndName(participants) as any;
    for(var handicap in grouped){
        var arr = [] as any;
        var title = handicap;
        var obj_1 = grouped[handicap][0];
        var obj_2 = grouped[handicap][1];
        var obj_x = grouped[handicap][2];
        var _title_obj = {title:title, value:"", suspend:""};
        var _1_obj = {title:"", value: obj_1.value_eu, suspend:obj_1.suspend};
        var _2_obj = {title:"", value: obj_2.value_eu, suspend:obj_2.suspend};
        var _x_obj = {title:"", value: obj_x.value_eu, suspend:obj_x.suspend};
        arr = [_title_obj, _1_obj, _2_obj, _x_obj];
        base_arr.push(arr);
    }
    console.log('LEAD AFTER', base_arr);
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};

}


export const currentSetLeadAfter2= (data:any) =>{
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
    
    

    
    var search_line = current_period + " Lead after"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var participants = odds.participants;

    const dataArray = Object.values(participants);

    // Assuming data length is a multiple of 3
    const groups = [] as any;
    for (let i = 0; i < dataArray.length; i += 3) {
        groups.push({
            "Home": dataArray[i],
            "Away": dataArray[i + 1],
            "Tie": dataArray[i + 2]
        });
    }

    var starting_value = 6;
    for(var group of groups){

        var arr = [] as any;
        var title_obj = {title:starting_value.toString(),  value:"", suspend:"1"}
        var home_obj = {title:"", value:group["Home"].value_eu, suspend:group["Home"].suspend}
        var away_obj = {title:"", value:group["Away"].value_eu, suspend:group["Away"].suspend}
        var tie_obj = {title:"", value:group["Tie"].value_eu, suspend:group["Tie"].suspend}
        arr = [title_obj, home_obj, away_obj, tie_obj];
        base_arr.push(arr);
        starting_value -= 2;

    }

    base_arr = base_arr.reverse()
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};

}



export const currentSetRaceTo= (data:any) =>{
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
    
    

    var search_line = "Race to Games ("+ current_period_str+" Set)"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var arr = [] as any;
    var participants = odds.participants;
    var grouped = _groupParticipantsByHandicapAndName(participants) as any;
    for(var handicap in grouped){
        var arr = [] as any;
        var title = handicap;
        var obj_1 = grouped[handicap][0];
        var obj_2 = grouped[handicap][1];
        var _title_obj = {title:title, value:"", suspend:""};
        var _1_obj = {title:"", value: obj_1.value_eu, suspend:obj_1.suspend};
        var _2_obj = {title:"", value: obj_2.value_eu, suspend:obj_2.suspend};
        arr = [_title_obj, _1_obj, _2_obj];
        base_arr.push(arr);
    }
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};

}


export const matchHandicap= (data:any) =>{
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
    
    

    var search_line = "Match Handicap"
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var arr = [] as any;
    var participants = odds.participants;
    var home_participant = _getParticipantsFieldRaw(participants, "Home")
    var away_participant = _getParticipantsFieldRaw(participants, "Away")
    var home_obj = {title: data?.team_info?.home?.name + " " + home_participant.handicap, value:home_participant.value_eu, suspend:home_participant.suspend}
    var away_obj = {title: data?.team_info?.away?.name + " " + away_participant.handicap, value:away_participant.value_eu, suspend:away_participant.suspend}
    var arr = [] as any;
    arr = [home_obj, away_obj]
    base_arr.push(arr)
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};

}


export const nextSetWinner = (data:any) =>{
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
        set_number+=1;
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
    
    

    var search_line = current_period + " Winner"
    console.log('esaa', search_line)
    var _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }

    var arr = [] as any;
    var participants = odds.participants;
    var home_participant = _getParticipantsFieldRaw(participants, "Home")
    var away_participant = _getParticipantsFieldRaw(participants, "Away")
    var home_obj = {title:data?.team_info?.home?.name, value: home_participant.value_eu, suspend:home_participant.suspend}
    var away_obj = {title:data?.team_info?.away?.name, value: away_participant.value_eu, suspend:away_participant.suspend}

    arr = [home_obj, away_obj]
    base_arr.push(arr)
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};

}


export const doubleResult = (data:any) =>{
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
        
        // to find the next set 
        set_number += 1;
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
    
    

    var search_line = "Double Result"
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    
    var arr1 = [] as any;
    var arr2 = [] as any;
    var participants = odds.participants;
    var player_1_win_win = _getParticipantsFieldRaw(participants, "1/1");
    var player_1_win_lose = _getParticipantsFieldRaw(participants, "1/2");
    var player_2_win_win = _getParticipantsFieldRaw(participants, "2/2");
    var player_2_win_lose = _getParticipantsFieldRaw(participants, "2/1");
    if(player_1_win_win !== null && player_1_win_lose !== null && player_2_win_win !== null && player_2_win_lose !== null){
        var player_1_win_win_obj = {title: data?.team_info?.home?.name + " to win " + current_period_str + " and WIN match", value: player_1_win_win.value_eu, suspend: player_1_win_win.suspend};
        var player_1_win_lose_obj = {title: data?.team_info?.home?.name + " to win " + current_period_str + " and LOSE match", value: player_1_win_lose.value_eu, suspend: player_1_win_lose.suspend};

        var player_2_win_win_obj = {title: data?.team_info?.away?.name + " to win " + current_period_str + " and WIN match", value: player_2_win_win.value_eu, suspend: player_2_win_win.suspend};
        var player_2_win_lose_obj = {title: data?.team_info?.away?.name + " to win " + current_period_str + " and LOSE match", value: player_2_win_lose.value_eu, suspend: player_2_win_lose.suspend};

        arr1 = [player_1_win_win_obj, player_1_win_lose_obj]
        arr2 = [player_2_win_win_obj, player_2_win_lose_obj]
        
        base_arr.push(arr1);
        base_arr.push(arr2);

    }


    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}


export const matchResultAndTotalGames = (data:any) =>{
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
        
        // to find the next set 
        set_number += 1;
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
    
    

    var search_line = "Match Result and Total Games"
    const _odd_id_current_set_winner = findIdByName(data, search_line);
    var odds = data?.odds[_odd_id_current_set_winner];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    
    var arr1 = [] as any;
    var arr2 = [] as any;
    var participants = odds.participants;

    var player_1_over_participant = _getParticipantsFieldRawWithoutSuspend(participants, "1/o");
    var player_1_under_participant = _getParticipantsFieldRawWithoutSuspend(participants, "1/u");

    if(player_1_over_participant == null || player_1_under_participant == null){
        return {rows:[], suspend:"0"};
    }

    var player_1_row_title = {title:data?.team_info?.home.name, value:"", suspend:player_1_over_participant.suspend}
    var player_1_over_participant_obj = {title:player_1_over_participant.handicap, value: player_1_over_participant.value_eu, suspend: player_1_over_participant.suspend};
    var player_1_under_participant_obj = {title:player_1_under_participant.handicap, value: player_1_over_participant.value_eu, suspend: player_1_under_participant.suspend};

    var player_2_over_participant = _getParticipantsFieldRawWithoutSuspend(participants, "2/o");
    var player_2_under_participant = _getParticipantsFieldRawWithoutSuspend(participants, "2/u");
    if(player_2_over_participant == null || player_2_under_participant == null){
        return {rows:[], suspend:"0"};
    }

    var player_2_row_title = {title:data?.team_info?.away.name, value:"", suspend:player_2_over_participant.suspend}
    var player_2_over_participant_obj = {title:player_2_over_participant.handicap, value: player_2_over_participant.value_eu, suspend: player_2_over_participant.suspend};
    var player_2_under_participant_obj = {title:player_2_under_participant.handicap, value: player_2_over_participant.value_eu, suspend: player_2_under_participant.suspend};



    arr1 = [player_1_row_title, player_1_over_participant_obj, player_1_under_participant_obj]

    arr2 = [player_2_row_title, player_2_over_participant_obj, player_2_under_participant_obj]
    base_arr.push(arr1)
    base_arr.push(arr2)
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}

export const setBetting2 = (data:any) =>{
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    var search_line = "Set Betting"
    var setBettingIDX = findIdByName(data, search_line);
    var setBettingOdds = data?.odds[setBettingIDX];
    if(setBettingOdds === undefined){
        return {rows:[], suspend:"0"};
    }


    var participants = setBettingOdds.participants;
    var groups = groupSymmetrically(participants);

    for(var group_id in groups){
        var arr = [] as any;
        const group_obj = groups[group_id];
        var home_group = group_obj[0];
        var away_group = group_obj[1];
        var title_obj = {title:home_group.name.replace(":", "-"), value: "", suspend:group_obj[0].suspend};
        var home_obj = {title:"", value: home_group.value_eu, suspend:home_group.suspend};
        var away_obj = {title:"", value: away_group.value_eu, suspend:away_group.suspend};
        arr = [title_obj, home_obj, away_obj];
        base_arr.push(arr);

        
    }
    var suspend_value = areAllSuspended(base_arr);
    return {rows:base_arr, suspend:suspend_value};
}
