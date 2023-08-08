'use client';
import React from "react";



interface MyObject {
    [key: string]: any;
}

function findObjectInArray(array: MyObject[], key: string, value: any): MyObject | null {
    for (const obj of array) {
        if (obj[key] === value) {
            return obj;
        }
    }
    return null;
}


export const fulltimeResult = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    const obj = findObjectInArray(data.odds, 'value', 'Match Winner')
    console.log('Sending New Data', obj)
    const home = obj?.bookmakers[0].odds[0].value
    const draw = obj?.bookmakers[0].odds[1].value
    const away = obj?.bookmakers[0].odds[2].value
    tosend.push([{ title: "Home", value: `${home}`, suspend: "0" }, { title: "Draw", value: `${draw}`, suspend: "0" }, { title: "Away", value: `${away}`, suspend: "0" }])
    
    return tosend;
}

export const doubleChance = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    const obj = findObjectInArray(data.odds, 'value', 'Double Chance')
    console.log('Sending New Data', obj)
    const homeordraw = obj?.bookmakers[0].odds[0].value
    const homeoraway = obj?.bookmakers[0].odds[1].value
    const draworaway = obj?.bookmakers[0].odds[2].value
    tosend.push([{ title: "Home or Draw", value: `${homeordraw}`, suspend: "0" }, { title: "Home or Away", value: `${homeoraway}`, suspend: "0" }, { title: "Draw or Away", value: `${draworaway}`, suspend: "0" }])
    
    return tosend;
}