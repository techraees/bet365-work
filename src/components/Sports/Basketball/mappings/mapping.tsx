'use client';
import { apiBaseUrl } from "next-auth/client/_utils";
import React from "react";
import { _groupSetBetting } from "../../Tennis/Details/mappings/mapping";


export const nextQuarter = {
    "1st Quarter": "2nd Quarter",
    "2nd Quarter": "3rd Quarter",
    "3rd Quarter": "4th Quarter"
}
export const getHalfTitle = (data:any, prev_title:string) =>{
    var current_period = data?.info?.period;
    var current_period_int = parseInt(current_period.charAt(0));
    var half_int = 0;
    var half_string = "";
    if(current_period_int<=2){
        half_int = 1;
    }else{
        half_int = 2;
    }

    if(half_int == 1){
        half_string = "1st Half"
    }
    if(half_int == 2){
        half_string = "2nd Half"
    }
    var new_string = prev_title.replace("X Half", half_string);
    return new_string;

}

export const getHomeTeam = (data:any, prev_title:string) =>{
    var home_team = data?.team_info?.home?.name;
    var new_title = prev_title.replace("Home Team", home_team);
    return new_title;
}

export const getAwayTeam = (data:any, prev_title:string) =>{
    var home_team = data?.team_info?.away?.name;
    var new_title = prev_title.replace("Away Team", home_team);
    return new_title;
}

export const getQuarterTitle = (data:any, prev_title:string) =>{
    var current_quarter = data?.info?.period;
    var new_title = prev_title.replace("X Quarter", current_quarter);
    return new_title;
}

export const getNextQuarterTitle = (data:any, prev_title:string) =>{
    var current_quarter = data?.info?.period as string;
    var next_quarter = nextQuarter[current_quarter];
    var new_title = prev_title.replace("X Quarter", next_quarter);
    return new_title;
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

const _getParticipantsFieldRaw = (participants:any, line:string) => {
    for(var participant_id in participants){
        const participant_obj = participants[participant_id];
        if(participant_obj.name === line){
            return participant_obj;
        }
    }
    return null;

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

function groupParticipantsByHandicapAbsAndName(participants: any) {
    const groupedParticipants = {} as any;

    for (const id in participants) {
        const participant = participants[id];
        var { handicap, name } = participant;
        handicap = Math.abs(parseFloat(handicap))


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

function groupWithSmallestDeviation(participants: any) {
    // 1. Group by handicap
    const groupedByHandicap = {} as any;
    for (const key in participants) {
        const participant = participants[key];
        const handicap = parseFloat(participant.handicap);
        if (!groupedByHandicap[handicap]) {
            groupedByHandicap[handicap] = [];
        }
        groupedByHandicap[handicap].push(participant);
    }

    let minDeviation = 1000000000;
    let groupWithMinDeviation = null;

    for (const handicap in groupedByHandicap) {
        var group = groupedByHandicap[handicap];
        var diff = 0;
        group.forEach((element:any) => {
            diff = diff - parseFloat(element.value_eu)
            
        });
        diff = Math.abs(diff);
        
        if(diff < minDeviation){
            minDeviation = diff;
            groupWithMinDeviation = group;
        }
    }

    // 4. Return the group with the smallest deviation
    return groupWithMinDeviation;
}



export const gameLines = (data: any) => {
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var odd_id = findIdByName(data, "Game Lines Spread");
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var home = _getParticipantsFieldRaw(participants, "Home");
            var away = _getParticipantsFieldRaw(participants, "Away");
            
            const title_obj = {title:"Spread", value: '', suspend: odds.suspend};
            const home_obj = {title:home.handicap, value: home.value_eu, suspend:home.suspend};
            const away_obj = {title:away.handicap, value: away.value_eu, suspend:away.suspend};

            const line_spread_arr = [title_obj, home_obj, away_obj];
            base_arr.push(line_spread_arr)
        }
    }

    {
        var odd_id = findIdByName(data, "Game Lines Total");
        var odds = data?.odds?.[odd_id];

        if(odds){
            participants = odds.participants;
            var group_with_smallest_deviation = groupWithSmallestDeviation(participants);
            var over = _getParticipantsFieldRaw(group_with_smallest_deviation, "Over");
            var under = _getParticipantsFieldRaw(group_with_smallest_deviation, "Under");
            
            if(over && under){
                const title_obj = {title:"Total", value: '', suspend: odds.suspend};
                const over_obj = {title:'O ' + over.handicap, value: over.value_eu, suspend:over.suspend};
                const under_obj = {title:'U ' + under.handicap, value: under.value_eu, suspend:under.suspend};
                

                const total_spread_arr = [title_obj, over_obj, under_obj];
                base_arr.push(total_spread_arr)

            }
        }
    }

    {
        var odd_id = findIdByName(data, "Game Lines Money Line");
        var odds = data?.odds?.[odd_id];

        if(odds){
            participants = odds.participants;
            var home = _getParticipantsFieldRaw(participants, "Home");
            var away = _getParticipantsFieldRaw(participants, "Away");
            if(home && away){
                const title_obj = {title:"Money Line", value: '', suspend: odds.suspend};
                const home_obj = {title:home.handicap, value: home.value_eu, suspend:home.suspend};
                const away_obj = {title:away.handicap, value: away.value_eu, suspend:away.suspend};
                
                const money_line_arr = [title_obj, home_obj, away_obj];
                base_arr.push(money_line_arr)
            }
        }
    }
    
    var suspend_value = base_arr_is_suspended(base_arr);
    return {rows:base_arr, suspend:suspend_value}
}


export const pointBetting = (data: any) => {
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }
    // [{handicap, home, away}]
    const base_arr = [] as any;
    const odd_id = findIdByName(data, "Point Betting")
    const odds = data?.odds?.[odd_id];
    if(odds === undefined){
        return {rows:[], suspend:"0"};
    }
    const participants = odds.participants;
    var group = groupParticipantsByHandicapAndName(participants)
    for(var group_handicap in group){
        var arr = [] as any;
        const group_obj = group[group_handicap];
        if(group_obj["Home"] === undefined || group_obj["Away"] === undefined){
            continue;
        }
        var _home = group_obj["Home"][0]
        var _away = group_obj["Away"][0]
        var title_obj = {title:group_handicap, value: null, suspend: "0"}
        var home_obj = {title:"", value:_home.value_eu, suspend:_home.suspend}
        var away_obj = {title:"", value:_away.value_eu, suspend:_away.suspend}
        arr = [title_obj, home_obj, away_obj]
        base_arr.push(arr);
    }
    return {rows:base_arr, suspend:odds.suspend};
    
}

export const currentPoints = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let total = ""
    if (data?.team_info?.home?.score && data?.team_info?.away?.score) {
        const homepoint = data?.team_info?.home?.score
        const awaypoint = data?.team_info?.away?.score
        total = (Number(homepoint) + Number(awaypoint)).toString()
    }
    return total;
}

export const quarterLines2Way =(data: any)=>{
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [];
    if (data?.odds?.[180079]?.participants) {
        const spread = Object.entries(data?.odds?.[180079]?.participants)
        if (spread.length > 0) {
            const arr = [{ title: "Spread", value: '', suspend: data.odds?.[180079]?.suspend }]
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[180080]?.participants) {
        const gltotal = Object.entries(data?.odds?.[180080]?.participants)
        if (gltotal.length > 0) {
            const arr = [{ title: "Total", value: '', suspend: data.odds?.[180080]?.suspend }]

            gltotal.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                if (item[1]?.name === "Over") {
                    arr.push({ title: `O ${title}`, value: value, suspend: suspend })
                } else {
                    arr.push({ title: `U ${title}`, value: value, suspend: suspend })
                }

            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[180077]?.participants) {
        const mltotal = Object.entries(data?.odds?.[180077]?.participants)
        if (mltotal.length > 0) {
            const arr = [{ title: "Money Line", value: '', suspend: data.odds?.[180077]?.suspend }]
            mltotal.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}

export const oddEven =(data: any)=>{
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [];
    if (data?.odds?.[113]?.participants) {
        const oddeven1 = Object.entries(data?.odds?.[113]?.participants)
        if (oddeven1.length > 0) {
            const arr = [{ title: "Match", value: '', suspend: data.odds?.[113]?.suspend }]
            oddeven1.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[449]?.participants) {
        const oddeven2 = Object.entries(data?.odds?.[449]?.participants)
        if (oddeven2.length > 0) {
            const arr = [{ title: "1st Half", value: '', suspend: data.odds?.[449]?.suspend }]
            oddeven2.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}


export const half =(data: any)=>{
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [];
    if (data?.odds?.[180061]?.participants) {
        const spread = Object.entries(data?.odds?.[180061]?.participants)
        if (spread.length > 0) {
            const arr = [{ title: "Spread", value: '', suspend: data.odds?.[180061]?.suspend }]
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[180062]?.participants) {
        const gltotal = Object.entries(data?.odds?.[180062]?.participants)
        if (gltotal.length > 0) {
            const arr = [{ title: "Total", value: '', suspend: data.odds?.[180062]?.suspend }]

            gltotal.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                if (item[1]?.name === "Over") {
                    arr.push({ title: `O ${title}`, value: value, suspend: suspend })
                } else {
                    arr.push({ title: `U ${title}`, value: value, suspend: suspend })
                }

            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[180060]?.participants) {
        const mltotal = Object.entries(data?.odds?.[180060]?.participants)
        if (mltotal.length > 0) {
            const arr = [{ title: "Money Line", value: '', suspend: data.odds?.[180060]?.suspend }]
            mltotal.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}


export const resultTotalGoals =(data: any)=>{
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    if (data?.odds?.[5300563]?.participants) {
        const spread = Object.entries(data?.odds?.[5300563]?.participants)
        if (spread.length > 0) {
            const arr1 = [{ title: "Home", value: '', suspend: data.odds?.[5300563]?.suspend }]
            const arr2 = [{ title: "Away", value: '', suspend: data.odds?.[5300563]?.suspend }]
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                if(item[1]?.name === "Home/o" || item[1]?.name === "Home/u" ){
                    arr1.push({ title: title, value: value, suspend: suspend })
                }
                if(item[1]?.name === "Away/o" || item[1]?.name === "Away/u" ){
                    arr2.push({ title: title, value: value, suspend: suspend })
                }
            })
            tosend.push(arr1)
            tosend.push(arr2)
        }
    }
    
    return tosend;
}

export const getCurrentPoints = (data:any) => {

    var home_score = parseInt(data?.team_info?.home?.score)
    var away_score = parseInt(data?.team_info?.away?.score)
    return (home_score + away_score).toString();
}

export const quarterLines = (data: any) => {
    var current_quarter = data?.info?.period;
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = current_quarter + " Lines Spread (AH)"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var home = _getParticipantsFieldRaw(participants, "Home");
            var away = _getParticipantsFieldRaw(participants, "Away");
            
            if(home && away){

                const title_obj = {title:"Spread", value: '', suspend: odds.suspend};
                const home_obj = {title:home.handicap, value: home.value_eu, suspend:home.suspend};
                const away_obj = {title:away.handicap, value: away.value_eu, suspend:away.suspend};

                const line_spread_arr = [title_obj, home_obj, away_obj];
                base_arr.push(line_spread_arr)
            }

        }
    }

    {
        var search_string = current_quarter + " Lines Total"
        odd_id = findIdByName(data, search_string);
        odds = data?.odds?.[odd_id];

        if(odds){
            participants = odds.participants;
            var group_with_smallest_deviation = groupWithSmallestDeviation(participants);
            var over = _getParticipantsFieldRaw(group_with_smallest_deviation, "Over");
            var under = _getParticipantsFieldRaw(group_with_smallest_deviation, "Under");
            if(over && under){

                const title_obj = {title:"Total", value: '', suspend: odds.suspend};
                const over_obj = {title:'O ' + over.handicap, value: over.value_eu, suspend:over.suspend};
                const under_obj = {title:'U ' + under.handicap, value: under.value_eu, suspend:under.suspend};
                

                const total_spread_arr = [title_obj, over_obj, under_obj];
                base_arr.push(total_spread_arr)
            }
            

        }
    }

    {
        var search_string = current_quarter + " Lines Money Line"
        odd_id = findIdByName(data, search_string);
        odds = data?.odds?.[odd_id];
        if(odds){
            participants = odds.participants;
            var home = _getParticipantsFieldRaw(participants, "Home");
            var away = _getParticipantsFieldRaw(participants, "Away");
            if(home && away){

                const title_obj = {title:"Money Line", value: '', suspend: odds.suspend};
                const home_obj = {title:home.handicap, value: home.value_eu, suspend:home.suspend};
                const away_obj = {title:away.handicap, value: away.value_eu, suspend:away.suspend};
                

                const money_line_arr = [title_obj, home_obj, away_obj];
                base_arr.push(money_line_arr)
            }
            
        }
    }
    
    var suspend_value = base_arr_is_suspended(base_arr);
    return {rows:base_arr, suspend:suspend_value}
}


export const nextQuarterLines = (data: any) => {
    var current_quarter = data?.info?.period;
    var next_quarter = nextQuarter[current_quarter];
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = next_quarter + " Lines Spread (AH)"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var home = _getParticipantsFieldRaw(participants, "Home");
            var away = _getParticipantsFieldRaw(participants, "Away");
            
            if(home && away){

                const title_obj = {title:"Spread", value: '', suspend: odds.suspend};
                const home_obj = {title:home.handicap, value: home.value_eu, suspend:home.suspend};
                const away_obj = {title:away.handicap, value: away.value_eu, suspend:away.suspend};

                const line_spread_arr = [title_obj, home_obj, away_obj];
                base_arr.push(line_spread_arr)
            }

        }
    }

    {
        var search_string = next_quarter + " Lines Total"
        odd_id = findIdByName(data, search_string);
        odds = data?.odds?.[odd_id];

        if(odds){
            participants = odds.participants;
            var group_with_smallest_deviation = groupWithSmallestDeviation(participants);
            var over = _getParticipantsFieldRaw(group_with_smallest_deviation, "Over");
            var under = _getParticipantsFieldRaw(group_with_smallest_deviation, "Under");
            if(over && under){

                const title_obj = {title:"Total", value: '', suspend: odds.suspend};
                const over_obj = {title:'O ' + over.handicap, value: over.value_eu, suspend:over.suspend};
                const under_obj = {title:'U ' + under.handicap, value: under.value_eu, suspend:under.suspend};
                

                const total_spread_arr = [title_obj, over_obj, under_obj];
                base_arr.push(total_spread_arr)
            }
            

        }
    }

    {
        var search_string = next_quarter + " Lines Money Line"
        odd_id = findIdByName(data, search_string);
        odds = data?.odds?.[odd_id];
        if(odds){
            participants = odds.participants;
            var home = _getParticipantsFieldRaw(participants, "Home");
            var away = _getParticipantsFieldRaw(participants, "Away");
            if(home && away){

                const title_obj = {title:"Money Line", value: '', suspend: odds.suspend};
                const home_obj = {title:home.handicap, value: home.value_eu, suspend:home.suspend};
                const away_obj = {title:away.handicap, value: away.value_eu, suspend:away.suspend};
                

                const money_line_arr = [title_obj, home_obj, away_obj];
                base_arr.push(money_line_arr)
            }
            
        }
    }
    
    var suspend_value = base_arr_is_suspended(base_arr);
    return {rows:base_arr, suspend:suspend_value}
}


export const currentQuarterRaceTo = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = current_quarter + " Race to"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants)

            for(var handicap in group){
                var arr = [] as any;
                var group_obj = group[handicap]
                if(group_obj["Home"] && group_obj["Away"] && group_obj["Neither"]){
                    var home_obj = group_obj["Home"][0]
                    var away_obj = group_obj["Away"][0]

                    var neither_obj = group_obj["Neither"][0]

                    var _title = {title:handicap, value:null, suspend:"0"};
                    var _home = {title: "", value:home_obj.value_eu, suspend: home_obj.suspend}
                    var _away = {title: "", value:away_obj.value_eu, suspend: away_obj.suspend}
                    var _neither = {title: "", value:neither_obj.value_eu, suspend: neither_obj.suspend}
                    arr = [_title, _home, _away, _neither]
                    base_arr.push(arr)
                    suspend_value = odds.suspend;

                }
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}

export const nextQuarterRaceTo = (data: any) => {
    var current_quarter = data?.info?.period;
    var next_quarter = nextQuarter[current_quarter];
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = next_quarter + " Race to"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants)

            for(var handicap in group){
                var arr = [] as any;
                var group_obj = group[handicap]
                if(group_obj["Home"] && group_obj["Away"]){
                    var home_obj = group_obj["Home"][0]
                    var away_obj = group_obj["Away"][0]

                    var neither_obj = group_obj["Neither"][0]

                    var _title = {title:handicap, value:null, suspend:"0"};
                    var _home = {title: "", value:home_obj.value_eu, suspend: home_obj.suspend}
                    var _away = {title: "", value:away_obj.value_eu, suspend: away_obj.suspend}
                    var _neither = {title: "", value:neither_obj.value_eu, suspend: neither_obj.suspend}
                    arr = [_title, _home, _away, _neither]
                    base_arr.push(arr)
                    suspend_value = odds.suspend;

                }
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}




export const currentHalfRaceTo = (data: any) => {
    var current_quarter = data?.info?.period;
    var current_period_int = parseInt(current_quarter);
    var half_int = 0;
    var half_string = "";
    if(current_period_int<=2){
        half_int = 1;
    }else{
        half_int = 2;
    }

    if(half_int == 1){
        half_string = "1st Half"
    }
    if(half_int == 2){
        half_string = "2nd Half"
    }

    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = half_string + " Race to"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants)

            for(var handicap in group){
                var arr = [] as any;
                var group_obj = group[handicap]
                var home_obj = group_obj["Home"][0]
                var away_obj = group_obj["Away"][0]

                var _title = {title:handicap, value:null, suspend:"0"};
                var _home = {title: "", value:home_obj.value_eu, suspend: home_obj.suspend}
                var _away = {title: "", value:away_obj.value_eu, suspend: away_obj.suspend}
                arr = [_title, _home, _away]
                base_arr.push(arr)
                suspend_value = odds.suspend;
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}


export const currentHalfRaceTo3Way = (data: any) => {
    var current_quarter = data?.info?.period;
    var current_period_int = parseInt(current_quarter);
    var half_int = 0;
    var half_string = "";
    if(current_period_int<=2){
        half_int = 1;
    }else{
        half_int = 2;
    }

    if(half_int == 1){
        half_string = "1st Half"
    }
    if(half_int == 2){
        half_string = "2nd Half"
    }

    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = half_string + " Race to"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants)

            for(var handicap in group){
                var arr = [] as any;
                var group_obj = group[handicap]
                if(group_obj["Home"] && group_obj["Away"]){
                    var home_obj = group_obj["Home"][0]
                    var away_obj = group_obj["Away"][0]
                    var neither_obj = group_obj["Neither"][0]

                    if(home_obj && away_obj && neither_obj){

                        var _title = {title:handicap, value:null, suspend:"0"};
                        var _home = {title: "", value:home_obj.value_eu, suspend: home_obj.suspend}
                        var _away = {title: "", value:away_obj.value_eu, suspend: away_obj.suspend}
                        var _neither = {title: "", value:neither_obj.value_eu, suspend: neither_obj.suspend}
                        arr = [_title, _home, _away, _neither]
                        base_arr.push(arr)
                        suspend_value = odds.suspend;
                    }

                }
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}

export const currentQuarterBothTeamsToScore = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = current_quarter + " Both Teams To Score"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants)

            for(var handicap in group){
                var arr = [] as any;
                var group_obj = group[handicap]
                var yes_obj = group_obj["Yes"][0]
                var no_obj = group_obj["No"][0]

                var _title = {title:handicap, value:null, suspend:"0"};
                var _yes = {title: "", value:yes_obj.value_eu, suspend: yes_obj.suspend}
                var _no = {title: "", value:no_obj.value_eu, suspend: no_obj.suspend}
                arr = [_title, _yes, _no]
                base_arr.push(arr)
                suspend_value = odds.suspend;
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}

export const nextQuarterBothTeamsToScore = (data: any) => {
    var current_quarter = data?.info?.period;
    var next_quarter = nextQuarter[current_quarter];
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = next_quarter + " Both Teams To Score"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants)

            for(var handicap in group){
                var arr = [] as any;
                var group_obj = group[handicap]
                var yes_obj = group_obj["Yes"][0]
                var no_obj = group_obj["No"][0]

                var _title = {title:handicap, value:null, suspend:"0"};
                var _yes = {title: "", value:yes_obj.value_eu, suspend: yes_obj.suspend}
                var _no = {title: "", value:no_obj.value_eu, suspend: no_obj.suspend}
                arr = [_title, _yes, _no]
                base_arr.push(arr)
                suspend_value = odds.suspend;
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}

export const halfLines = (data: any) => {
    
    var current_period = data?.info?.period;
    var current_period_int = parseInt(current_period.charAt(0));
    var half_int = 0;
    var half_string = "";
    if(current_period_int<=2){
        half_int = 1;
    }else{
        half_int = 2;
    }

    if(half_int == 1){
        half_string = "1st Half"
    }
    if(half_int == 2){
        half_string = "2nd Half"
    }
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = half_string + " Spread"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var home = _getParticipantsFieldRaw(participants, "Home");
            var away = _getParticipantsFieldRaw(participants, "Away");
            
            const title_obj = {title:"Spread", value: '', suspend: odds.suspend};
            const home_obj = {title:home.handicap, value: home.value_eu, suspend:home.suspend};
            const away_obj = {title:away.handicap, value: away.value_eu, suspend:away.suspend};

            const line_spread_arr = [title_obj, home_obj, away_obj];
            base_arr.push(line_spread_arr)

        }
    }

    {
        var search_string = half_string + " Total"
        odd_id = findIdByName(data, search_string);
        odds = data?.odds?.[odd_id];

        if(odds){
            participants = odds.participants;
            var over = _getParticipantsFieldRaw(participants, "Over");
            var under = _getParticipantsFieldRaw(participants, "Under");
            
            if(over !== null || under !== null){

                const title_obj = {title:"Total", value: '', suspend: odds.suspend};
                var _participants = Object.values(participants)
                console.log('_participanto', _participants);
                const over_obj = {title: 'O ' + _participants[0].handicap, value: _participants[0].value_eu, suspend:_participants[0].suspend};
                const under_obj = {title: 'U ' + _participants[1].handicap, value: _participants[1].value_eu, suspend:_participants[1].suspend};
                

                const total_spread_arr = [title_obj, over_obj, under_obj];
                base_arr.push(total_spread_arr)
            }else{

                if(over && under){

                    const title_obj = {title:"Total", value: '', suspend: odds.suspend};
                    const over_obj = {title:'O ' + over.handicap, value: over.value_eu, suspend:over.suspend};
                    const under_obj = {title:'U ' + under.handicap, value: under.value_eu, suspend:under.suspend};
                    

                    const total_spread_arr = [title_obj, over_obj, under_obj];
                    base_arr.push(total_spread_arr)
                }
            }

        }
    }

    {
        var search_string = half_string + " Money Line"
        odd_id = findIdByName(data, search_string);
        odds = data?.odds?.[odd_id];
        if(odds){
            participants = odds.participants;
            var home = _getParticipantsFieldRaw(participants, "Home");
            var away = _getParticipantsFieldRaw(participants, "Away");
            
            const title_obj = {title:"Money Line", value: '', suspend: odds.suspend};
            const home_obj = {title:home.handicap, value: home.value_eu, suspend:home.suspend};
            const away_obj = {title:away.handicap, value: away.value_eu, suspend:away.suspend};
            

            const money_line_arr = [title_obj, home_obj, away_obj];
            base_arr.push(money_line_arr)
        }
    }
    
    var suspend_value = base_arr_is_suspended(base_arr);
    return {rows:base_arr, suspend:suspend_value}
}


export const currentQuarterHomeTeamToScore = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Home Team Score (" + current_quarter + ")"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                if(group_obj["Yes"] && group_obj["No"]){
                    var _yes_obj = group_obj["Yes"][0]
                    var _no_obj = group_obj["No"][0]
                    var title_obj = {title:handicap, value:"", suspend:"0"}
                    var yes_obj = {title:"", value:_yes_obj.value_eu, suspend:_yes_obj.suspend}
                    var no_obj = {title:"", value:_no_obj.value_eu, suspend:_no_obj.suspend}
                    arr = [title_obj, yes_obj, no_obj]
                    base_arr.push(arr);
                    suspend_value = odds.suspend;

                }
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}


export const nextQuarterHomeTeamToScore = (data: any) => {
    var current_quarter = data?.info?.period;
    var next_quarter = nextQuarter[current_quarter];
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Home Team Score (" + next_quarter + ")"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                var _yes_obj = group_obj["Yes"][0]
                var _no_obj = group_obj["No"][0]
                var title_obj = {title:handicap, value:"", suspend:"0"}
                var yes_obj = {title:"", value:_yes_obj.value_eu, suspend:_yes_obj.suspend}
                var no_obj = {title:"", value:_no_obj.value_eu, suspend:_no_obj.suspend}
                arr = [title_obj, yes_obj, no_obj]
                base_arr.push(arr);
                suspend_value = odds.suspend;
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}

export const currentQuarterAwayTeamToScore = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Away Team Score (" + current_quarter + ")"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                var _yes_obj = group_obj["Yes"][0]
                var _no_obj = group_obj["No"][0]
                var title_obj = {title:handicap, value:"", suspend:"0"}
                var yes_obj = {title:"", value:_yes_obj.value_eu, suspend:_yes_obj.suspend}
                var no_obj = {title:"", value:_no_obj.value_eu, suspend:_no_obj.suspend}
                arr = [title_obj, yes_obj, no_obj]
                base_arr.push(arr);
                suspend_value = odds.suspend;
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}

export const nextQuarterAwayTeamToScore = (data: any) => {
    var current_quarter = data?.info?.period;
    var next_quarter = nextQuarter[current_quarter];
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Away Team Score (" + next_quarter + ")"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                var _yes_obj = group_obj["Yes"][0]
                var _no_obj = group_obj["No"][0]
                var title_obj = {title:handicap, value:"", suspend:"0"}
                var yes_obj = {title:"", value:_yes_obj.value_eu, suspend:_yes_obj.suspend}
                var no_obj = {title:"", value:_no_obj.value_eu, suspend:_no_obj.suspend}
                arr = [title_obj, yes_obj, no_obj]
                base_arr.push(arr);
                suspend_value = odds.suspend;
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}

export const currentQuarterHomeTeamToScore2 = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = current_quarter + " Home To Score" ;
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                var _yes_obj = group_obj["Yes"][0]
                var _no_obj = group_obj["No"][0]
                var title_obj = {title:handicap, value:"", suspend:"0"}
                var yes_obj = {title:"", value:_yes_obj.value_eu, suspend:_yes_obj.suspend}
                var no_obj = {title:"", value:_no_obj.value_eu, suspend:_no_obj.suspend}
                arr = [title_obj, yes_obj, no_obj]
                base_arr.push(arr);
                suspend_value = odds.suspend;
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}


export const nextQuarterHomeTeamToScore2 = (data: any) => {
    var current_quarter = data?.info?.period;
    var next_quarter = nextQuarter[current_quarter];
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = next_quarter + " Home To Score" ;
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                var _yes_obj = group_obj["Yes"][0]
                var _no_obj = group_obj["No"][0]
                var title_obj = {title:handicap, value:"", suspend:"0"}
                var yes_obj = {title:"", value:_yes_obj.value_eu, suspend:_yes_obj.suspend}
                var no_obj = {title:"", value:_no_obj.value_eu, suspend:_no_obj.suspend}
                arr = [title_obj, yes_obj, no_obj]
                base_arr.push(arr);
                suspend_value = odds.suspend;
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}

export const currentQuarterAwayTeamToScore2 = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = current_quarter + " Away To Score" ;
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                if(group_obj['Yes'] === undefined || group_obj["No"] === undefined){
                    console.log("UNDEFINED currentQuarterAwayTeamToScore2", group_obj);
                    continue;
                }
                var _yes_obj = group_obj["Yes"][0]
                var _no_obj = group_obj["No"][0]
                var title_obj = {title:handicap, value:"", suspend:"0"}
                var yes_obj = {title:"", value:_yes_obj.value_eu, suspend:_yes_obj.suspend}
                var no_obj = {title:"", value:_no_obj.value_eu, suspend:_no_obj.suspend}
                arr = [title_obj, yes_obj, no_obj]
                base_arr.push(arr);
                suspend_value = odds.suspend;
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}

export const nextQuarterAwayTeamToScore2 = (data: any) => {
    var current_quarter = data?.info?.period;
    var next_quarter = nextQuarter[current_quarter];
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = next_quarter + " Away To Score" ;
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                if(group_obj['Yes'] === undefined || group_obj["No"] === undefined){
                    console.log("UNDEFINED currentQuarterAwayTeamToScore2", group_obj);
                    continue;
                }
                var _yes_obj = group_obj["Yes"][0]
                var _no_obj = group_obj["No"][0]
                var title_obj = {title:handicap, value:"", suspend:"0"}
                var yes_obj = {title:"", value:_yes_obj.value_eu, suspend:_yes_obj.suspend}
                var no_obj = {title:"", value:_no_obj.value_eu, suspend:_no_obj.suspend}
                arr = [title_obj, yes_obj, no_obj]
                base_arr.push(arr);
                suspend_value = odds.suspend;
            }
        }
    }

    return {rows:base_arr, suspend:suspend_value}
}



export const currentQuarterMarginOfVictory = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = current_quarter + " Margin of Victory" ;
        console.log('ss_string', search_string)
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var arr = [] as any;
            var participants = odds.participants;
            for(var participant_id in participants){
                var participant_obj = participants[participant_id];
                var obj = {title: participant_obj.name, value: participant_obj.value_eu, suspend:participant_obj.suspend};
                arr.push(obj);
            }
            base_arr.push(arr);
            suspend_value = odds.suspend;
        }
    }

    console.log('Current Quarter Margin of Victory', base_arr)
    return {rows:base_arr, suspend:suspend_value}
}


export const nextQuarterMarginOfVictory = (data: any) => {
    var current_quarter = data?.info?.period;
    var next_quarter = nextQuarter[current_quarter];
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = next_quarter + " Margin of Victory" ;
        console.log('ss_string', search_string)
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var arr = [] as any;
            var participants = odds.participants;
            for(var participant_id in participants){
                var participant_obj = participants[participant_id];
                var obj = {title: participant_obj.name, value: participant_obj.value_eu, suspend:participant_obj.suspend};
                arr.push(obj);
            }
            base_arr.push(arr);
            suspend_value = odds.suspend;
        }
    }

    console.log('Current Quarter Margin of Victory', base_arr)
    return {rows:base_arr, suspend:suspend_value}
}


export const currentQuarterTeamTotals = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    var arr = [] as any;

    {
        var search_string = "Home Team Total ("+ current_quarter + ")"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            var length = Object.keys(group).length;
            if(length > 1){
                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }


                    if(group_obj["Over"][0].is_main === "1" || group_obj["Under"][0].is_main === "1"){
                        var over_obj = group_obj["Over"][0]
                        var under_obj = group_obj["Under"][0]
                        var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                        var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                        arr.push(_over, _under)
                    }
                }
            }
            if(length === 1){
                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }
                    var over_obj = group_obj["Over"][0]
                    var under_obj = group_obj["Under"][0]
                    var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                    var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                    arr.push(_over, _under)
                }

            }
        }
    }

    {
        var search_string = "Away Team Total ("+ current_quarter + ")"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            var length = Object.keys(group).length;
            if(length > 1){

                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }

                    if(group_obj["Over"][0].is_main === "1" || group_obj["Under"][0].is_main === "1"){
                        var over_obj = group_obj["Over"][0]
                        var under_obj = group_obj["Under"][0]
                        var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                        var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                        arr.push(_over, _under)
                    }
                }
            }

            if(length === 1){
                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }

                    var over_obj = group_obj["Over"][0]
                    var under_obj = group_obj["Under"][0]
                    var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                    var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                    arr.push(_over, _under)
                }

            }
        }
    }
    if(arr.length == 4){
        base_arr.push(arr);
    }

    // TODO Suspend value
    console.log('Current Quarter Team Totals', base_arr)
    return {rows:base_arr, suspend:suspend_value}
}


export const nextQuarterTeamTotals = (data: any) => {
    var current_quarter = data?.info?.period;
    var next_quarter = nextQuarter[current_quarter];
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    var arr = [] as any;

    {
        var search_string = "Home Team Total ("+ next_quarter + ")"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            var length = Object.keys(group).length;
            if(length > 1){
                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }


                    if(group_obj["Over"][0].is_main === "1" || group_obj["Under"][0].is_main === "1"){
                        var over_obj = group_obj["Over"][0]
                        var under_obj = group_obj["Under"][0]
                        var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                        var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                        arr.push(_over, _under)
                    }
                }
            }
            if(length === 1){
                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }
                    var over_obj = group_obj["Over"][0]
                    var under_obj = group_obj["Under"][0]
                    var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                    var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                    arr.push(_over, _under)
                }

            }
        }
    }

    {
        var search_string = "Away Team Total ("+ next_quarter + ")"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            var length = Object.keys(group).length;
            if(length > 1){

                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }

                    if(group_obj["Over"][0].is_main === "1" || group_obj["Under"][0].is_main === "1"){
                        var over_obj = group_obj["Over"][0]
                        var under_obj = group_obj["Under"][0]
                        var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                        var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                        arr.push(_over, _under)
                    }
                }
            }

            if(length === 1){
                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }

                    var over_obj = group_obj["Over"][0]
                    var under_obj = group_obj["Under"][0]
                    var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                    var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                    arr.push(_over, _under)
                }

            }
        }
    }
    if(arr.length == 4){
        base_arr.push(arr);
    }

    // TODO Suspend value
    console.log('Current Quarter Team Totals', base_arr)
    return {rows:base_arr, suspend:suspend_value}
}


export const teamTotals = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;
    var arr = [] as any;

    {
        var search_string = "Home Team Total (Including OT)"
        // var search_string = "Home Team Total ("+ current_quarter + ")"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            var length = Object.keys(group).length;
            if(length > 1){

                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }


                    if(group_obj["Over"][0].is_main === "1" || group_obj["Under"][0].is_main === "1"){
                        var over_obj = group_obj["Over"][0]
                        var under_obj = group_obj["Under"][0]
                        var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                        var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                        arr.push(_over, _under)
                    }
                }
            }
            if(length === 1){
                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }


                    var over_obj = group_obj["Over"][0]
                    var under_obj = group_obj["Under"][0]
                    var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                    var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                    arr.push(_over, _under)
                }
                
            }
        }
    }

    {
        // var search_string = "Away Team Total ("+ current_quarter + ")"
        var search_string = "Away Team Total (Including OT)"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            var length = Object.keys(group).length;
            if(length > 1){
                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }


                    if(group_obj["Over"][0].is_main === "1" || group_obj["Under"][0].is_main === "1"){
                        var over_obj = group_obj["Over"][0]
                        var under_obj = group_obj["Under"][0]
                        var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                        var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                        arr.push(_over, _under)
                    }
                }
            }
            if(length === 1){
                for(var handicap in group){
                    var group_obj = group[handicap];
                    if(group_obj["Over"] === undefined || group_obj["Under"] === undefined){
                        return {rows:[], suspend:"0"};
                    }


                    var over_obj = group_obj["Over"][0]
                    var under_obj = group_obj["Under"][0]
                    var _over = {title:"Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend}
                    var _under = {title:"Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend}
                    arr.push(_over, _under)
                }
                
            }
        }
    }
    if(arr.length == 4){
        base_arr.push(arr);
    }

    // TODO Suspend value
    console.log('Current Quarter Team Totals', base_arr)
    return {rows:base_arr, suspend:suspend_value}
}

export const alternativePointSpread = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Asian Handicap"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAbsAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                if(group_obj["Home"] && group_obj["Away"]){

                    var _home_obj = group_obj["Home"][0]
                    var _away_obj = group_obj["Away"][0]
                    var home_obj = {title:_home_obj.handicap, value:_home_obj.value_eu, suspend:_home_obj.suspend}
                    var away_obj = {title:_away_obj.handicap, value:_away_obj.value_eu, suspend:_away_obj.suspend}
                    arr = [home_obj, away_obj]
                    base_arr.push(arr);
                }
            }
        }

    }

    base_arr.sort((a:any, b:any) => {
        // Convert the title (handicap) of the first object of each inner array to a number
        let handicapA = parseFloat(a[0].title);
        let handicapB = parseFloat(b[0].title);

        // Perform the comparison to determine the order
        return handicapA - handicapB;
    });
    return {rows:base_arr, suspend:suspend_value}
}


export const gameLinesTotal = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Game Lines Total"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            var length = Object.keys(group).length
            if(length <= 1){
                return {rows:[], suspend:"0"};

            }
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                if(group_obj["Over"] && group_obj["Under"]){
                    var _over_obj = group_obj["Over"][0]
                    var _under_obj = group_obj["Under"][0]
                    var title_obj = {title:handicap, value:null, suspend:"0"}
                    var over_obj = {title:"", value:_over_obj.value_eu, suspend:_over_obj.suspend}
                    var under_obj = {title:"", value:_under_obj.value_eu, suspend:_under_obj.suspend}
                    arr = [title_obj, over_obj, under_obj]
                    base_arr.push(arr);

                }
            }
        }
    }

    base_arr.sort((a:any, b:any) => {
        // Convert the title (handicap) of the first object of each inner array to a number
        let handicapA = parseFloat(a[0].title);
        let handicapB = parseFloat(b[0].title);

        // Perform the comparison to determine the order
        return handicapA - handicapB;
    });
    return {rows:base_arr, suspend:suspend_value}
}


export const homeTeamTotal = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Home Team Total (Including OT)"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            var length = Object.keys(group).length
            if(length <= 1){
                return {rows:[], suspend:"0"};

            }
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                if(group_obj['Over'] && group_obj['Under']){
                    var _over_obj = group_obj["Over"][0]
                    var _under_obj = group_obj["Under"][0]
                    var title_obj = {title:handicap, value:null, suspend:"0"}
                    var over_obj = {title:"", value:_over_obj.value_eu, suspend:_over_obj.suspend}
                    var under_obj = {title:"", value:_under_obj.value_eu, suspend:_under_obj.suspend}
                    arr = [title_obj, over_obj, under_obj]
                    base_arr.push(arr);
                }
            }
        }
    }

    base_arr.sort((a:any, b:any) => {
        // Convert the title (handicap) of the first object of each inner array to a number
        let handicapA = parseFloat(a[0].title);
        let handicapB = parseFloat(b[0].title);

        // Perform the comparison to determine the order
        return handicapA - handicapB;
    });
    return {rows:base_arr, suspend:suspend_value}
}


export const awayTeamTotal = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Away Team Total (Including OT)"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            var length = Object.keys(group).length
            if(length <= 1){
                return {rows:[], suspend:"0"};

            }
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                if(group_obj["Over"] && group_obj["Under"]){

                    var _over_obj = group_obj["Over"][0]
                    var _under_obj = group_obj["Under"][0]
                    var title_obj = {title:handicap, value:null, suspend:"0"}
                    var over_obj = {title:"", value:_over_obj.value_eu, suspend:_over_obj.suspend}
                    var under_obj = {title:"", value:_under_obj.value_eu, suspend:_under_obj.suspend}
                    arr = [title_obj, over_obj, under_obj]
                    base_arr.push(arr);
                }
            }
        }
    }

    base_arr.sort((a:any, b:any) => {
        // Convert the title (handicap) of the first object of each inner array to a number
        let handicapA = parseFloat(a[0].title);
        let handicapB = parseFloat(b[0].title);

        // Perform the comparison to determine the order
        return handicapA - handicapB;
    });
    return {rows:base_arr, suspend:suspend_value}
}


export const currentQuarterTotal = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = current_quarter + " Lines Total"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr = [] as any;

                var _over_obj = group_obj["Over"][0]
                var _under_obj = group_obj["Under"][0]
                var title_obj = {title:handicap, value:null, suspend:"0"}
                var over_obj = {title:"", value:_over_obj.value_eu, suspend:_over_obj.suspend}
                var under_obj = {title:"", value:_under_obj.value_eu, suspend:_under_obj.suspend}
                arr = [title_obj, over_obj, under_obj]
                base_arr.push(arr);
            }
        }
    }

    base_arr.sort((a:any, b:any) => {
        // Convert the title (handicap) of the first object of each inner array to a number
        let handicapA = parseFloat(a[0].title);
        let handicapB = parseFloat(b[0].title);

        // Perform the comparison to determine the order
        return handicapA - handicapB;
    });
    return {rows:base_arr, suspend:suspend_value}
}


export const matchResultAndTotal = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Result/Total Goals"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var participants = odds.participants;
            var group = groupParticipantsByHandicapAndName(participants);
            for(var handicap in group){
                var group_obj = group[handicap];
                var arr_home = [] as any;
                var arr_away = [] as any;

                if(group_obj["Home/o"] && group_obj["Home/u"] && group_obj["Away/o"] && group_obj["Away/u"]){
                    var _home_over_obj = group_obj["Home/o"][0]
                    var _home_under_obj = group_obj["Home/u"][0]
                    var _away_over_obj = group_obj["Away/o"][0]
                    var _away_under_obj = group_obj["Away/u"][0]

                    var home_title = {title:data?.team_info?.home?.name, value: null, suspend:"0"}
                    var home_over = {title:handicap, value: _home_over_obj.value_eu, suspend:_home_over_obj.suspend}
                    var home_under = {title:handicap,  value: _home_under_obj.value_eu, suspend:_home_under_obj.suspend}
                    
                    arr_home = [home_title, home_over, home_under]

                    var away_title = {title:data?.team_info?.away?.name, value: null, suspend:"0"}
                    var away_over = {title:handicap, value: _away_over_obj.value_eu, suspend:_away_over_obj.suspend}
                    var away_under = {title:handicap, value: _away_under_obj.value_eu, suspend:_away_under_obj.suspend}
                    
                    arr_away = [away_title, away_over, away_under]
                    // arr = [title_obj, over_obj, under_obj]
                    base_arr.push(arr_home);
                    base_arr.push(arr_away);
                }
                
            }
        }
    }

    base_arr.sort((a:any, b:any) => {
        // Convert the title (handicap) of the first object of each inner array to a number
        let handicapA = parseFloat(a[0].title);
        let handicapB = parseFloat(b[0].title);

        // Perform the comparison to determine the order
        return handicapA - handicapB;
    });
    return {rows:base_arr, suspend:suspend_value}
}


export const pointSpread3Way = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "European Handicap"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var arr = [] as any;
            var participants = odds.participants;
            var home = _getParticipantsFieldRaw(participants, "Home")
            var draw = _getParticipantsFieldRaw(participants, "Draw")
            var away = _getParticipantsFieldRaw(participants, "Away")
            if(home && draw && away){
                var home_obj = {title:home.handicap, value:home.value_eu, suspend:home.suspend}
                var draw_obj = {title:draw.handicap, value:draw.value_eu, suspend:draw.suspend}
                var away_obj = {title:away.handicap, value:away.value_eu, suspend:away.suspend}
                arr = [home_obj, draw_obj, away_obj]
                base_arr.push(arr);

            }
        }
    }
    return {rows:base_arr, suspend:suspend_value}
}

export const highestScoringHalf = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Highest Scoring Half"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var arr = [] as any;
            var participants = odds.participants;
            var first_half_obj = _getParticipantsFieldRaw(participants, "1st Half")
            var second_half_obj = _getParticipantsFieldRaw(participants, "2nd Half")
            var draw_obj = _getParticipantsFieldRaw(participants, "Draw")
            var _first_half_obj = {title:first_half_obj.name, value:first_half_obj.value_eu, suspend:first_half_obj.suspend}
            var _second_half_obj = {title:second_half_obj.name, value:second_half_obj.value_eu, suspend:second_half_obj.suspend}
            var _draw_obj = {title:draw_obj.name, value:draw_obj.value_eu, suspend:draw_obj.suspend}
            arr = [_first_half_obj, _second_half_obj, _draw_obj]
            base_arr.push(arr);
        }
    }
    return {rows:base_arr, suspend:suspend_value}
}

export const halfTimeFullTime = (data: any) => {
    var current_quarter = data?.info?.period;
    var suspend_value = "0"
    if (!data && !data.odds) {
        return {rows:[], suspend:"0"};
    }

    const base_arr = [] as any;

    {
        var search_string = "Half Time/Full Time (Including OT)"
        var odd_id = findIdByName(data, search_string);
        var odds = data?.odds?.[odd_id];

        if(odds){
            var home_name = data?.team_info?.home?.name;
            var away_name = data?.team_info?.away?.name;

            var first_row_arr = [] as any;
            var second_row_arr = [] as any;
            var participants = odds.participants;
            var one_one_participant = _getParticipantsFieldRaw(participants, "1/1")
            var x_one_participant = _getParticipantsFieldRaw(participants, "X/1")
            var two_one_participant = _getParticipantsFieldRaw(participants, "2/1")

            var one_two_participant = _getParticipantsFieldRaw(participants, "1/2")
            var x_two_participant = _getParticipantsFieldRaw(participants, "X/2")
            var two_two_participant = _getParticipantsFieldRaw(participants, "2/2")

            var _one_one_obj = {title: home_name +  "-" + home_name, value: one_one_participant.value_eu, suspend: one_one_participant.suspend};
            var _x_one_obj = {title: "Tie -" + home_name, value: x_one_participant.value_eu, suspend: x_one_participant.suspend};
            var _two_one_obj = {title: away_name + "-" + home_name, value: two_one_participant.value_eu, suspend: two_one_participant.suspend};

            first_row_arr = [_one_one_obj, _x_one_obj, _two_one_obj];

            var _one_two_obj = {title: home_name +  "-" + away_name, value: one_two_participant.value_eu, suspend: one_two_participant.suspend};
            var _x_two_obj = {title: "Tie -" + away_name, value: x_two_participant.value_eu, suspend: x_two_participant.suspend};
            var _two_two_obj = {title: away_name + "-" + away_name, value: two_two_participant.value_eu, suspend: two_two_participant.suspend};

            second_row_arr = [_one_two_obj, _x_two_obj, _two_two_obj];
            
            base_arr.push(first_row_arr);
            base_arr.push(second_row_arr);
        }
    }
    return {rows:base_arr, suspend:suspend_value}
}