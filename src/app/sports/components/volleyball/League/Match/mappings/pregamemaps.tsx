'use client';
import React from "react";
export const gameLines = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;

    let match = data?.odds?.filter((item: any) => item.id === '2');

    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;
        if (fmatchWrap && fmatchWrap.length > 0) {
            const arr = [] as any
            arr.push({ title: 'To Win', value: '', suspend: '0' })
            fmatchWrap.map((fod: any) => {
                arr.push({ title: '', value: fod.value, suspend: fod.stop === 'False' ? '0' : '1' })
            })
            tosend.push(arr)
        }
    }

    match = data?.odds?.filter((item: any) => item.id === '22630');

    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;
        if (fmatchWrap && fmatchWrap.length > 0) {
            const arr = [] as any
            fmatchWrap.map((fmatchItem: any) => {
                let title = fmatchItem.name
                if (fmatchItem.ismain === "True") {
                    arr.push({ title: 'Handicap - Sets', value: '', suspend: '0' })
                    fmatchItem?.odds.map((fod: any) => {
                        if (arr.length >= 3) {
                            return;
                        }
                        const modtitle = `${title}`
                        arr.push({ title: modtitle, value: fod.value, suspend: fod.stop === 'False' ? '0' : '1' })
                    })
                }
            })
            tosend.push(arr)
        }
    }

    match = data?.odds?.filter((item: any) => item.id === '22624');

    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;
        if (fmatchWrap && fmatchWrap.length > 0) {
            const arr = [] as any
            fmatchWrap.map((fmatchItem: any) => {
                let title = fmatchItem.name
                if (fmatchItem.ismain === "True") {
                    arr.push({ title: 'Run Line', value: '', suspend: '0' })
                    fmatchItem?.odds.map((fod: any) => {
                        if (arr.length >= 3) {
                            return;
                        }
                        const modtitle = `${fod.name[0]} ${title}`
                        arr.push({ title: modtitle, value: fod.value, suspend: fod.stop === 'False' ? '0' : '1' })
                    })
                }
            })
            tosend.push(arr)
        }
    }


    return tosend;
}
